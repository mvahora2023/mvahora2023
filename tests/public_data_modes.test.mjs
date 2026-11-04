import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const projectDir=new URL('../',import.meta.url);
const path=readFileSync(new URL('../data/source-manifest.json',import.meta.url),'utf8');
const manifest=JSON.parse(path);
const html=readFileSync(new URL(manifest.project==='mvahora2023'?'../project-lab/index.html':'../dashboard/index.html',import.meta.url),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
const source=scripts.find(s=>s.includes('const CONF=')&&s.includes('function draw(data,src)'));
test('all standalone scripts parse',()=>{assert.ok(scripts.length>=2);for(const s of scripts)assert.doesNotThrow(()=>new vm.Script(s));});
test('public source settings are read-only and non-local',()=>{
 assert.equal(manifest.localData.enabled,false);
 assert.equal(manifest.localData.fileImport,false);
 assert.equal(manifest.localData.privateAccounts,false);
 assert.equal(manifest.localData.deviceAccess,false);
 assert.doesNotMatch(html,/<input[^>]*type=["']file["']/i);
 assert.ok(source,'Public sources panel missing');
 const match=source.match(/const CONF=(\{[^\n]+\});\nconst \$=/);
 assert.ok(match,'Source config missing');
 const config=JSON.parse(match[1]);
 assert.deepEqual(config.sources.map(s=>s.id),manifest.public.map(s=>s.id));
 for(const s of config.sources)assert.ok(['nist','kev','nyc','releases','githubRepos'].includes(s.type));
 assert.match(source,/credentials:"omit"/);
 assert.match(source,/raw\.githubusercontent\.com/);
});

test('synthetic portfolio fixtures never replace the real twelve public cards',()=>{
 const fixture=JSON.parse(readFileSync(new URL('../data/fixtures/public_repo_ui_fixture.json',import.meta.url),'utf8'));
 assert.equal(fixture.repositories.length,3);
 assert.ok(fixture.repositories.every(x=>x.name.startsWith('example-')&&x.url.startsWith('https://example.com/')));
 const cards=[...html.matchAll(/class="repo-card/g)];
 assert.equal(cards.length,12);
 for(const item of fixture.repositories)assert.ok(!html.includes(item.name));
});
