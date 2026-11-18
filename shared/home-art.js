(function(){'use strict';
 const reduce=matchMedia('(prefers-reduced-motion:reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
 const control=document.getElementById('motion-toggle'),art=[...document.querySelectorAll('.collage-img')];
 let paused=false;try{paused=localStorage.getItem('emoboi.motion.v1')==='paused';}catch(_){}
 let frame=0,x=0,y=0,tx=0,ty=0;
 function stop(){cancelAnimationFrame(frame);frame=0;document.body.classList.remove('custom-pointer');}
 function sync(){const off=paused||reduce.matches;document.documentElement.classList.toggle('motion-paused',off);control.textContent=off?'▷':'Ⅱ';control.setAttribute('aria-label',off?'开启动效':'暂停动效');control.title=off?'开启动效':'暂停动效';control.disabled=reduce.matches;if(off)stop();}
 art.forEach((img,i)=>{img.dataset.artIndex=i;const angle=img.style.transform.match(/rotate\(([^)]+)\)/)?.[1]||'0deg';img.style.setProperty('--rotate',angle);img.style.setProperty('--art-delay',(-i*.7)+'s');if(i%4===1)img.classList.add('art-float');});
 window.lucide?.createIcons();
 control.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('emoboi.motion.v1',paused?'paused':'enabled');}catch(_){}sync();});reduce.addEventListener('change',sync);sync();
 function paint(){frame=0;if(paused||reduce.matches||document.hidden)return;x+=(tx-x)*.13;y+=(ty-y)*.13;art.forEach((img,i)=>{if(i%3)return;const depth=(i%4+1)*.35;img.style.setProperty('--art-x',(x*depth).toFixed(2)+'px');img.style.setProperty('--art-y',(y*depth).toFixed(2)+'px');});if(Math.abs(tx-x)+Math.abs(ty-y)>.05)frame=requestAnimationFrame(paint);}
 document.addEventListener('pointermove',e=>{if(paused||reduce.matches||!fine.matches||document.hidden||document.querySelector('#fullscreen-menu[open]'))return;tx=(e.clientX/innerWidth-.5)*9;ty=(e.clientY/innerHeight-.5)*7;if(!frame)frame=requestAnimationFrame(paint);},{passive:true});
 const groups={sf6:/ryuk|punk|rockstar|gaara/,boardgames:/goth|angel|skeleton|cat/,gojuon:/nihongo|jin|towa/,english:/girl|light-yagami/,gallery:/misa|angel|girl/,music:/iammusic|peep|ecco|logo-e/};
 function highlight(link){const group=link?.getAttribute('href')?.split('/')[0],pattern=groups[group];art.forEach(img=>{img.classList.toggle('art-near',!!pattern&&pattern.test(img.src));img.classList.toggle('art-far',!!pattern&&!pattern.test(img.src));});}
 document.querySelectorAll('.nav-item').forEach(link=>{link.addEventListener('pointerenter',()=>highlight(link));link.addEventListener('pointerleave',()=>highlight(null));link.addEventListener('focus',()=>highlight(link));link.addEventListener('blur',()=>highlight(null));});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
})();
