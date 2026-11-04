/**
 * Standalone-to-Unified presentation adapter.
 *
 * Only changes the copied browser HTML during the Unified release build.
 * Original standalone repository HTML remains byte-for-byte unchanged.
 *
 * The child iframe sends *height only* to its parent, using a per-visit
 * nonce. The parent authenticates both event.source and nonce. No project
 * records, storage, account information, or cross-module state are shared.
 */
export const EMBED_MESSAGE_TYPE = 'project-lab-unified:height:v1';
const marker='data-unified-shell-adapter="1"';
const STYLE=String.raw`
/* Applied only inside a sandboxed Unified iframe, never standalone. */
html[data-unified-embed="1"], html[data-unified-embed="1"] body {
  min-height:0 !important; overflow-x:hidden !important;
}
html[data-unified-embed="1"] body {
  overflow-y:hidden !important; margin:0 !important;
}
html[data-unified-embed="1"] .topbar,
html[data-unified-embed="1"] footer.footer,
html[data-unified-embed="1"] .site-header .header-top > div:first-child,
html[data-unified-embed="1"] footer:not(#public-data-modes footer) {
  display:none !important;
}
/* Source-grounded explorer layouts: keep actions, scope note, KPIs and data. */
html[data-unified-embed="1"] main.shell {
  max-width:none !important; width:100% !important;
  margin:0 auto !important; padding:10px 15px 25px !important;
}
html[data-unified-embed="1"] section.hero {
  padding:5px 0 10px !important; margin:0 0 12px !important;
  gap:12px !important;
}
html[data-unified-embed="1"] section.hero .eyebrow,
html[data-unified-embed="1"] section.hero h1,
html[data-unified-embed="1"] section.hero .lead { display:none !important; }
html[data-unified-embed="1"] section.hero .actions {
  margin:0 !important; flex-wrap:wrap !important;
}
html[data-unified-embed="1"] section.hero aside.note {
  padding:12px !important; margin:0 !important; font-size:.84rem !important;
}
html[data-unified-embed="1"] section.metrics { margin:10px 0 16px !important; }
html[data-unified-embed="1"] .layout { margin-top:10px !important; }
html[data-unified-embed="1"] #public-data-modes {
  max-width:none !important; margin:18px 0 8px !important;
}
/* The compliance tracker has its own tabbed navigation; retain those tabs. */
html[data-unified-embed="1"] .site-header {
  position:static !important; margin:0 !important;
}
html[data-unified-embed="1"] .site-header .header-top {
  padding:8px 14px !important; margin:0 !important;
  justify-content:flex-end !important;
}
html[data-unified-embed="1"] .site-header nav#tabs {
  position:static !important; padding:4px 10px !important;
  overflow-x:auto !important; scrollbar-width:thin;
}
html[data-unified-embed="1"] .site-header nav#tabs button {
  white-space:nowrap !important;
}
html[data-unified-embed="1"] body > main {
  max-width:none !important; width:100% !important;
}
html[data-unified-embed="1"] .page { scroll-margin-top:0 !important; }
@media (max-width:700px) {
  html[data-unified-embed="1"] main.shell { padding:8px 10px 20px !important; }
  html[data-unified-embed="1"] section.hero { display:block !important; }
  html[data-unified-embed="1"] section.hero aside.note { margin-top:9px !important; }
}
`;
const BRIDGE=String.raw`
(function () {
  'use strict';
  // A standalone page never activates the Unified presentation adapter.
  if (window.parent === window) return;
  const params = new URLSearchParams(window.location.search);
  if (params.get('unified') !== '1') return;
  const nonce = params.get('session');
  const project = params.get('project');
  if (!nonce || !/^[a-z0-9-]{20,90}$/i.test(nonce) ||
      !project || !/^[a-z0-9-]{3,90}$/.test(project)) return;
  document.documentElement.setAttribute('data-unified-embed', '1');
  let queued = false, lastSent = 0;
  function publishHeight() {
    queued = false;
    const body = document.body;
    if (!body) return;
    const h = Math.ceil(Math.max(
      document.documentElement.scrollHeight,
      body.scrollHeight,
      body.offsetHeight
    ));
    if (!Number.isFinite(h) || h < 250 || h === lastSent) return;
    lastSent = h;
    // Height only: never transmit any dataset, storage key or record values.
    window.parent.postMessage({
      type: 'project-lab-unified:height:v1',
      project: project,
      session: nonce,
      height: h
    }, '*');
  }
  function requestHeight() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(publishHeight);
  }
  function begin() {
    requestHeight();
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(requestHeight);
      observer.observe(document.body);
      observer.observe(document.documentElement);
    }
    window.addEventListener('resize', requestHeight);
    window.addEventListener('load', requestHeight);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(requestHeight, function () {});
    }
    setTimeout(requestHeight, 400);
    setTimeout(requestHeight, 1500);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', begin, {once:true});
  } else begin();
})();
`;
export function adaptUnifiedCopy(source, module) {
  if (module.kind === 'portfolio-index') return source;
  if (typeof source !== 'string' || !source.toLowerCase().includes('</head>') ||
      !source.toLowerCase().includes('</body>')) {
    throw new Error(module.id + ': invalid HTML for Unified presentation');
  }
  if (source.includes(marker) || source.includes(EMBED_MESSAGE_TYPE)) {
    throw new Error(module.id + ': presentation adapter already present in source');
  }
  const style = '<style '+marker+'>\n'+STYLE+'\n</style>';
  const script = '<script '+marker+'>\n'+BRIDGE+'\n</script>';
  return source.replace(/<\/head>/i,style+'\n</head>')
               .replace(/<\/body>/i,script+'\n</body>');
}
