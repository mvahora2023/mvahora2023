#!/usr/bin/env node
/**
 * Project Lab Unified release builder.
 * Single direction: 12 approved public repositories -> pinned, isolated browser copies.
 * Non-browser programs are not executed or hosted as privileged services.
 *
 * Run: node unified-app/scripts/sync.mjs
 * Requires git, Node >=22, and outbound access to public GitHub repositories.
 * The only writable destination is unified-app/site/modules and site/release.json.
 */
import { mkdtemp, mkdir, readFile, writeFile, copyFile, rm, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { Script } from 'node:vm';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'site');
const SOURCES = JSON.parse(await readFile(path.join(ROOT, 'manifest/sources.json'), 'utf8'));
const hash = s => createHash('sha256').update(s).digest('hex');
const OWNER = 'mvahora2023';
const DENY = [
  /-----BEGIN (?:OPENSSH |RSA |EC |DSA )?PRIVATE KEY-----/i,
  /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}|AKIA[A-Z0-9]{16})\b/,
];
const MODULE_NAME = /^[a-z0-9][a-z0-9-]{2,90}$/;
const run = (cmd, args, opts={}) => execFileSync(cmd, args, {encoding:'utf8',stdio:['ignore','pipe','pipe'],timeout:180000,...opts}).trim();

function checkDefinitions(cfg) {
  if(cfg.owner !== OWNER || cfg.modules.length !== 12)throw Error('Expected exactly 12 approved public repositories.');
  const ids = new Set();
  for(const m of cfg.modules) {
    if(!MODULE_NAME.test(m.id) || ids.has(m.id))throw Error('Invalid or duplicate module identity.');
    if(m.repo !== OWNER+'/'+m.id)throw Error('Repository owner or module ID mismatch.');
    if(!['main','master'].includes(m.branch))throw Error('Unapproved source branch.');
    if(!['dashboard/index.html','project-lab/index.html'].includes(m.sourcePath))throw Error('Unapproved entry point.');
    if(m.id === OWNER && m.sourcePath!=='project-lab/index.html')throw Error('Portfolio index source mismatch.');
    if(m.id !== OWNER && m.sourcePath!=='dashboard/index.html')throw Error('Unexpected module application source.');
    ids.add(m.id);
  }
}
function verifyWebCopy(html, m) {
  if(!/<!doctype html>/i.test(html)||!/<html\b/i.test(html))throw Error(m.id+': not a complete HTML document');
  if(/<input\b[^>]*\btype\s*=\s*["']?file\b/i.test(html))throw Error(m.id+': local file input prohibited');
  if(/\b(?:navigator\.(?:mediaDevices|geolocation|usb|serial)|window\.showOpenFilePicker|FileSystemAccess)\b/i.test(html))throw Error(m.id+': local device/file API prohibited');
  for(const p of DENY)if(p.test(html))throw Error(m.id+': possible secret in web copy');
  const scripts=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  for(const [,attr,body] of scripts){
    if(/\bsrc\s*=/.test(attr))throw Error(m.id+': external executable script must be separately approved');
    if(/\btype\s*=\s*["']?(?:application\/json|application\/ld\+json)/i.test(attr))continue;
    if(body.trim())new Script(body,{filename:m.id+'/index.html'});
  }
  return hash(html);
}
function redactedError(err){
  return String(err?.message||err).split('\n')[0].replace(/(?:gh[pousr]_|sk-)[A-Za-z0-9_-]+/g,'<REDACTED>').slice(0,220);
}
async function sync() {
  checkDefinitions(SOURCES);
  const temp=await mkdtemp(path.join(tmpdir(),'unified-public-'));
  const entries=[];
  try {
    for(const m of SOURCES.modules) {
      const checkout=path.join(temp,m.id);
      run('git',['clone','--quiet','--depth','1','--single-branch','--branch',m.branch,'https://github.com/'+m.repo+'.git',checkout]);
      const head=run('git',['-C',checkout,'rev-parse','HEAD']);
      const html=await readFile(path.join(checkout,m.sourcePath),'utf8');
      const digest=verifyWebCopy(html,m);
      const output=path.join(SITE,'modules',m.id);
      await mkdir(output,{recursive:true});
      // One deployable HTML per module. Do not copy source secrets, local configs,
      // real logs, binaries or scripts that change OS services.
      await writeFile(path.join(output,'index.html'),html,'utf8');
      const copied=[];
      for(const sourcePath of ['README.md','data/source-manifest.json']){
        try{
          const src=path.join(checkout,sourcePath),buf=await readFile(src,'utf8');
          if(DENY.some(p=>p.test(buf)))throw Error(m.id+': restricted source metadata');
          const dest=path.join(output,'source',sourcePath);
          await mkdir(path.dirname(dest),{recursive:true});
          await writeFile(dest,buf,'utf8');
          copied.push(sourcePath);
        }catch(error){if(error?.code!=='ENOENT')throw error;}
      }
      // This repository includes the unified source itself, so its HEAD changes
      // on every release. Pin by the ORIGINAL portfolio HTML blob instead to avoid
      // a feedback loop and redundant scheduled release commits.
      const revision=m.id===OWNER
        ?'blob:'+run('git',['-C',checkout,'hash-object',m.sourcePath])
        :head;
      entries.push({
        id:m.id,title:m.title,group:m.group,role:m.role,summary:m.summary,
        originalUrl:m.originalUrl,sourcePath:m.sourcePath,branch:m.branch,
        sourceRevision:revision,sha256:digest,copyPath:m.webCopy,
        copiedMetadata:copied,kind:m.kind,
        runtime:m.kind==='portfolio-index'?'public portfolio snapshot':'isolated browser demonstration'
      });
      console.log('[copied]',m.id,revision.slice(0,15));
    }
    const target=path.join(SITE,'release.json');
    let previous;
    try{previous=JSON.parse(await readFile(target,'utf8'));}catch{}
    const comparable=entries.map(e=>[e.id,e.sourceRevision,e.sha256,e.copiedMetadata]);
    const priorComparable=previous?.modules?.map(e=>[e.id,e.sourceRevision,e.sha256,e.copiedMetadata]);
    if(JSON.stringify(comparable)===JSON.stringify(priorComparable)){
      console.log('[unchanged] All twelve upstream browser copies match the current release.');
      return false;
    }
    const release={
      schemaVersion:1,
      application:'Project Lab Unified',
      generatedAt:new Date().toISOString(),
      sourceCount:entries.length,
      dataPolicy:'synthetic and verified public reference only; local device and private account data disabled',
      isolation:'opaque-origin sandboxed iframes; no cross-module writeback',
      updatePolicy:'release is atomic: only after all twelve source copies and tests succeed',
      modules:entries
    };
    await mkdir(path.dirname(target),{recursive:true});
    await writeFile(target,JSON.stringify(release,null,2)+'\n','utf8');
    console.log('[ready] New unified release contains all',entries.length,'module copies.');
    return true;
  } finally {await rm(temp,{force:true,recursive:true});}
}
try{await sync();}
catch(e){console.error('[blocked]',redactedError(e));process.exitCode=1;}
