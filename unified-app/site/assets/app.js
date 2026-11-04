"use strict";
const $=id=>document.getElementById(id);
const AREAS=['Governance & Resilience','Cybersecurity & OT','IT Operations & Automation','Data & Analytics'];
const SOURCE_AREAS=[...AREAS,'Portfolio'];
const isVisibleModule=m=>m?.kind!=='portfolio-index'&&m?.id!=='mvahora2023';
const IDS=new Set(['compliance-gap-tracker-v2','enterprise-grc-program','tsa-biennial-audit-readiness-checklist','utility-tabletop-exercise-program','architecture-design-review-template','mini-soc-lab','ics-ot-risk-assessment-lab','safeops-toolkit','powershell-automation','android-mcp-windows-setup','data-analytics-portfolio','mvahora2023']);
let release=null,category='all',activeId=null,query='';
const good=m=>m&&IDS.has(m.id)&&m.originalUrl==='https://github.com/mvahora2023/'+m.id&&m.copyPath==='modules/'+m.id+'/index.html'&&SOURCE_AREAS.includes(m.group)&&/^[a-f0-9]{64}$/.test(m.sha256);
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=String(text);return e;};
const date=x=>{const d=new Date(x);return Number.isNaN(d.getTime())?'Unavailable':d.toLocaleString();};
const short=x=>String(x).replace('blob:','').slice(0,10);
const checked=new Map();
function navigate(area,id=null,replace=false){
 category=area;activeId=id;
 const u=new URL(location.href);
 u.searchParams.delete('area');u.searchParams.delete('module');
 if(id&&id!=='mvahora2023')u.searchParams.set('module',id);
 else if(area!=='all')u.searchParams.set('area',area);
 history[replace?'replaceState':'pushState']({area,id},'',u);
 render();
}
function render(){
 for(const b of document.querySelectorAll('[data-view]')){
  const chosen=!activeId&&category===b.dataset.view;
  b.classList.toggle('active',chosen);b.setAttribute('aria-current',chosen?'page':'false');
 }
 $('catalog').hidden=!!activeId||category==='sync';
 $('modulePanel').hidden=!activeId;
 $('syncPanel').hidden=!!activeId||category!=='sync';
 if(activeId){showModule(activeId);return;}
 $('frameArea').replaceChildren();
 if(category==='sync'){renderStatus();return;}
 $('catalogTitle').textContent=category==='all'?'All modules':category;
 $('catalogSubtitle').textContent=category==='all'?'11 interactive technical modules from 12 tracked public sources':'Self-contained modules within this portfolio area';
 renderCards();
}
function renderCards(){
 const root=$('cards');root.replaceChildren();
 if(!release)return;
 const rows=release.modules.filter(m=>isVisibleModule(m)&&(category==='all'||m.group===category)&&[m.title,m.id,m.group,m.role,m.summary].join(' ').toLowerCase().includes(query));
 $('empty').hidden=rows.length>0;
 for(const m of rows){
  const card=el('article','tile');
  card.append(el('div','caption',m.role),el('h3',null,m.title),el('p',null,m.summary));
  const bottom=el('div','tile-foot');
  const open=el('button','btn primary','Open in Unified');open.type='button';open.addEventListener('click',()=>navigate('all',m.id));
  const rev=el('span','mono',short(m.sourceRevision));rev.title='Pinned upstream revision: '+m.sourceRevision;
  bottom.append(open,rev);card.append(bottom);root.append(card);
 }
}
async function validateCopy(m){
 if(checked.has(m.id))return;
 const response=await fetch('/'+m.copyPath,{credentials:'omit',cache:'no-store'});
 if(!response.ok)throw Error('Browser copy unavailable (HTTP '+response.status+')');
 const bytes=await response.arrayBuffer();
 const digest=await crypto.subtle.digest('SHA-256',bytes);
 const hex=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
 if(hex!==m.sha256)throw Error('Copied HTML does not match its release checksum');
 checked.set(m.id,true);
}
async function showModule(id){
 const m=release.modules.find(x=>x.id===id);
 if(!m||!isVisibleModule(m)){navigate('all');return;}
 $('viewerTitle').textContent=m.title;
 $('viewerSub').textContent=m.role+' · '+m.group;
 $('original').href=m.originalUrl;
 const info=$('moduleDetails');info.replaceChildren();
 for(const [key,value] of [['Upstream',m.originalUrl],['Revision',m.sourceRevision],['Released',date(release.generatedAt)],['Mode',m.runtime]]){
  const s=el('span');s.append(el('strong',null,key+': '),el('code',null,value));info.append(s);
 }
 const box=$('frameArea');box.replaceChildren();
 const msg=el('p','notice','Verifying SHA-256 of the copied module...');box.append(msg);
 try{
  await validateCopy(m);
  if(activeId!==id)return;
  const frame=document.createElement('iframe');
  frame.title='Isolated copy of '+m.title;
  frame.sandbox='allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox';
  frame.referrerPolicy='no-referrer';
  frame.loading='eager';frame.src='/'+m.copyPath;
  box.replaceChildren(frame);
 }catch(e){
  if(activeId!==id)return;
  msg.textContent='This module could not be opened safely: '+String(e.message).slice(0,150)+'. The original remains available through its GitHub link.';
 }
}
function renderStatus(){
 const target=$('syncRows');target.replaceChildren();
 for(const m of release.modules){
  const tr=el('tr');
  const source=el('td',null,isVisibleModule(m)?m.title:'Portfolio source (tracked, not displayed)');
  const rev=el('td','mono',short(m.sourceRevision));rev.title=m.sourceRevision;
  const state=el('td',null,!isVisibleModule(m)?'Source-only · excluded from project gallery':checked.has(m.id)?'SHA-256 verified in browser':'Pinned copy · not yet checked here');
  tr.append(source,rev,state);target.append(tr);
 }
 $('syncNote').textContent='Release generated '+date(release.generatedAt)+'. Checksums verify copied web files, not full Windows/Python/backend application functionality. A failed upstream build must leave this deployed release unchanged.';
}
async function loadManifest(){
 const r=await fetch('/release.json',{credentials:'omit',cache:'no-store'});
 if(!r.ok)throw Error('Release manifest unavailable');
 const v=await r.json();
 if(v.schemaVersion!==1||v.sourceCount!==12||!Array.isArray(v.modules)||v.modules.length!==12||new Set(v.modules.map(m=>m.id)).size!==12||v.modules.some(m=>!good(m)))throw Error('Invalid release, module count, or source identity');
 release=v;checked.clear();
 const hdr=$('headerState');hdr.textContent='11 modules · 12 sources';hdr.className='status ok';
 const p=new URL(location.href).searchParams,m=p.get('module'),a=p.get('area');
 if(m&&IDS.has(m)&&m!=='mvahora2023')navigate('all',m,true);
 else navigate(AREAS.includes(a)||a==='sync'?a:'all',null,true);
}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.view)));
$('search').addEventListener('input',e=>{query=e.target.value.toLowerCase().trim();renderCards();});
$('back').addEventListener('click',()=>navigate('all'));
$('refresh').addEventListener('click',()=>loadManifest().catch(e=>{const h=$('headerState');h.textContent=e.message;h.className='status error';}));
window.addEventListener('popstate',()=>{if(!release)return;const p=new URL(location.href).searchParams,m=p.get('module'),a=p.get('area');if(m&&IDS.has(m)&&m!=='mvahora2023'){activeId=m;category='all';}else{activeId=null;category=AREAS.includes(a)||a==='sync'?a:'all';}render();});
loadManifest().catch(e=>{const h=$('headerState');h.textContent='Release unavailable';h.className='status error';$('cards').replaceChildren(el('div','empty',e.message));});
