self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("mystic-match-v1").then((cache) => {
      return cache.addAll([
        "/susans-mystic-match/",
        "/susans-mystic-match/index.html",
        "/susans-mystic-match/style.css",
        "/susans-mystic-match/game.js",
        "/susans-mystic-match/engine/core.js",
        "/susans-mystic-match/manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
