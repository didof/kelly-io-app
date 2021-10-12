workbox.setConfig({
  debug: true,
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
  new workbox.strategies.CacheFirst({
    cacheName: "googleapis",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
    method: "GET",
    cacheableResponse: { statuses: [0, 200] },
  })
);
