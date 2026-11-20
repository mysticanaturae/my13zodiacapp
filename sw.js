const cacheName="zodiac-cache-v2";
const assets=["./","./index.html","./style.css","./main.js","./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(cacheName).then(c=>c.addAll(assets)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("zodiac-cache-")&&k!==cacheName).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===self.location.origin){const copy=r.clone();caches.open(cacheName).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))));});
self.addEventListener("message",e=>{if(e.data?.type==="SKIP_WAITING")self.skipWaiting();});
