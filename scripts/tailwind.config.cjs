'use strict';
const path=require('node:path');
module.exports={content:['sf6','gojuon','gallery'].flatMap(dir=>['index.html','app.js','data/*.js'].map(file=>path.join(__dirname,'..',dir,file))),theme:{extend:{}},plugins:[]};
