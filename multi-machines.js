/* SSTI: independent machine drafts, existing PDF renderer and member-session reads. */
(()=>{
const clone=x=>JSON.parse(JSON.stringify(x));
const serial=x=>String(x||'').trim().toUpperCase().replace(/\s/g,'');
let machines=[],active=0,enabled=false,batch=false,request=0;
const old=$('serieBox');old.hidden=true;old.style.display='none';
const box=document.createElement('div');box.className='serie int-only';box.style.gridColumn='1/-1';
box.innerHTML='<label class="prov"><input type="checkbox" id="multiEnabled"> Plusieurs machines</label><div id="multiBody" hidden><div class="serie-add"><input id="multiSerials" class="mono" aria-label="Numéros de série supplémentaires" placeholder="N° de série séparés par des espaces"><button type="button" class="btn btn-line" id="multiAdd">Ajouter</button></div><div id="multiTabs" class="serie-l"></div><button type="button" class="btn btn-go" id="multiPdf">PDF de toutes les machines</button></div>';
old.after(box);
function capture(){if(machines[active])machines[active]=clone({...draftData(),multi:undefined,_multiTouched:true});}
function paint(){ $('multiBody').hidden=!enabled;$('multiEnabled').checked=enabled;
$('multiTabs').innerHTML=machines.map((m,i)=>'<button type="button" class="btn '+(i===active?'btn-go':'btn-line')+'" data-machine="'+i+'" aria-pressed="'+(i===active)+'">'+esc(m.f.sn||'Machine '+(i+1))+(m.cur?' ✓':'')+'</button>').join('');
$('multiPdf').hidden=machines.length<2;}
const baseDraft=draftData,baseApply=applyDraft;
draftData=function(){const d=baseDraft();return {...d,multi:enabled?{active,machines:machines.map((m,i)=>i===active?clone(d):m)}:undefined};};
applyDraft=function(d){baseApply(d);if(d.multi&&Array.isArray(d.multi.machines)){machines=clone(d.multi.machines);active=Math.min(d.multi.active||0,machines.length-1);enabled=true;paint();}};
function select(i){capture();if(!machines[i]._multiTouched){const next=fresh(machines[active],machines[i].f.sn);next.f.ri=machines[i].f.ri;machines[i]=next;}active=i;initMes();pads.forEach(p=>p.clear());VALID=null;baseApply(clone(machines[i]));paint();scheduleDraft();}
function fresh(d,sn){const n=clone(d);delete n.multi;delete n.serie;delete n._multiTouched;n.cur=null;n.f.sn=sn;n.f.ri='';n.f.riProv=false;n.riSaved='';
['dfab','compteur','pCompteur','intObs','rem'].forEach(k=>n.f[k]='');n.PHOTOS=[];n.DOCS=[];n.auto=[];n.doutes=[];
const flags=TYPES[n.type].champs.map(c=>/mesur/i.test(c[0]));const m=n.MES[n.type];if(m){m.emb=m.emb.map(row=>row.map((v,i)=>flags[i]?'':v));if(m.com)m.com=m.com.map((v,i)=>flags[i]?'':v);}return n;}
$('multiEnabled').onchange=()=>{if(!$('multiEnabled').checked&&machines.length>1&&!confirm('Garder uniquement la machine affichée ? Les autres saisies du groupe seront retirées du brouillon.')){$('multiEnabled').checked=true;return;}enabled=$('multiEnabled').checked;machines=enabled?[clone(baseDraft())]:[];active=0;paint();scheduleDraft();};
$('multiAdd').onclick=()=>{capture();if(!serial($('sn').value)){toast('Saisissez le numéro de série de la première machine.');return;}const seen=new Set(machines.map(m=>serial(m.f.sn)));const values=$('multiSerials').value.split(/[,;\s]+/).filter(Boolean);for(const sn of values){if(seen.has(serial(sn)))continue;seen.add(serial(sn));machines.push(fresh(machines[active],sn));}$('multiSerials').value='';paint();scheduleDraft();};
$('multiSerials').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();$('multiAdd').click();}};
$('multiTabs').onclick=e=>{const b=e.target.closest('[data-machine]');if(b)select(Number(b.dataset.machine));};
async function suggest(force=false){if(CUR||$('riProv').checked)return;const id=++request,previous=$('ri').value;
try{const api=window.__gmaoApi,t=api&&await api.token();if(!t){toast('Connectez-vous à la GMAO pour proposer le numéro suivant.');return;}
const year=($('date').value||'').slice(0,4)||String(new Date().getFullYear());const prefix=typeof kind!=='undefined'&&kind==='pret'?'SP':'S';let rows=[],offset=0;
for(;;){const r=await fetch(api.url+'/rest/v1/rapports_intervention?select=numero,provisoire&provisoire=eq.false&order=id&offset='+offset+'&limit=1000',{headers:{apikey:api.key,Authorization:'Bearer '+t}});if(!r.ok)throw new Error();const page=await r.json();rows.push(...page);if(page.length<1000)break;offset+=1000;}
if(id!==request||CUR||$('ri').value!==previous)return;let max=0;const re=new RegExp('^\\s*'+year+'\\s*-\\s*'+prefix+'\\s*(\\d+)\\s*$','i');
rows.concat(HIST.map(r=>({numero:r.ri,provisoire:r.data?.f?.riProv})),machines.filter((_,i)=>i!==active).map(m=>({numero:m.f.ri,provisoire:m.f.riProv}))).forEach(r=>{if(r.provisoire)return;const m=re.exec(r.numero||'');if(m)max=Math.max(max,Number(m[1]));});
if(!max){toast('Aucun rapport numéroté pour cette année : saisissez le premier numéro.');return;}
const num=year+'-'+prefix+(max+1);if(!previous||force){if(previous&&previous!==num&&!confirm('Remplacer '+previous+' par le numéro proposé '+num+' ?'))return;$('ri').value=num;$('ri').dispatchEvent(new Event('input',{bubbles:true}));capture();paint();scheduleDraft();}}
catch(e){toast('Numéro suivant indisponible : vérifiez la connexion à la GMAO.');}}
$('ri').addEventListener('focus',()=>suggest(true));
$('multiPdf').onclick=async()=>{capture();batch=true;select(0);await suggest();valReport();};
const validate=$('valGo').onclick;
$('valGo').onclick=async function(){if(!isProv()&&!$('ri').value.trim()){toast('Saisissez ou proposez un numéro de rapport.');return;}await validate.call(this);capture();paint();
if(batch&&CUR){if(active+1<machines.length){select(active+1);await suggest();valReport();}else{batch=false;toast(machines.length+' rapports distincts générés.');}}};
const back=$('valBack').onclick;$('valBack').onclick=function(){batch=false;back.call(this);};
const reset=window.newReport;window.newReport=function(){enabled=false;machines=[];active=0;batch=false;reset.apply(this,arguments);paint();};
function restore(){if(!draftReady){setTimeout(restore,100);return;}const d=baseDraft();if(d.multi)applyDraft(d);else readDraft().then(saved=>{if(saved?.multi)applyDraft(saved);});}restore();paint();
})();
