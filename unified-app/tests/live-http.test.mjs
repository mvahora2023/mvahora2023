import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const BASE=(process.env.UNIFIED_URL||'https://project-lab-unified.vercel.app').replace(/\/+$/,'');
const get=async pathname=>{
 const response=await fetch(BASE+pathname,{redirect:'follow',headers:{Accept:'text/html,application/json'}});
 assert.equal(response.status,200,pathname+' returned HTTP '+response.status);
 return response;
};
test('production homepage is public and loads its own application assets',async()=>{
 const text=await (await get('/')).text();
 assert.match(text,/Project Lab Unified/i);
 assert.match(text,/src="\/assets\/app\.js"/);
 const js=await (await get('/assets/app.js')).text();
 assert.match(js,/crypto\.subtle\.digest/);
 assert.doesNotMatch(js,/allow-same-origin/);
});
test('all twelve production module bytes match the versioned release manifest',async()=>{
 const manifest=await (await get('/release.json')).json();
 assert.equal(manifest.schemaVersion,1);
 assert.equal(manifest.sourceCount,12);
 assert.equal(manifest.modules.length,12);
 assert.equal(new Set(manifest.modules.map(m=>m.id)).size,12);
 for(const m of manifest.modules){
  const html=Buffer.from(await (await get('/'+m.copyPath)).arrayBuffer());
  const digest=createHash('sha256').update(html).digest('hex');
  assert.equal(digest,m.sha256,m.id+' was modified after release packaging');
  assert.match(html.toString('utf8'),/<!doctype html>/i);
  assert.doesNotMatch(html.toString('utf8'),/<input[^>]*type=['"]?file/i);
 }
},{timeout:90000});
