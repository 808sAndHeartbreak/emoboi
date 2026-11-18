/* Run each source build first. Keeps the website's shared client in sync. */
'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),workspace=path.dirname(root),clock=path.join(workspace,'clocktower-notebook'),wolf=path.join(workspace,'werewolf-integrated');
for(const [from,to] of [[path.join(clock,'钟楼手记.html'),'boardgames/clocktower/index.html'],[path.join(clock,'ai-adapter.js'),'shared/deepseek-client.js'],[path.join(clock,'cost.js'),'shared/cost.js'],[path.join(wolf,'public/index.html'),'boardgames/werewolf/index.html']]){
 if(!fs.existsSync(from))throw Error('Build artifact missing: '+from);fs.mkdirSync(path.dirname(path.join(root,to)),{recursive:true});fs.copyFileSync(from,path.join(root,to));
}
function copyAssets(from,to){fs.mkdirSync(to,{recursive:true});for(const item of fs.readdirSync(from,{withFileTypes:true})){const source=path.join(from,item.name),target=path.join(to,item.name);if(item.isDirectory())copyAssets(source,target);else if(item.isFile())fs.copyFileSync(source,target);}}
copyAssets(path.join(wolf,'public/assets'),path.join(root,'boardgames/werewolf/assets'));
console.log('Synced clocktower, werewolf, and shared AI client. Legacy redirect stays intact.');
