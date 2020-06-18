/* eslint-disable no-restricted-globals */
const CACHE = "v1";

self.addEventListener("install", (event) => {
  event.waitUntil(precache());
});

self.addEventListener("activate", (event) => {
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  if (event.request.method === "POST") return;

  event.respondWith(
    fromNetwork(event.request, 400).catch(function () {
      return fromCache(event.request);
    })
  );

  event.waitUntil(update(event.request));
});

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([""]);
  });
}

function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    let timeoutId = setTimeout(reject, timeout);

    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject("no-match");
    });
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      if (!/^https?:$/i.test(new URL(request.url).protocol)) return;
      return cache.put(request, response);
    });
  });
}
