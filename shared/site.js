/* Shared navigation and pointer feedback; no framework or network dependency. */
(function(){'use strict';
const pages=[['/','EMOBOI','首页'],['/sf6/','SF6','帧数工具'],['/boardgames/','桌游','发牌与推理'],['/gojuon/','GOJUON','五十音'],['/english/','LEXICON','英语'],['/gallery/','GALLERY','图集'],['/music/','IAMMUSIC','音乐']];
const panel=document.querySelector('dialog[data-site-nav]');
if(panel){
panel.innerHTML='<div class="site-nav-head"><span>EMOBOI</span><form method="dialog"><button aria-label="关闭站点导航" autofocus>×</button></form></div><nav aria-label="站点导航">'+pages.map(([url,name,sub],i)=>`<a href="${url}"${location.pathname===url?' aria-current="page"':''}><span class="site-nav-no">0${i}</span><strong>${name}</strong><small>${sub}</small><span aria-hidden="true">↗</span></a>`).join('')+'</nav>';
document.querySelectorAll('[data-site-menu]').forEach(button=>{
button.setAttribute('aria-label','打开站点导航');button.setAttribute('aria-controls',panel.id);button.setAttribute('aria-expanded','false');
button.addEventListener('click',()=>{panel.showModal();button.setAttribute('aria-expanded','true');});
});
panel.addEventListener('close',()=>document.querySelectorAll('[data-site-menu]').forEach(b=>b.setAttribute('aria-expanded','false')));
}
window.lucide?.createIcons();
const dot=document.getElementById('cursor-dot'),ring=document.getElementById('cursor-ring');
if(!dot||!ring)return;
const enabled=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
let frame=0,x=0,y=0,rx=0,ry=0;
function stop(){cancelAnimationFrame(frame);frame=0;document.documentElement.classList.remove('site-pointer');}
function draw(){frame=0;rx+=(x-rx)*.22;ry+=(y-ry)*.22;dot.style.transform=`translate3d(${x-5}px,${y-5}px,0)`;ring.style.transform=`translate3d(${rx-20}px,${ry-20}px,0)`;if(Math.abs(x-rx)+Math.abs(y-ry)>.3)frame=requestAnimationFrame(draw);}
document.addEventListener('pointermove',e=>{if(!enabled.matches||document.hidden||e.pointerType==='touch'||document.querySelector('dialog[open]')){stop();return;}const fresh=!document.documentElement.classList.contains('site-pointer');x=e.clientX;y=e.clientY;if(fresh){rx=x;ry=y;}document.documentElement.classList.add('site-pointer');if(!frame)frame=requestAnimationFrame(draw);},{passive:true});
document.addEventListener('pointerover',e=>ring.classList.toggle('hover',!!e.target.closest('a,button,input,.gallery-item,.char-unit')),{passive:true});
document.addEventListener('pointerout',e=>{if(!e.relatedTarget)stop();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});enabled.addEventListener('change',stop);
})();
