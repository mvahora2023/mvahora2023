import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {Script} from 'node:vm';
const dir=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,dir),'utf8');
const sources=JSON.parse(read('manifest/sources.json'));
const sourceIds=new Set(sources.modules.map(x=>x.id));
test('twelve independent public repository identities, with one source each',()=>{
 assert.equal(sources.owner,'mvahora2023');
 assert.equal(sources.modules.length,12);
 assert.equal(sourceIds.size,12);
 for(const m of sources.modules){
  assert.equal(m.repo,'mvahora2023/'+m.id);
  assert.match(m.id,/^[a-z0-9-]+$/);
  assert.equal(m.originalUrl,'https://github.com/mvahora2023/'+m.id);
  assert.ok(['master','main'].includes(m.branch));
  assert.equal(m.webCopy,'modules/'+m.id+'/index.html');
 }
});
test('five categories with four flagships and one profile index',()=>{
 const areas=[...new Set(sources.modules.map(x=>x.group))].sort();
 assert.deepEqual(areas,['Cybersecurity & OT','Data & Analytics','Governance & Resilience','IT Operations & Automation','Portfolio'].sort());
 assert.equal(sources.modules.filter(x=>x.role.startsWith('Flagship')).length,4);
 assert.equal(sources.modules.filter(x=>x.kind==='portfolio-index').length,1);
});
test('only eleven technical modules appear in the app, with the portfolio source tracked internally',()=>{
 const home=read('site/index.html'),app=read('site/assets/app.js');
 assert.equal(sources.modules.filter(x=>x.kind!=='portfolio-index').length,11);
 assert.equal(sources.modules.filter(x=>x.kind==='portfolio-index').length,1);
 assert.doesNotMatch(home,/data-view="Portfolio"/);
 assert.match(app,/isVisibleModule\s*=/);
 assert.match(app,/Source-only · excluded from project gallery/);
 assert.match(app,/11 modules · 12 sources/);
 assert.match(home,/Four technical areas/);
});
test('website has no parent-scope module script execution or local-data inputs',()=>{
 const home=read('site/index.html'),app=read('site/assets/app.js');
 assert.match(home,/frame-src 'self'/);
 assert.doesNotMatch(home,/<input[^>]+type=["']file/i);
 assert.match(app,/allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox/);
 assert.doesNotMatch(app,/allow-same-origin/);
 assert.doesNotMatch(app,/window\.postMessage|addEventListener\(['"]message/);
 assert.match(app,/crypto\.subtle\.digest/);
 assert.doesNotThrow(()=>new Script(app));
});
const releasePath=new URL('site/release.json',dir);
if(existsSync(releasePath)){
 const release=JSON.parse(read('site/release.json'));
 test('released modules match the source manifest and checksums',()=>{
  assert.equal(release.schemaVersion,1);
  assert.equal(release.modules.length,12);
  assert.equal(release.sourceCount,12);
  for(const m of release.modules){
   assert.ok(sourceIds.has(m.id));
   assert.equal(m.originalUrl,'https://github.com/mvahora2023/'+m.id);
   const data=read('site/'+m.copyPath);
   const digest=createHash('sha256').update(data).digest('hex');
   assert.equal(digest,m.sha256,'snapshot checksum mismatch for '+m.id);
   assert.doesNotMatch(data,/<input[^>]*type=["']?file/i,'local file import in '+m.id);
  }
 });
}
