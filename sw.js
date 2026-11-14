const CACHE='espartano-v240-20261114';
const ASSETS=['./','./index.html','./app.js?v=240','./manifest.webmanifest?v=240','./icon.svg?v=240','./upgrade.js?v=240','./nutrition.js?v=240','./nutrition-out.js?v=240','./espartano24.js?v=240','./version.js?v=240'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',event=>event.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==location.origin)return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response}).catch(()=>caches.match(event.request)))});
