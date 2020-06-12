/* eslint-disable no-restricted-globals */

const cachName = "mngr-v1";
const filesToCach = ["/"];

self.addEventListener("install", (event) => {
  // CODELAB: Precache static resources here.
  event.waitUntil(
    caches.open(cachName).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(filesToCach);
    })
  );
});

self.addEventListener("activate", (event) => {
  // CODELAB: Remove previous cached data from disk.
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== cachName) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      console.log("[Service Worker] Fetching resource: " + e.request.url);
      return (
        r ||
        fetch(e.request).then(function (response) {
          return caches.open(cachName).then(function (cache) {
            console.log(
              "[Service Worker] Caching new resource: " + e.request.url
            );
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
