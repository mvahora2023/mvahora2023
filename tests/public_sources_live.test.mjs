import test from 'node:test';
import assert from 'node:assert/strict';
const sources=[
 ["CISA KEV JSON","https://raw.githubusercontent.com/cisagov/kev-data/develop/known_exploited_vulnerabilities.json",data=>Array.isArray(data.vulnerabilities)&&data.vulnerabilities.length>100&&typeof data.vulnerabilities[0].cveID==='string'],
 ["NYC 311 limited fields","https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=created_date,complaint_type,borough,status&$order=created_date%20DESC&$limit=3",data=>Array.isArray(data)&&data.length>0&&data.every(r=>!('incident_address' in r)&&!('street_name' in r)&&!('latitude' in r))],
 ["PowerShell official public releases","https://api.github.com/repos/PowerShell/PowerShell/releases?per_page=1",data=>Array.isArray(data)&&data.some(r=>typeof r.tag_name==='string')],
 ["GitHub public profile repos","https://api.github.com/users/mvahora2023/repos?per_page=100&type=public",data=>Array.isArray(data)&&data.filter(r=>r.private===false&&r.owner?.login==='mvahora2023').length>=12]
];
for(const [label,url,validate] of sources){
 test(label+' has valid public schema',async()=>{
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),22000);
  try{
   const response=await fetch(url,{signal:controller.signal,headers:{Accept:'application/json'}});
   assert.ok(response.ok, label+' HTTP '+response.status);
   const data=await response.json();
   assert.ok(validate(data),label+' changed schema or returned unexpected data');
  }finally{clearTimeout(timer);}
 },{timeout:25000});
}
