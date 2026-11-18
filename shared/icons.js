/* Small local outline icon set. No external icon runtime is required. */
(function(){'use strict';
const paths={home:'M3 11 12 3l9 8M5 9v12h5v-7h4v7h5V9',menu:'M4 6h16M4 12h16M4 18h16',x:'m6 6 12 12M6 18 18 6',maximize:'M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5',minimize:'M3 8h5V3m8 0v5h5M8 21v-5H3m18 0h-5v5','arrow-up':'M12 20V4m-7 7 7-7 7 7','chevron-left':'m15 18-6-6 6-6','chevron-right':'m9 18 6-6-6-6','chevron-up':'m6 15 6-6 6 6','chevron-down':'m6 9 6 6 6-6','skip-back':'M19 20 9 12l10-8ZM5 4v16','skip-forward':'m5 4 10 8-10 8ZM19 4v16',shuffle:'m18 14 4 4-4 4M18 2l4 4-4 4M2 18h2.5c6 0 8-12 14-12H22M2 6h2.5c2 0 3.5 1.5 5 4m5 4c1.5 2.5 2.5 4 5 4H22',video:'m16 8 6-4v16l-6-4ZM2 5h14v14H2Z'};
window.lucide={createIcons(){document.querySelectorAll('[data-lucide]').forEach(el=>{
const name=el.dataset.lucide;if(!paths[name]||el.dataset.iconRendered===name)return;
const svg=el.localName==='svg'?el:document.createElementNS('http://www.w3.org/2000/svg','svg');
if(svg!==el)for(const attr of el.attributes)svg.setAttribute(attr.name,attr.value);
for(const [key,value]of Object.entries({viewBox:'0 0 24 24',width:'24',height:'24',fill:'none',stroke:'currentColor','stroke-width':'1.7','stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true'}))if(!svg.hasAttribute(key))svg.setAttribute(key,value);
const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paths[name]);svg.replaceChildren(path);svg.dataset.iconRendered=name;svg.classList.add('lucide');if(svg!==el)el.replaceWith(svg);
});}};})();
