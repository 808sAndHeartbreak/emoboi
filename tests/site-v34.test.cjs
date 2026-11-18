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
 const html=read('sf6/index.html');assert.ok(html.indexOf('const CHARACTER_DATA = {}')<html.indexOf('data/ryu.js'));assert.ok(html.indexOf('data/zangief_modern.js')<html.indexOf('src="app.js"'));
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
