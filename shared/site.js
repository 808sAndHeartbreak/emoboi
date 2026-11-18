/* Shared navigation and pointer feedback; no framework or network dependency. */
(function(){'use strict';
const pages=[['/','emoboi','首页'],['/sf6/','Frame lab','街霸 6'],['/boardgames/','桌游','发牌与推理'],['/gojuon/','Gojūon','五十音'],['/english/','Lexicon','英语'],['/gallery/','Archive','图集'],['/music/','iammusic','音乐']];
const panel=document.querySelector('dialog[data-site-nav]');
if(panel){
panel.innerHTML='<div class="site-nav-head"><span>目录</span><form method="dialog"><button aria-label="关闭站点导航" autofocus>×</button></form></div><nav aria-label="站点导航">'+pages.map(([url,name,sub],i)=>`<a href="${url}"${location.pathname===url?' aria-current="page"':''}><span class="site-nav-no">0${i}</span><strong>${name}</strong><small>${sub}</small><span aria-hidden="true">↗</span></a>`).join('')+'</nav>';
document.querySelectorAll('[data-site-menu]').forEach(button=>{
button.setAttribute('aria-label','打开站点导航');button.setAttribute('aria-controls',panel.id);button.setAttribute('aria-expanded','false');
button.addEventListener('click',()=>{panel.showModal();button.setAttribute('aria-expanded','true');});
});
panel.addEventListener('close',()=>document.querySelectorAll('[data-site-menu]').forEach(b=>b.setAttribute('aria-expanded','false')));
}
window.lucide?.createIcons();
})();
