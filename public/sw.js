const VERSION = "hyd-pwa-v2";
const APP_SHELL_CACHE = `${VERSION}:app-shell`;
const PAGE_CACHE = `${VERSION}:pages`;
const API_CACHE = `${VERSION}:api`;
const ASSET_CACHE = `${VERSION}:assets`;
const RUNTIME_CACHE = `${VERSION}:runtime`;

const PRECACHE_URLS = [
  "/",
  "/hyderabad",
  "/ads",
  "/post-ad",
  "/my-ads",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png"
];

const CURRENT_CACHES = new Set([
  APP_SHELL_CACHE,
  PAGE_CACHE,
  API_CACHE,
  ASSET_CACHE,
  RUNTIME_CACHE
]);

function isCacheable(response) {
  return response && (response.status === 200 || response.status === 0);
}

function isStaticAsset(pathname) {
  return /\.(?:avif|css|gif|ico|jpg|jpeg|js|json|png|svg|webp|woff2?)$/i.test(pathname);
}

async function precacheAppShell() {
  const cache = await caches.open(APP_SHELL_CACHE);
  await Promise.allSettled(
    PRECACHE_URLS.map((url) => cache.add(new Request(url, { cache: "reload" })))
  );
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreVary: true });

  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (isCacheable(response)) {
    await cache.put(request, response.clone());
  }

  return response;
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (isCacheable(response)) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request, { ignoreVary: true });
    if (cached) {
      return cached;
    }

    const shell = await caches.match("/");
    if (shell) {
      return shell;
    }

    return new Response("<!doctype html><title>Offline</title><h1>Offline</h1>", {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
}

async function apiNetworkFirst(request) {
  const cache = await caches.open(API_CACHE);

  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request, { ignoreVary: true });
    if (cached) {
      return cached;
    }

    return new Response(
      JSON.stringify({ ads: [], storage: "offline-cache", offline: true }),
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreVary: true });
  const network = fetch(request)
    .then((response) => {
      if (isCacheable(response)) {
        void cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || network;
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheAppShell().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.map((key) => (CURRENT_CACHES.has(key) ? undefined : caches.delete(key))))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, PAGE_CACHE));
    return;
  }

  if (isSameOrigin && url.pathname.startsWith("/api/")) {
    event.respondWith(apiNetworkFirst(request));
    return;
  }

  if (
    isSameOrigin &&
    (url.pathname.startsWith("/_next/static/") ||
      url.pathname.startsWith("/icons/") ||
      isStaticAsset(url.pathname))
  ) {
    event.respondWith(cacheFirst(request, ASSET_CACHE));
    return;
  }

  if (["font", "image", "script", "style"].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
  }
});
