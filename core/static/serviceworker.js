const cacheName = "app-resultats-cache-v1";
const offlineUrl = "/offline/";

const filesToCache = [
  "/",
  offlineUrl,
  "/static/icons/android-icon-192x192.png",
  "/static/icons/android-icon-144x144.png",
  "/static/js/tailwindcss.js",
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    fetch(e.request).catch(function () {
      return caches.match(e.request).then(response => {
        return response || caches.match(offlineUrl);
      });
    })
  );
});
