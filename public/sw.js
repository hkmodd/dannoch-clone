var BASE_PATH = '/dannoch-clone';
var CACHE_NAME = 'danno-ch-v2';
var STATIC_ASSETS = [
    BASE_PATH + '/',
    BASE_PATH + '/index.html',
];

// Install — cache core shell
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) { return cache.addAll(STATIC_ASSETS); })
    );
    self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
        })
    );
    self.clients.claim();
});

// Fetch — network-first for navigation, cache-first for static assets
self.addEventListener('fetch', function (event) {
    var url = new URL(event.request.url);

    // Skip external requests
    if (url.origin !== location.origin) return;

    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Navigation requests: network-first (SPA routing)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(function (response) {
                    var clone = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, clone); });
                    return response;
                })
                .catch(function () { return caches.match(BASE_PATH + '/index.html').then(function (r) { return r || new Response('Offline'); }); })
        );
        return;
    }

    // Static assets: stale-while-revalidate
    if (url.pathname.match(/\.(js|css|woff2?|png|svg|jpg|webp|ico)$/)) {
        event.respondWith(
            caches.match(event.request).then(function (cached) {
                var fetchPromise = fetch(event.request).then(function (response) {
                    if (response.ok) {
                        var clone = response.clone();
                        caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, clone); });
                    }
                    return response;
                });
                return cached || fetchPromise;
            })
        );
        return;
    }
});
