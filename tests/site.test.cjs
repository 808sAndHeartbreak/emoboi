'use strict';
{
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
test('新文档引用与实际文件内容一致的CSS和JS版本，避免新旧资源混用',()=>{
 for(const file of ['index.html','boardgames/index.html','sf6/index.html','gojuon/index.html','gallery/index.html','music/index.html','english/index.html','vn/index.html']){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  for(const m of html.matchAll(/<(script|link)\b[^>]*>/g)){
   if(m[1]==='link'&&!/rel="stylesheet"/.test(m[0]))continue;
   const url=m[0].match(/(?:src|href)="([^"]+)"/)?.[1];if(!url||/^(?:data:|https?:)/.test(url))continue;
   const [name,version]=url.split('?v=');const data=fs.readFileSync(path.resolve(root,path.dirname(file),name));assert.equal(version,crypto.createHash('sha256').update(data).digest('hex').slice(0,10),file+': '+url);
  }
 }
});
test('美术资源预算与钟楼离线包体积不回退，保留标题字体和嵌入图片',()=>{
 const file=fs.readFileSync(path.join(root,'boardgames/clocktower/index.html'),'utf8');assert.ok(Buffer.byteLength(file)<1400000);assert.ok(file.includes('data:image/webp;base64,'));assert.ok(file.includes('Notebook Serif'));assert.ok(!file.includes("font-family:'Notebook Sans';font-style"));
 assert.ok(fs.statSync(path.join(root,'asset/edition/reliquary-small.webp')).size<30000);assert.ok(fs.statSync(path.join(root,'shared/fonts/unifrakturcook-latin.woff2')).size<25000);
 const home=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.match(home,/<picture class="home-art"/);assert.match(home,/fetchpriority="high"/);assert.ok(!home.includes('requestAnimationFrame'));
});
}
{
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
 const html=read('index.html');assert.equal((html.match(/href="boardgames\/"/g)||[]).length,1);assert.ok(read('shared/site.js').includes('/boardgames/'));assert.ok(!html.includes('href="clocktower/"'));assert.ok(!/href="(?:\.\/)?vn\//.test(html));assert.ok(!/id="preloader"/.test(html));
});
test('旧钟楼URL仅跳转，新地址保留原工作区和Key，不自动新建对局',()=>{
 const old=read('clocktower/index.html'),app=read('boardgames/clocktower/index.html');assert.match(old,/location\.replace\('\/boardgames\/clocktower\/'\+location.search\+location.hash\)/);assert.ok(app.includes("const STORAGE = 'clocktower-notebook.v1'"));assert.ok(app.includes('if(tabletopPage&&!game()&&!rawRecovery)openSetup()'));assert.ok(app.includes('emoboi.deepseek.key.v1'));
});
test('狼人杀保留三模式与原存储，移除钟楼待开发占位',()=>{
 const html=read('boardgames/werewolf/index.html');assert.ok(html.includes('boardgame-identity-dispenser-v2'));assert.ok(html.includes('标准狼')&&html.includes('双身份')&&html.includes('自信狼'));assert.ok(html.includes('href="/boardgames/"'));assert.ok(!html.includes('<strong>血染钟楼</strong><span class="pending">待开发中'));
});
test('既有27张拼贴预览资产保留，体积低于原总量的15%',()=>{
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

}
{
'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file),'utf8');
const pages=['index.html','boardgames/index.html','boardgames/werewolf/index.html','boardgames/clocktower/index.html','english/index.html','sf6/index.html','gojuon/index.html','gallery/index.html','music/index.html'];
test('所有公共页面依赖本地可用资源，脚本语法与延迟加载顺序有效',()=>{
 const checked=new Set();
 for(const file of pages){
  const html=read(file).replace(/<!--[\s\S]*?-->/g,'');
  for(const m of html.matchAll(/<(script|link|img|video)\b([^>]*)>/g)){
   const attr=m[2],url=attr.match(/\b(?:src|href|poster)="([^"]*)"/)?.[1];
   if(!url||/^(data:|#)/.test(url))continue;
   assert.ok(!/^https?:/.test(url),`${file}: external runtime ${url}`);
   const target=path.resolve(root,path.dirname(file),url.split('?')[0]);assert.ok(fs.existsSync(target),`${file}: missing ${url}`);
   if(m[1]==='script'){
    assert.match(attr,/\bdefer\b/,file+': blocking external script');
    if(!checked.has(target)){new vm.Script(fs.readFileSync(target,'utf8'),{filename:target});checked.add(target);}
   }
  }
  for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(m[1],{filename:file});
 }
});
test('角色依赖保持先数据后应用；SF6、图库和音乐不再等待全部资源加载',()=>{
 const html=read('sf6/index.html');assert.ok(html.indexOf('const CHARACTER_DATA = {}')<html.indexOf('data/ryu.js'));assert.ok(html.indexOf('data/zangief_modern.js')<html.indexOf('src="app.js?'));
 for(const name of ['sf6','gallery','music']){const app=read(name+'/app.js');assert.doesNotMatch(app,/window\.onload|window\.addEventListener\('load'/);assert.match(app,/DOMContentLoaded/);}
});
test('图库全部预览保留原图入口、尺寸，首图优先，其余延迟，压缩总量低于原图40%',()=>{
 const metrics=JSON.parse(read('scripts/asset-metrics-v34.json')),html=read('gallery/index.html');assert.equal(metrics.length,31);
 const tags=[...html.matchAll(/<img[^>]+data-full="([^"]+)"[^>]*>/g)];assert.equal(tags.length,31);
 for(const [i,m]of tags.entries()){assert.match(m[0],/width="\d+" height="\d+"/);assert.ok(fs.existsSync(path.resolve(root,'gallery',m[1])));assert.match(m[0],i===0?/loading="eager" fetchpriority="high"/:/loading="lazy"/);}
 assert.ok(metrics.reduce((n,r)=>n+r.after,0)<metrics.reduce((n,r)=>n+r.before,0)*.4);
});
test('共享导航覆盖全部公共分类，隐藏旅行不公开；图标支持控件原地更新',()=>{
 const shell=read('shared/site.js'),icons=read('shared/icons.js');for(const page of ['sf6','boardgames','gojuon','english','gallery','music'])assert.ok(shell.includes('/'+page+'/'));assert.ok(!shell.includes('/vn/'));
 for(const page of ['sf6','gojuon','english','gallery','music'])assert.match(read(page+'/index.html'),/<dialog id="site-navigation" data-site-nav/);
 assert.match(icons,/el\.localName==='svg'/);assert.match(icons,/el\.attributes/);
 const music=read('music/app.js');assert.doesNotMatch(music,/querySelector\('i'\)/);assert.ok(music.includes("[role=button]"));
});
test('媒体初始无src和自动播放，只有播放操作才加载文件；保留无Key保护',()=>{
 const html=read('music/index.html'),app=read('music/app.js');for(const m of html.matchAll(/<(?:audio|video)\b[^>]*>/g)){assert.match(m[0],/preload="none"/);assert.doesNotMatch(m[0],/\bsrc=|\bautoplay\b/);}
 const update=app.slice(app.indexOf('function updateTrackInfo()'),app.indexOf('// 渲染播放列表'));assert.doesNotMatch(update,/(?:video|audio)\.src =/);assert.match(app,/function playTrack\(\)[\s\S]*?currentPlayer\.src=playlist/);
 const english=read('english/app.js');assert.match(english,/const MAX_WORD_LEN = 64/);assert.match(english,/if \(!AI\.available\)/);assert.ok(read('english/index.html').includes('maxlength="64"'));
});

}
