(function(root){
  'use strict';
  const VERSION='deepseek-cny-2026-11-12',SOURCE='https://api-docs.deepseek.com/zh-cn/quick_start/pricing';
  const RATES={pro:{hit:.30,miss:9,output:27},flash:{hit:.04,miss:2,output:8}};
  // Official 2026 holiday notice, mirrored by holiday-cn. Weekends are always off-peak under the API tariff.
  const HOLIDAYS_2026=new Set('2026-01-01 2026-01-02 2026-01-03 2026-02-15 2026-02-16 2026-02-17 2026-02-18 2026-02-19 2026-02-20 2026-02-21 2026-02-22 2026-02-23 2026-04-04 2026-04-05 2026-04-06 2026-05-01 2026-05-02 2026-05-03 2026-05-04 2026-05-05 2026-06-19 2026-06-20 2026-06-21 2026-09-25 2026-09-26 2026-09-27 2026-10-01 2026-10-02 2026-10-03 2026-10-04 2026-10-05 2026-10-06 2026-10-07'.split(' '));
  const number=v=>typeof v==='number'&&Number.isFinite(v)&&v>=0?v:null;
  function family(model){const id=String(model||'').toLowerCase();return /^deepseek-v4-pro(?:-|$)/.test(id)?'pro':/^(?:deepseek-flash|deepseek-v4-flash(?:-vision-exp)?|deepseek-v4\.1-flash-\d+)$/.test(id)?'flash':null;}
  function period(value){
    const ms=Date.parse(value);if(!Number.isFinite(ms))return {peak:true,uncertain:true,label:'时段未知'};
    const d=new Date(ms+8*3600000),day=d.getUTCDay(),minutes=d.getUTCHours()*60+d.getUTCMinutes(),date=d.toISOString().slice(0,10);
    const window=day>=1&&day<=5&&(minutes>=540&&minutes<720||minutes>=840&&minutes<1080);
    const peak=window&&!HOLIDAYS_2026.has(date),uncertain=window&&d.getUTCFullYear()!==2026;
    return {peak,uncertain,label:peak?'高峰':'空闲',date};
  }
  function quote(model,at){const f=family(model),p=period(at);return f?{version:VERSION,currency:'CNY',modelFamily:f,...p,rates:Object.fromEntries(Object.entries(RATES[f]).map(([k,v])=>[k,p.peak?v:v/2])),source:SOURCE}:null;}
  function tokens(value){const text=typeof value==='string'?value:JSON.stringify(value||'');const cjk=(text.match(/[\u2e80-\u9fff\uac00-\ud7af]/g)||[]).length;return Math.ceil(cjk*.75+(text.length-cjk)/3.5);}
  function mergeUsage(...usages){
    const out={};for(const key of ['prompt_tokens','completion_tokens','total_tokens','prompt_cache_hit_tokens','prompt_cache_miss_tokens'])if(usages.every(u=>number(u?.[key])!==null))out[key]=usages.reduce((n,u)=>n+u[key],0);
    for(const [field,key] of [['prompt_tokens_details','cached_tokens'],['completion_tokens_details','reasoning_tokens']])if(usages.every(u=>number(u?.[field]?.[key])!==null))out[field]={[key]:usages.reduce((n,u)=>n+u[field][key],0)};
    return out;
  }
  function newCall(request,{model,thinking=false,kind='analysis',startedAt=new Date().toISOString()}={}){
    return {kind,model,thinking,startedAt,status:'running',inputEstimate:tokens(request.messages),outputEstimate:0,pricing:quote(model,startedAt)};
  }
  function measure(call){
    if(call.rejected)return {amount:0,low:0,high:0,rough:false,incomplete:false,known:true,basis:'请求被拒绝，未收到生成内容'};
    if(call.connected===false&&!call.usage&&!call.outputEstimate&&['error','cancelled'].includes(call.status))return {amount:null,low:0,high:null,rough:true,incomplete:true,known:false,basis:'未确认服务端是否处理，费用待确定'};
    const pricing=call.pricing?.currency==='CNY'&&['hit','miss','output'].every(k=>number(call.pricing?.rates?.[k])!==null)?call.pricing:quote(call.model,call.startedAt),u=call.usage||{};
    if(!pricing)return {amount:null,low:0,high:null,rough:true,incomplete:true,known:false,basis:'模型费率未知'};
    let input=number(u.prompt_tokens),output=number(u.completion_tokens),rough=false;
    if(input===null||output===null){
      rough=true;const total=number(u.total_tokens),estimatedOut=Math.max(0,call.outputEstimate||0);
      if(total!==null){output=Math.min(total,output??estimatedOut);input=total-output;}
      else {input=input??Math.max(0,call.inputEstimate||0);output=output??estimatedOut;}
    }
    let hit=number(u.prompt_cache_hit_tokens)??number(u.prompt_tokens_details?.cached_tokens),miss=number(u.prompt_cache_miss_tokens);
    if(hit===null&&miss!==null)hit=Math.max(0,input-miss);
    if(hit!==null&&miss!==null&&hit+miss!==input)rough=true;
    const cacheKnown=hit!==null;
    hit=Math.min(input,hit??0);miss=input-hit;
    const r=pricing.rates,amount=(hit*r.hit+miss*r.miss+output*r.output)/1e6;
    const fullUsage=number(u.prompt_tokens)!==null&&number(u.completion_tokens)!==null;
    const incomplete=(['running','cancelled','error','partial'].includes(call.status)&&!fullUsage)||!!call.unobserved;
    return {amount,low:((cacheKnown?hit*r.hit+miss*r.miss:input*r.hit)+output*r.output)/1e6*(pricing.uncertain ? .5 : 1),high:amount,rough:rough||!cacheKnown||pricing.uncertain||incomplete,incomplete,known:true,input,output,hit:cacheKnown?hit:null,pricing,basis:rough?'缺少完整用量，按文本粗估':!cacheKnown?'按返回用量计算，未知缓存按未命中估算':'按返回用量及缓存计算'};
  }
  function legacyCalls(snapshot){
    if(!snapshot.model&&!/^deepseek-/.test(snapshot.reportOrigin||''))return [];
    const model=snapshot.model||/^deepseek-[\w.-]+/.exec(snapshot.reportOrigin||'')?.[0],base={model,startedAt:snapshot.startedAt||snapshot.createdAt,status:snapshot.status||'complete',inputEstimate:tokens(snapshot.request?.messages),outputEstimate:tokens(snapshot.report||'')};
    if(!snapshot.report&&/余额不足|Key 无效|请求参数有误|拒绝/.test(snapshot.error||''))return [{...base,rejected:true}];
    if(snapshot.reviewUsage&&snapshot.usage){
      const a=snapshot.usage,b=snapshot.reviewUsage,first={};for(const k of ['prompt_tokens','completion_tokens','total_tokens'])if(number(a[k])!==null&&number(b[k])!==null)first[k]=Math.max(0,a[k]-b[k]);
      if(snapshot.usageFormat==='sum-v2')for(const k of ['prompt_cache_hit_tokens','prompt_cache_miss_tokens'])if(number(a[k])!==null&&number(b[k])!==null)first[k]=Math.max(0,a[k]-b[k]);
      return [{...base,kind:'analysis',usage:first,status:'complete'},{...base,kind:'review',usage:b,startedAt:snapshot.reviewStartedAt||base.startedAt}];
    }
    const calls=[{...base,kind:snapshot.kind,usage:snapshot.usage}];
    if(snapshot.reviewStatus&&snapshot.reviewStatus!=='complete')calls.push({...base,kind:'review',usage:null,outputEstimate:tokens(snapshot.reviewPartial||''),unobserved:true,rejected:/余额不足|Key 无效|请求参数有误/.test(snapshot.error||'')});
    return calls;
  }
  function estimate(snapshot){
    const calls=Array.isArray(snapshot.billingCalls)&&snapshot.billingCalls.length?snapshot.billingCalls:legacyCalls(snapshot);
    if(!calls.length)return {amount:null,rough:true,incomplete:false,known:false,calls:[],basis:'无调用记录'};
    const rows=calls.map(c=>({...measure(c),kind:c.kind,status:c.status,model:c.model})),known=rows.every(r=>r.known);
    return {amount:known?rows.reduce((n,r)=>n+r.amount,0):null,low:rows.reduce((n,r)=>n+(r.low||0),0),high:known?rows.reduce((n,r)=>n+r.high,0):null,rough:rows.some(r=>r.rough),incomplete:rows.some(r=>r.incomplete),known,calls:rows,basis:'按公开费率估算，不是账户扣款账单'};
  }
  function sum(snapshots){const rows=snapshots.map(estimate);return {amount:rows.every(r=>r.known)?rows.reduce((n,r)=>n+r.amount,0):null,known:rows.every(r=>r.known),rough:rows.some(r=>r.rough),incomplete:rows.some(r=>r.incomplete),calls:rows.flatMap(r=>r.calls)};}
  function money(n){if(n===null||!Number.isFinite(n))return '费用待估';if(n===0)return '¥0';if(n<.001)return '<¥0.001';return '¥'+n.toFixed(n<1?3:2);}
  function label(cost){return cost.amount===null?'费用待估':(cost.rough?'粗估':'约')+money(cost.amount)+(cost.incomplete?'+':'');}
  const api={VERSION,SOURCE,family,period,quote,tokens,mergeUsage,newCall,measure,legacyCalls,estimate,sum,money,label};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ClocktowerCost=api;
})(typeof globalThis!=='undefined'?globalThis:this);
