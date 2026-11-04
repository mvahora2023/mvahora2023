/* Public and synthetic data modes. Opt-in public reads only. No local imports. */
(()=>{"use strict";
const CONF=__SOURCE_CONFIG__;
const $=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=String(text);if(cls)e.className=cls;return e;};
const style=$("style");style.textContent='#public-data-modes{max-width:1150px;margin:34px auto;padding:22px;border:1px solid #487e7d;background:#14303d;color:#e7f9f7;border-radius:15px;font-family:inherit}#public-data-modes h2{color:#fff;margin:0 0 9px;font-size:1.3rem}#public-data-modes .pd-note,#public-data-modes .pd-state{font-size:.86rem;color:#c5dfdc;line-height:1.6}#public-data-modes .pd-controls{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:14px 0}#public-data-modes button,#public-data-modes select{font:inherit;border:1px solid #618b88;background:#193c48;color:#fff;padding:10px 12px;border-radius:9px;cursor:pointer}#public-data-modes button:disabled{opacity:.5}#public-data-modes .pd-items{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px}#public-data-modes .pd-item{background:#0e2533;border:1px solid #40686a;border-radius:11px;padding:12px;min-width:0}#public-data-modes .pd-item h3{color:#eafff9;font-size:.93rem;margin:3px 0;overflow-wrap:anywhere}#public-data-modes .pd-item p{font-size:.8rem;color:#b2cdd2;line-height:1.5;margin:4px 0 10px;overflow-wrap:anywhere}#public-data-modes a{color:#8ef0dd;overflow-wrap:anywhere}#public-data-modes .pd-label{font-size:.69rem;color:#a0dbc9;text-transform:uppercase}#public-data-modes :focus-visible{outline:3px solid #b5ffe9;outline-offset:3px}@media(max-width:640px){#public-data-modes{padding:14px}#public-data-modes .pd-items{grid-template-columns:1fr}}';document.head.append(style);
const panel=$("section");panel.id="public-data-modes";panel.setAttribute("aria-label","Data modes and public references");
panel.append($("h2","Synthetic demonstrations + verified public references"),$("p",CONF.description,"pd-note"));
const controls=$("div",undefined,"pd-controls"),selector=$("select");selector.setAttribute("aria-label","Public reference source");
for(const src of CONF.sources){const opt=$("option",src.label);opt.value=src.id;selector.append(opt);}
const load=$("button","Load public references");load.type="button";
const clear=$("button","Clear public references");clear.type="button";
controls.append(selector,load,clear);panel.append(controls);
const status=$("p","Original synthetic data remains in the project above. Public mode is opt-in; no local files, device information or accounts are used.","pd-state");status.setAttribute("role","status");status.setAttribute("aria-live","polite");panel.append(status);
const items=$("div",undefined,"pd-items");panel.append(items);
panel.append($("p","Public requests are read-only. Your browser may share ordinary network information (including IP address) with the chosen provider. Sources are displayed separately from demo findings. No local files are read or uploaded.","pd-note"));
(document.querySelector("main")||document.body).append(panel);
const trim=(s,n=330)=>String(s??"").slice(0,n);
const NIST=[
["GV","GOVERN","Cybersecurity risk management strategy, expectations, and policy."],
["ID","IDENTIFY","Understand current cybersecurity risks."],
["PR","PROTECT","Use safeguards to manage cybersecurity risks."],
["DE","DETECT","Find and analyze possible cybersecurity attacks and compromises."],
["RS","RESPOND","Take action regarding a detected cybersecurity incident."],
["RC","RECOVER","Restore assets and operations affected by a cybersecurity incident."]
];
async function getJSON(url){
 const u=new URL(url);
 if(u.protocol!=="https:"||!["raw.githubusercontent.com","data.cityofnewyork.us","api.github.com"].includes(u.hostname))throw Error("Unapproved public domain");
 const ctrl=new AbortController(),timeout=setTimeout(()=>ctrl.abort(),15000);
 try{const response=await fetch(u.href,{credentials:"omit",cache:"no-store",referrerPolicy:"no-referrer",signal:ctrl.signal,headers:{"Accept":"application/json"}});
 if(!response.ok)throw Error("HTTP "+response.status);return await response.json();}
 finally{clearTimeout(timeout);}
}
async function loadSource(src){
 if(src.type==="nist"){
 return {rows:NIST.map(([id,name,detail])=>({label:"NIST CSF 2.0 · "+id,title:name,detail,url:"https://csrc.nist.gov/Projects/cybersecurity-framework/filters"})),
 provenance:"NIST's six CSF 2.0 functions. Curated and static, not a live compliance score.",date:"Reference verified November 2026"};
 }
 if(src.type==="kev"){
 const feed=await getJSON("https://raw.githubusercontent.com/cisagov/kev-data/develop/known_exploited_vulnerabilities.json");
 if(!Array.isArray(feed.vulnerabilities))throw Error("Unexpected CISA KEV schema");
 const terms=(src.terms||[]).map(x=>x.toLowerCase());
 const filtered=feed.vulnerabilities.filter(x=>!terms.length||terms.some(t=>(String(x.vendorProject)+" "+String(x.product)+" "+String(x.vulnerabilityName)).toLowerCase().includes(t)));
 filtered.sort((a,b)=>String(b.dateAdded||"").localeCompare(String(a.dateAdded||"")));
 return {rows:filtered.slice(0,24).map(x=>({label:"CISA KEV · "+trim(x.dateAdded,12),title:trim(x.cveID+" · "+x.vendorProject+" · "+x.product,150),detail:trim(x.vulnerabilityName+" · "+x.shortDescription,350),url:"https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve="+encodeURIComponent(x.cveID)})),
 provenance:"CISA KEV, official GitHub mirror; exploitable vulnerability intelligence, NOT a scan of any asset.",date:trim(feed.dateReleased||feed.catalogVersion||"not provided",60)};
 }
 if(src.type==="nyc"){
 const url=new URL("https://data.cityofnewyork.us/resource/erm2-nwe9.json");
 url.searchParams.set("$select","created_date,complaint_type,borough,status");
 url.searchParams.set("$order","created_date DESC");url.searchParams.set("$limit","24");
 const data=await getJSON(url.href);if(!Array.isArray(data))throw Error("Unexpected NYC dataset schema");
 return {rows:data.map(x=>({label:"NYC 311 · "+trim(x.created_date,10),title:trim(x.complaint_type||"Not specified",120),detail:trim((x.borough||"Borough not specified")+" · "+(x.status||"Status not specified"),220),url:"https://data.cityofnewyork.us/d/erm2-nwe9"})),
 provenance:"NYC Open Data. Only date, issue category, borough, status requested. No addresses or caller data.",date:new Date().toISOString()};
 }
 if(src.type==="releases"){
 const repo=src.repo==="PowerShell"?"PowerShell/PowerShell":"Genymobile/scrcpy";
 const data=await getJSON("https://api.github.com/repos/"+repo+"/releases?per_page=12");
 if(!Array.isArray(data))throw Error("Unexpected GitHub release format");
 return {rows:data.filter(x=>!x.draft).slice(0,12).map(x=>({label:"Release · "+trim(x.published_at,10),title:trim(x.tag_name||x.name,120),detail:trim(x.name,180),url:x.html_url})),
 provenance:"Public "+repo+" releases. Not a scan of installed software or an Android device.",date:new Date().toISOString()};
 }
 if(src.type==="githubRepos"){
 const data=await getJSON("https://api.github.com/users/mvahora2023/repos?per_page=100&type=public");
 if(!Array.isArray(data))throw Error("Unexpected GitHub response");
 return {rows:data.filter(x=>x.private===false&&x.owner?.login==="mvahora2023").map(x=>({label:"Public repository · "+trim(x.updated_at,10),title:trim(x.name,120),detail:trim((x.description||"No description")+" · "+(x.language||"No primary language"),250),url:x.html_url})),
 provenance:"GitHub public metadata API. No private repository queries.",date:new Date().toISOString()};
 }
 throw Error("Unknown public source type");
}
function draw(data,src){
 items.replaceChildren();
 for(const r of data.rows){
 const card=$("article",undefined,"pd-item"),label=$("span",trim(r.label,100),"pd-label"),heading=$("h3",trim(r.title,180)),detail=$("p",trim(r.detail,400)),link=$("a","Open official source ↗");
 const url=new URL(r.url);if(url.protocol!=="https:")continue;
 link.href=url.href;link.target="_blank";link.rel="noopener noreferrer";
 card.append(label,heading,detail,link);items.append(card);
 }
 status.textContent=data.rows.length+" real public reference entries from "+src.label+". "+data.provenance+" · Source date: "+data.date+".";
 if(!data.rows.length)status.textContent+=" No matching records; none invented.";
}
load.addEventListener("click",async()=>{
 const src=CONF.sources.find(x=>x.id===selector.value);if(!src)return;
 items.replaceChildren();load.disabled=true;status.textContent="Loading "+src.label+"…";
 try{draw(await loadSource(src),src)}catch(err){status.textContent="Public source unavailable ("+trim(err.message||err,120)+"). Synthetic demonstration is unchanged; no fake real data generated."}finally{load.disabled=false;}
});
clear.addEventListener("click",()=>{items.replaceChildren();status.textContent="Public references cleared. Original synthetic demonstration remains above.";});
})();
