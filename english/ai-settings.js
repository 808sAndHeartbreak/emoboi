(function(){
  'use strict';
  const ai=window.EnglishAI=window.ClocktowerAI.createClient({storagePrefix:'emoboi.english.ai.v1',defaultSettings:{model:'deepseek-flash',maxTokens:8192,rememberKey:true}});
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dialog=document.createElement('dialog');dialog.id='english-ai-dialog';dialog.setAttribute('aria-labelledby','english-ai-title');
  dialog.innerHTML=`<form id="english-ai-form"><header><h2 id="english-ai-title">AI 设置</h2><button type="button" id="ai-close" aria-label="关闭 AI 设置">×</button></header><div class="ai-form-body"><p class="ai-note">与血染钟楼共用 Key，保存在本机。</p><label for="english-api-key">DeepSeek API Key</label><div class="ai-key-row"><input id="english-api-key" type="password" maxlength="512" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="粘贴 API Key"><button type="button" id="ai-paste">粘贴</button></div><label for="english-ai-model">模型</label><div class="ai-model-row"><select id="english-ai-model"></select><button type="button" id="ai-model-refresh">刷新</button></div><label class="ai-think"><input type="checkbox" id="english-ai-thinking">深度思考</label><p id="ai-settings-status" role="status"></p><footer><button type="button" id="ai-clear">清除 Key</button><button type="submit" class="ai-save">保存</button></footer></div></form>`;
  document.body.append(dialog);
  const input=dialog.querySelector('#english-api-key'),select=dialog.querySelector('#english-ai-model'),thinking=dialog.querySelector('#english-ai-thinking'),status=dialog.querySelector('#ai-settings-status');
  function modelOptions(){const a=ai.getSettings();select.innerHTML=a.models.map(m=>`<option value="${esc(m.id)}"${m.id===a.model?' selected':''}>${esc(m.name)}</option>`).join('');thinking.checked=a.thinking;}
  function notify(){window.dispatchEvent(new Event('english-ai-change'));}
  function open(){modelOptions();input.value='';input.placeholder=ai.available?'已配置；留空保持':'粘贴 API Key';status.textContent='';dialog.showModal();if(!ai.available)input.focus();}
  window.openEnglishAISettings=open;
  document.querySelector('#english-ai-open').addEventListener('click',open);
  dialog.querySelector('#ai-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.querySelector('#ai-paste').addEventListener('click',async()=>{try{const value=await navigator.clipboard.readText();input.value=value.trim();input.focus();status.textContent='';}catch(_){input.focus();status.textContent='请在输入框内长按或按 Ctrl/Cmd + V 粘贴。';}});
  dialog.querySelector('#ai-clear').addEventListener('click',()=>{ai.clearKey();input.value='';input.placeholder='粘贴 API Key';status.textContent='已从英语工具与钟楼清除。';notify();});
  dialog.querySelector('#ai-model-refresh').addEventListener('click',async e=>{const button=e.currentTarget,current=select.value,pendingThinking=thinking.checked;button.disabled=true;status.textContent='读取模型…';try{await ai.testConnection(input.value.trim()?{apiKey:input.value.trim()}:{});modelOptions();if([...select.options].some(o=>o.value===current))select.value=current;thinking.checked=pendingThinking;status.textContent='模型已更新';}catch(err){status.textContent=err.message;}finally{button.disabled=false;}});
  dialog.querySelector('form').addEventListener('submit',e=>{e.preventDefault();try{const patch={model:select.value,thinking:thinking.checked,rememberKey:true};if(input.value.trim())patch.apiKey=input.value.trim();const saved=ai.configure(patch);if(!saved.storageAvailable){status.textContent='浏览器无法保存，仅当前页面可用。';return;}input.value='';notify();dialog.close();}catch(err){status.textContent=err.message;}});
  window.addEventListener('storage',e=>{if(e.key?.startsWith('emoboi.deepseek.key.v1'))notify();});
})();
