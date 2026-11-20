/* DeepSeek Chat Completions. Credentials stay outside game data. */
(function (root) {
  'use strict';
  const API_BASE='https://api.deepseek.com';
  const MAX_DURATION_MS=15*60*1000;
  const Cost=typeof module!=='undefined'&&module.exports?require('./cost.js'):root.ClocktowerCost;
  const MODELS=[{id:'deepseek-v4-pro',name:'DeepSeek V4 Pro',description:'推荐'},{id:'deepseek-flash',name:'DeepSeek Flash',description:'轻量分析'}];
  const DEFAULT_SETTINGS={model:'deepseek-v4-pro',thinking:false,rememberKey:false,context:true,maxTokens:32768,timeoutSeconds:300,stream:true};
  class DeepSeekError extends Error {constructor(message,details={}){super(message);this.name='DeepSeekError';Object.assign(this,details);}}
  function createClient(options={}) {
    let storage=options.storage;
    if(storage===undefined){try{storage=root.localStorage;}catch(_){storage=null;}}
    const prefix=options.storagePrefix||'clocktower-notebook.ai.v1',fetcher=options.fetchImpl||((...args)=>root.fetch(...args));
    const sharedKey=options.sharedKey||'emoboi.deepseek.key.v1',revisionKey=sharedKey+'.revision';
    let settings={...DEFAULT_SETTINGS,...options.defaultSettings},key='',models=MODELS.map(m=>({...m})),storageAvailable=!!storage;
    try{const saved=JSON.parse(storage?.getItem(prefix+'.settings')||'null');if(saved&&typeof saved==='object')settings=validateSettings({...settings,...saved});if(settings.rememberKey)key=String(storage?.getItem(prefix+'.key')||'').trim();}catch(_){storageAvailable=false;}
    let revision=null;
    try{
      revision=storage?.getItem(revisionKey)||null;
      const shared=storage?.getItem(sharedKey);
      if(shared){key=shared;settings.rememberKey=true;}
      else if(!revision){
        const legacy=key||storage?.getItem('clocktower-notebook.ai.v1.key');
        if(legacy){key=legacy;settings.rememberKey=true;storage.setItem(sharedKey,key);revision=Date.now()+':migration';storage.setItem(revisionKey,revision);}
      }else key='';
      storage?.removeItem(prefix+'.key');storage?.removeItem('clocktower-notebook.ai.v1.key');
    }catch(_){storageAvailable=false;}
    function refreshKey(){
      if(!storage)return;
      try{const next=storage?.getItem(revisionKey)||null;if(next!==revision){key=storage?.getItem(sharedKey)||'';settings.rememberKey=!!key;revision=next;}}catch(_){storageAvailable=false;}
    }
    function validateSettings(raw) {
      const model=String(raw.model||DEFAULT_SETTINGS.model).trim(),maxTokens=Number(raw.maxTokens),timeoutSeconds=Number(raw.timeoutSeconds);
      if(!/^[a-zA-Z0-9_.:/-]{1,120}$/.test(model))throw new DeepSeekError('请选择有效模型。');
      if(!Number.isInteger(maxTokens)||maxTokens<1024||maxTokens>393216)throw new DeepSeekError('输出上限应在 1024–393216 tokens 之间。');
      if(!Number.isInteger(timeoutSeconds)||timeoutSeconds<30||timeoutSeconds>900)throw new DeepSeekError('等待时间应在 30–900 秒之间。');
      return {model,thinking:raw.thinking===true,rememberKey:!!raw.rememberKey,context:raw.context!==false,maxTokens,timeoutSeconds,stream:raw.stream!==false};
    }
    function safeText(value,credential=key){let text=String(value||'');if(credential)text=text.split(credential).join('[已隐藏密钥]');return text.replace(/sk-[A-Za-z0-9_-]{8,}/g,'[已隐藏密钥]').slice(0,600);}
    function getSettings(){refreshKey();return {...settings,hasKey:!!key,storageAvailable,models:models.map(m=>({...m}))};}
    function configure(patch={}) {
      refreshKey();
      const next=validateSettings({...settings,...patch});
      if(patch.apiKey!==undefined){const value=String(patch.apiKey).trim();if(value.length>512||/[\r\n]/.test(value))throw new DeepSeekError('API Key 格式无效。');key=value;}
      settings=next;
      try{storage?.setItem(prefix+'.settings',JSON.stringify(settings));if(settings.rememberKey&&key)storage?.setItem(sharedKey,key);else storage?.removeItem(sharedKey);revision=Date.now()+':'+Math.random().toString(36).slice(2);storage?.setItem(revisionKey,revision);storage?.removeItem(prefix+'.key');storageAvailable=!!storage;}catch(_){storageAvailable=false;}
      return getSettings();
    }
    function clearKey(){key='';settings.rememberKey=false;try{storage?.removeItem(sharedKey);storage?.removeItem(prefix+'.key');storage?.removeItem('clocktower-notebook.ai.v1.key');revision=Date.now()+':clear:'+Math.random().toString(36).slice(2);storage?.setItem(revisionKey,revision);storage?.setItem(prefix+'.settings',JSON.stringify(settings));}catch(_){storageAvailable=false;}return getSettings();}
    function httpError(status,raw,credential) {
      const messages={400:'请求参数有误，请检查模型与输出设置。',401:'API Key 无效，请在设置中检查。',402:'DeepSeek 账户余额不足。',403:'DeepSeek 拒绝了访问，请检查账户权限。',404:'模型或接口不可用，请刷新模型列表。',422:'模型参数不受支持，请检查设置。',429:'请求过于频繁，请稍后重试。',500:'DeepSeek 服务发生错误，请稍后重试。',503:'DeepSeek 服务繁忙，请稍后重试。'};
      let detail='';try{const data=JSON.parse(raw);detail=safeText(data.error?.message||data.message,credential);}catch(_){/* Ignore HTML error bodies. */}
      return new DeepSeekError(messages[status]||`DeepSeek 请求失败（${status}）。`,{status,detail});
    }
    async function perform(path,{method='POST',body,signal,apiKey,onProgress,requestDurationMs,includeReasoningProgress=false}={}) {
      refreshKey();
      const credential=apiKey===undefined?key:String(apiKey).trim();
      if(!credential)throw new DeepSeekError('请先在设置中填写 API Key。',{code:'missing_key'});
      if(signal?.aborted)throw new DOMException('已取消','AbortError');
      if(root.navigator?.onLine===false)throw new DeepSeekError('设备当前离线，联网后可重试。',{code:'offline'});
      const controller=new AbortController(),visibility=options.visibilityTarget??root.document;
      const totalMs=Math.min(MAX_DURATION_MS,requestDurationMs??options.maxDurationMs??MAX_DURATION_MS);
      const idleMs=options.timeoutMs??(body?.thinking?.type==='enabled'?totalMs:settings.timeoutSeconds*1000);
      let timedOut=false,timeoutKind='timeout',partial='',reader,connected=false,sawThinking=false,idleTimer,totalTimer,trailerTimer;
      let model=body?.model,usage=null,reasoningEstimate=0,lastActivityAt=Date.now(),lastOutputAt=0,connectedAt=0,reasoning='';
      const startedAt=Date.now();
      const timeout=(kind='timeout')=>{if(controller.signal.aborted)return;timedOut=true;timeoutKind=kind;controller.abort();};
      const armIdle=()=>{lastActivityAt=Date.now();clearTimeout(idleTimer);idleTimer=setTimeout(()=>timeout(Date.now()-startedAt>=totalMs?'duration':'timeout'),idleMs);};
      const onVisibility=()=>{
        if(visibility?.visibilityState==='hidden')return;
        if(Date.now()-startedAt>=totalMs)timeout('duration');
        else if(Date.now()-lastActivityAt>=idleMs)timeout();
      };
      const forwardAbort=()=>controller.abort();signal?.addEventListener('abort',forwardAbort,{once:true});
      let abortListener;
      const aborted=new Promise((_,reject)=>{abortListener=()=>reject(timedOut?new DeepSeekError(timeoutKind==='duration'?'本次分析已达到最长等待时间，已保留收到的内容；可重试。':'长时间没有收到响应，已停止等待；可重试或延长设置中的无响应等待时间。',{code:timeoutKind}):new DOMException('已取消','AbortError'));controller.signal.addEventListener('abort',abortListener,{once:true});});
      const wait=promise=>Promise.race([promise,aborted]);
      // Thinking text is an explicit, transient UI opt-in. It never enters results, errors or billing.
      const notify=value=>{try{onProgress?.({...value,receivedAt:Date.now(),lastOutputAt,connectedAt,usage,reasoningEstimate,...(includeReasoningProgress&&reasoning?{reasoning}:{})});}catch(_){/* View callbacks must not turn valid output into network errors. */}};
      visibility?.addEventListener?.('visibilitychange',onVisibility);armIdle();totalTimer=setTimeout(()=>timeout('duration'),totalMs);
      try {
        notify({phase:'connecting',content:partial});
        const response=await wait(fetcher(API_BASE+path,{method,headers:{Authorization:'Bearer '+credential,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,signal:controller.signal,credentials:'omit',cache:'no-store',redirect:'error'}));
        connected=true;connectedAt=Date.now();armIdle();
        if(!response.ok)throw httpError(response.status,await wait(response.text()),credential);
        if(method==='GET')return JSON.parse(await wait(response.text()));
        notify({phase:'waiting',content:partial});
        let finishReason='',done=false,sawFinish=false;
        if(!response.body?.getReader||!(response.headers.get('content-type')||'').includes('text/event-stream')) {
          let data;try{data=JSON.parse(await wait(response.text()));}catch(error){if(error instanceof DeepSeekError||error.name==='AbortError')throw error;throw new DeepSeekError('接口未返回有效 JSON。',{code:'bad_response'});}
          if(data.error)throw new DeepSeekError(safeText(data.error.message||'DeepSeek 返回错误。',credential),{code:'api_error'});
          partial=data.choices?.[0]?.message?.content||'';reasoningEstimate=Cost.tokens(data.choices?.[0]?.message?.reasoning_content||'');lastOutputAt=Date.now();model=data.model||model;usage=data.usage||null;finishReason=data.choices?.[0]?.finish_reason||'';done=true;notify({phase:'answer',content:partial});
        } else {
          reader=response.body.getReader();const decoder=new TextDecoder();let buffer='',eventLines=[];
          function dispatch() {
            if(!eventLines.length)return;const payload=eventLines.join('\n');eventLines=[];
            if(payload==='[DONE]'){done=true;return;}
            let data;try{data=JSON.parse(payload);}catch(_){throw new DeepSeekError('流式响应格式异常，请重试。',{code:'bad_response'});}
            if(data.error)throw new DeepSeekError(safeText(data.error.message||'DeepSeek 返回错误。',credential),{code:'api_error'});
            model=data.model||model;if(data.usage)usage=data.usage;
            if(data.usage||data.choices?.[0]?.finish_reason||data.choices?.[0]?.delta?.content||data.choices?.[0]?.delta?.reasoning_content)armIdle();
            const choice=data.choices?.[0],delta=choice?.delta;
            if(typeof delta?.content==='string'&&delta.content){partial+=delta.content;lastOutputAt=Date.now();reasoning='';notify({phase:'answer',content:partial});}
            else if(delta?.reasoning_content){reasoningEstimate+=Cost.tokens(delta.reasoning_content);lastOutputAt=Date.now();if(includeReasoningProgress&&!partial)reasoning=(reasoning+delta.reasoning_content).slice(-64000);sawThinking=true;notify({phase:partial?'answer':'thinking',content:partial});}
            if(choice?.finish_reason){finishReason=choice.finish_reason;sawFinish=true;}
          }
          function line(value){value=value.replace(/\r$/,'');if(!value){dispatch();return;}if(value.startsWith(':'))return;if(value.startsWith('data:'))eventLines.push(value.slice(5).replace(/^ /,''));}
          while(!done){
            let part;
            try{
              const pending=wait(reader.read());
              part=sawFinish?await Promise.race([pending,new Promise(resolve=>{trailerTimer=setTimeout(()=>resolve(null),options.trailerMs??800);})]):await pending;
            }catch(error){if(sawFinish&&!signal?.aborted)break;throw error;}finally{clearTimeout(trailerTimer);}
            if(!part)break;
            buffer+=decoder.decode(part.value||new Uint8Array(),{stream:!part.done});
            let index;while((index=buffer.indexOf('\n'))>=0){line(buffer.slice(0,index));buffer=buffer.slice(index+1);}
            if(part.done){if(buffer)line(buffer);dispatch();break;}
            if(!sawFinish)notify({phase:partial?'answer':sawThinking?'thinking':'waiting',content:partial});
            if(sawFinish&&usage)break;
          }
          if(!done&&!sawFinish)throw new DeepSeekError('接收途中连接中断，已保留收到的内容。请联网后重试。',{code:'interrupted'});
        }
        if(!partial.trim())throw new DeepSeekError(finishReason==='length'?'输出上限已用完，但尚未生成报告；请提高输出上限后重试。':'模型未返回报告内容，请重试。',{code:'empty_response',finishReason});
        return {content:partial,model,usage,reasoningEstimate,finishReason:finishReason||'stop',truncated:!!finishReason&&finishReason!=='stop'};
      }catch(error){
        let failure=error;
        if(!(error instanceof DeepSeekError)&&!signal?.aborted&&error.name!=='AbortError'){
          if(timedOut)failure=new DeepSeekError('长时间没有收到响应，已保留收到的内容；可重试或延长无响应等待时间。',{code:'timeout'});
          else if(root.navigator?.onLine===false)failure=new DeepSeekError('网络已断开，已保留收到的内容。联网后可重试。',{code:'offline'});
          else if(error instanceof TypeError||error.name==='NetworkError')failure=new DeepSeekError(connected?'接收途中连接中断，已保留收到的内容。可能是网络切换或浏览器暂停了连接，请重试。':'未能连接 DeepSeek。请检查网络后重试；可用设置中的连接检测区分接口连通与生成等待。',{code:connected?'interrupted':'network_start',detail:safeText(error.message,credential)});
          else failure=new DeepSeekError('处理响应时出现异常，已保留收到的内容。请重试。',{code:'client_error',detail:safeText(error.message,credential)});
        }
        Object.assign(failure,{partialContent:partial,usage,model,reasoningEstimate,connected});throw failure;
      }finally{
        clearTimeout(idleTimer);clearTimeout(totalTimer);clearTimeout(trailerTimer);visibility?.removeEventListener?.('visibilitychange',onVisibility);
        signal?.removeEventListener('abort',forwardAbort);controller.signal.removeEventListener('abort',abortListener);
        if(reader){try{Promise.resolve(reader.cancel()).catch(()=>{});}catch(_){}try{reader.releaseLock();}catch(_){}}
        controller.abort();
      }
    }
    async function testConnection(options={}) {
      const data=await perform('/models',{method:'GET',signal:options.signal,apiKey:options.apiKey});
      const ids=[...new Set((data.data||[]).map(m=>m.id).filter(id=>typeof id==='string'&&/^[a-zA-Z0-9_.:/-]{1,120}$/.test(id)))];
      if(!ids.length)throw new DeepSeekError('连接成功，但没有返回可用模型。');
      models=ids.map(id=>MODELS.find(m=>m.id===id)||{id,name:id,description:'账户可用模型'});if(!models.some(m=>m.id===settings.model))models.unshift(MODELS.find(m=>m.id===settings.model)||{id:settings.model,name:settings.model,description:'当前选择'});
      return {models:models.map(m=>({...m}))};
    }
    async function analyze(request,options={}) {
      if(!Array.isArray(request?.messages)||!request.messages.length)throw new DeepSeekError('没有可分析的资料。');
      const thinking=options.thinking===undefined?settings.thinking:options.thinking===true;
      const body={model:settings.model,messages:request.messages.map(m=>({role:m.role,content:m.content})),thinking:{type:thinking?'enabled':'disabled'},reasoning_effort:thinking?(options.reasoningEffort==='low'?'low':'high'):'none',max_tokens:settings.maxTokens,stream:settings.stream};
      if(settings.stream)body.stream_options={include_usage:true};if(!thinking)body.temperature=.3;
      const call=Cost.newCall(request,{model:body.model,thinking,kind:request.mode==='review'?'review':request.mode==='followup'?'followup':'analysis'});
      try{
        const result=await perform('/chat/completions',{body,signal:options.signal,requestDurationMs:options.maxDurationMs,includeReasoningProgress:thinking&&options.includeReasoningProgress===true,onProgress:p=>{
          call.usage=p.usage;call.outputEstimate=Cost.tokens(p.content||'')+(p.reasoningEstimate||0);
          options.onProgress?.({...p,billingCall:{...call}});
        }});
        Object.assign(call,{model:result.model,pricing:Cost.quote(result.model,call.startedAt),usage:result.usage,outputEstimate:Cost.tokens(result.content)+(result.reasoningEstimate||0),status:result.truncated?'partial':'complete',connected:true,finishedAt:new Date().toISOString()});
        return {...result,billingCall:call};
      }catch(error){
        Object.assign(call,{model:error.model||call.model,pricing:Cost.quote(error.model||call.model,call.startedAt),connected:error.connected,usage:error.usage||call.usage,status:error.name==='AbortError'?'cancelled':'error',rejected:[400,401,402,403,404,422,429].includes(error.status),outputEstimate:Cost.tokens(error.partialContent||'')+(error.reasoningEstimate||0),finishedAt:new Date().toISOString()});error.billingCall=call;throw error;
      }
    }
    // A new Clocktower visit requires consent again; saved model and Key are unaffected.
    if(options.requireThinkingConsent)settings.thinking=false;
    return {name:'DeepSeek',get available(){refreshKey();return !!key;},getSettings,configure,clearKey,testConnection,analyze,createClient,MODELS,API_BASE,MAX_DURATION_MS,progressState};
  }
  function progressState(job,now=Date.now()){
    const elapsed=Math.max(0,Math.floor((now-job.startedAt)/1000)),silent=Math.max(0,Math.floor((now-(job.activityAt||job.startedAt))/1000));
    const labels={preparing:'正在整理线索',connecting:'正在连接',waiting:'等待模型响应',thinking:'正在思考',answer:'正在整理报告',formatting:'正在整理报告',reviewing:'正在整理报告'};
    const stalled=job.phase!=='preparing'&&silent>=45;
    return {elapsed,stalled,label:stalled?'暂未收到新内容':labels[job.phase]||'正在分析',detail:stalled?silent+'秒未收到新内容，可继续等待或停止重试':job.phase==='connecting'?'正在建立连接':job.phase==='waiting'?'已连接，等待模型开始分析':job.phase==='reviewing'?'正在核对报告格式':'',showThinking:job.phase==='thinking'&&!stalled&&!!job.thinkingText};
  }
  if(typeof module!=='undefined'&&module.exports)module.exports={createClient,MODELS,DEFAULT_SETTINGS,API_BASE,MAX_DURATION_MS,DeepSeekError,progressState};else root.ClocktowerAI=createClient({requireThinkingConsent:true});
})(globalThis);
