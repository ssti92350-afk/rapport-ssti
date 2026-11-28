/* Service worker : rapport SSTI disponible sans connexion */
const CACHE='rapport-ssti-v35';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./qr.html','./qrlib.js','./multi-machines.html','./multi-machines.js','./drive-sync.js','./qi.html','./qi-bundle.1.bin','./qi-bundle.2.bin','./qi-bundle.3.bin','./qi-link.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* Pages et scripts de l'appli : réseau d'abord (la dernière version arrive dès la première ouverture), cache si hors connexion ou réseau trop lent */
const fresh=e=>{const net=fetch(e.request.url,{cache:'no-store',credentials:'same-origin'}).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}return r});
  const slow=new Promise(ok=>setTimeout(ok,4000)).then(()=>caches.match(e.request,{ignoreSearch:true}));
  return Promise.race([net.catch(()=>caches.match(e.request,{ignoreSearch:true})),slow.then(h=>h||net)]).then(r=>r||net)};
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin&&(e.request.mode==='navigate'||/\.(html|js)$/.test(u.pathname)||u.pathname.endsWith('/'))){e.respondWith(fresh(e));return}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}return r}).catch(()=>hit);
    return hit||net}))});
