import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {Script} from 'node:vm';
import {adaptUnifiedCopy,EMBED_MESSAGE_TYPE} from '../scripts/embedded-shell.mjs';
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
 assert.match(app,/event\.source!==activeFrame\.contentWindow/);
 assert.match(app,/event\.origin!=='null'/);
 assert.match(app,/msg\.session!==frameSession/);
 assert.match(app,/msg\.project!==activeId/);
 assert.doesNotMatch(app,/allow-same-origin/);
 assert.match(app,/crypto\.subtle\.digest/);
 assert.doesNotThrow(()=>new Script(app));
});

test('embedded adapter makes a separate compact copy while leaving originals unchanged',()=>{
 const original='<!doctype html><html><head><title>Example</title></head><body><header class="topbar">Original</header><main>Content</main></body></html>';
 const m={id:'mini-soc-lab',kind:'static-web-copy'};
 const compact=adaptUnifiedCopy(original,m);
 assert.notEqual(compact,original);
 assert.doesNotMatch(original,/data-unified-shell-adapter/);
 assert.match(compact,/data-unified-shell-adapter="1"/);
 assert.match(compact,/\.topbar/);
 assert.match(compact,/document\.documentElement\.setAttribute\('data-unified-embed', '1'\)/);
 assert.match(compact,/window\.parent === window/);
 assert.match(compact,/ResizeObserver/);
 assert.match(compact,/postMessage/);
 assert.match(compact,/project-lab-unified:height:v1/);
 const injected=[...compact.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
 assert.equal(injected.length,1);
 assert.doesNotThrow(()=>new Script(injected[0][1]));
 assert.equal(adaptUnifiedCopy(original,{id:'mvahora2023',kind:'portfolio-index'}),original);
 assert.equal(EMBED_MESSAGE_TYPE,'project-lab-unified:height:v1');
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
