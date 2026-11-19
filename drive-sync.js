/* Persistent PDF queue; upload only after the matching GMAO version has saved. */
(()=>{
const KEY='ssti_drive_queue',DONE='ssti_drive_done';
let busy=false;
const get=k=>{try{return JSON.parse(localStorage.getItem(k))||{}}catch(e){return{}}};
let queue=get(KEY),done=get(DONE);
const notice=document.createElement('div');notice.className='gmao-box';notice.setAttribute('role','status');$('gmaoBox').after(notice);
function paint(error){const n=Object.keys(queue).length;notice.textContent=error|| (n?n+' PDF en attente de rangement dans Drive':'Rapports PDF synchronisés avec Drive');}
function save(){localStorage.setItem(KEY,JSON.stringify(queue));paint();}
function askParent(payload){return new Promise((resolve,reject)=>{const requestId=crypto.randomUUID(),parentOrigin=new URL(document.referrer).origin;
const listener=e=>{if(e.source!==parent||e.origin!==parentOrigin||e.data?.type!=='ssti-drive-result'||e.data.requestId!==requestId)return;clearTimeout(timer);removeEventListener('message',listener);e.data.ok?resolve():reject(new Error(e.data.error||'Rangement Drive impossible'));};
const timer=setTimeout(()=>{removeEventListener('message',listener);reject(new Error('Le rangement Drive est en attente. Réessayez depuis la GMAO.'));},60000);addEventListener('message',listener);parent.postMessage({type:'ssti-drive-upload',requestId,...payload},parentOrigin);});}
async function upload(payload){if(parent!==window)return askParent(payload);const api=window.__gmaoApi,t=await api.token();if(!t)throw new Error('Connectez-vous à la GMAO pour ranger le PDF.');
const r=await fetch('https://weld-loaner-ledger.lovable.app/api/public/rapport-drive',{method:'POST',headers:{Authorization:'Bearer '+t,'Content-Type':'application/json'},body:JSON.stringify(payload)});const body=await r.json();if(!r.ok)throw new Error(body.error||'Rangement Drive refusé');}
async function drain(){if(busy||!navigator.onLine||!window.__gmaoSync)return;busy=true;
try{const state=__gmaoSync.state();for(const [local,item] of Object.entries(queue)){if(state.SY[local]!==item.version)continue;
await upload(item.payload);done[item.payload.id]=item.version;localStorage.setItem(DONE,JSON.stringify(done));delete queue[local];save();}}
catch(e){paint('Drive : '+e.message);}finally{busy=false;}}
const original=saveHist;
saveHist=async function(){await original.apply(this,arguments);if(!CUR||!VALID)return;const rec=HIST.find(r=>r.id===CUR.id);if(!rec)return;
try{const id=await __gmaoSync.uuidFor(rec.id);if(done[id]===rec.updatedAt)return;const blob=buildPdf().output('blob');const pdfBase64=await new Promise((ok,ko)=>{const reader=new FileReader();reader.onload=()=>ok(String(reader.result).split(',')[1]);reader.onerror=()=>ko(reader.error);reader.readAsDataURL(blob);});queue[rec.id]={version:rec.updatedAt,payload:{id,updatedAt:new Date(rec.updatedAt).toISOString(),pdfBase64}};save();}
catch(e){paint('Préparation Drive impossible : '+e.message);}};
const retry=document.createElement('button');retry.type='button';retry.className='btn btn-line';retry.textContent='Réessayer le rangement Drive';notice.after(retry);retry.onclick=async()=>{await __gmaoSync.syncNow(true);await drain();};
addEventListener('online',drain);setInterval(drain,10000);paint();setTimeout(drain,3000);
})();
