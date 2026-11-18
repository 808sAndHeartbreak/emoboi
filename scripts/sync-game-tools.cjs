/* Run each source build first. Keeps the website's shared client in sync. */
'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),workspace=path.dirname(root),clock=path.join(workspace,'clocktower-notebook'),wolf=path.join(workspace,'werewolf-integrated');
for(const [from,to] of [[path.join(clock,'钟楼手记.html'),'boardgames/clocktower/index.html'],[path.join(clock,'ai-adapter.js'),'shared/deepseek-client.js'],[path.join(clock,'cost.js'),'shared/cost.js'],[path.join(wolf,'public/index.html'),'boardgames/werewolf/index.html']]){
 if(!fs.existsSync(from))throw Error('Build artifact missing: '+from);fs.mkdirSync(path.dirname(path.join(root,to)),{recursive:true});fs.copyFileSync(from,path.join(root,to));
}
fs.cpSync(path.join(wolf,'public/assets'),path.join(root,'boardgames/werewolf/assets'),{recursive:true});
console.log('Synced clocktower, werewolf, and shared AI client. Legacy redirect stays intact.');
