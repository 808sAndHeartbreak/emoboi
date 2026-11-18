/* Content versions keep a new document paired with the correct cached CSS and JS. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const pages=['index.html','boardgames/index.html','sf6/index.html','gojuon/index.html','gallery/index.html','music/index.html','english/index.html','vn/index.html'];
for(const file of pages){const full=path.join(root,file);let html=fs.readFileSync(full,'utf8');
 html=html.replace(/<(script|link)\b[^>]*>/g,tag=>{
  if(tag.startsWith('<link')&&!/rel="stylesheet"/.test(tag))return tag;
  return tag.replace(/\b(src|href)="([^"]+)"/,(match,attr,url)=>{
   if(/^(?:https?:|data:|#)/.test(url))return match;
   const plain=url.split(/[?#]/)[0],target=path.resolve(path.dirname(full),plain);if(!fs.existsSync(target))throw Error(file+': missing '+plain);
   const version=crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex').slice(0,10);
   return `${attr}="${plain}?v=${version}"`;
  });
 });
 fs.writeFileSync(full,html);
}
console.log('Stamped local CSS and JS by content. Fonts and images keep their existing URLs.');
