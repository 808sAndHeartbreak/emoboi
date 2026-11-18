'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('桌游及英语静态依赖可解析，部署不依赖第三方运行脚本',()=>{
 for(const file of ['index.html','boardgames/index.html','boardgames/werewolf/index.html','boardgames/clocktower/index.html','english/index.html']){
  const html=read(file);for(const match of html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+)"[^>]*>/g)){
   const url=match[1].split('?')[0];if(url.startsWith('data:')||url.startsWith('https://emoboi.com'))continue;assert.ok(!/^https?:/.test(url),file+' external runtime: '+url);
   assert.ok(fs.existsSync(path.resolve(root,path.dirname(file),url)),file+': '+url);
  }
  for(const [i,m] of [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].entries())new vm.Script(m[1],{filename:file+':'+i});
 }
});
test('网页主入口和菜单进入桌游，隐藏旅游入口未公开',()=>{
 const html=read('index.html');assert.equal((html.match(/href="boardgames\/"/g)||[]).length,2);assert.ok(!html.includes('href="clocktower/"'));assert.ok(!/href="(?:\.\/)?vn\//.test(html));assert.ok(!/id="preloader"/.test(html));
});
test('旧钟楼URL仅跳转，新地址保留原工作区和Key，不自动新建对局',()=>{
 const old=read('clocktower/index.html'),app=read('boardgames/clocktower/index.html');assert.match(old,/location\.replace\('\/boardgames\/clocktower\/'\+location.search\+location.hash\)/);assert.ok(app.includes("const STORAGE = 'clocktower-notebook.v1'"));assert.ok(app.includes('if(tabletopPage&&!game()&&!rawRecovery)openSetup()'));assert.ok(app.includes('emoboi.deepseek.key.v1'));
});
test('狼人杀保留三模式与原存储，移除钟楼待开发占位',()=>{
 const html=read('boardgames/werewolf/index.html');assert.ok(html.includes('boardgame-identity-dispenser-v2'));assert.ok(html.includes('标准狼')&&html.includes('双身份')&&html.includes('自信狼'));assert.ok(html.includes('href="/boardgames/"'));assert.ok(!html.includes('<strong>血染钟楼</strong><span class="pending">待开发中'));
});
test('首页拼贴资源保留27张，派生图体积低于原总量的15%',()=>{
 const metrics=JSON.parse(read('scripts/asset-metrics-v33.json'));assert.equal(metrics.length,27);assert.ok(metrics.reduce((n,r)=>n+r.after,0)<metrics.reduce((n,r)=>n+r.before,0)*.15);for(const r of metrics)assert.ok(fs.statSync(path.join(root,r.target)).size>0);
});
test('英语使用个人Key客户端与可选模型，不走旧代理和硬编码模型',()=>{
 const app=read('english/app.js'),settings=read('english/ai-settings.js');assert.ok(app.includes('AI.analyze'));assert.ok(app.includes('AI.getSettings().model'));assert.ok(!/api\.emoboi\.com|ENGLISH_LEXICON_CONFIG|MODEL_FAST/.test(app));assert.ok(settings.includes('navigator.clipboard.readText()'));assert.ok(settings.includes('rememberKey:true'));assert.ok(!/sk-[a-zA-Z0-9]{20,}/.test(settings));
});
test('可选代理不再以网站Secret替用户调用，无Authorization时拒绝且不触发上游',async()=>{
 let count=0,sent;const sandbox={module:{exports:{}},URL,Response,Headers,fetch:async(url,init)=>{count++;sent={url,init};return new Response('data: [DONE]\n\n',{headers:{'content-type':'text/event-stream'}});}};
 vm.runInNewContext(read('workers/deepseek-proxy/src/index.js').replace('export default','module.exports ='),sandbox);const worker=sandbox.module.exports;
 const headers={'Origin':'https://emoboi.com','Content-Type':'application/json'},env={DEEPSEEK_API_KEY:'site-key-must-never-be-used',ALLOWED_ORIGINS:'https://emoboi.com'};
 const missing=await worker.fetch(new Request('https://api.emoboi.com/v1/chat/completions',{method:'POST',headers,body:'{}'}),env);assert.equal(missing.status,401);assert.equal(count,0);
 const result=await worker.fetch(new Request('https://api.emoboi.com/v1/chat/completions',{method:'POST',headers:{...headers,Authorization:'Bearer integration-test-key'},body:'{}'}),env);assert.equal(result.status,200);assert.equal(count,1);assert.equal(sent.init.headers.Authorization,'Bearer integration-test-key');
});
