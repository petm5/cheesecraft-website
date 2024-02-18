const cacheName = "cache"
const fallbackUrl = "/offline"
const precachedResources = ["/app.js", "/main.css", "/manifest.json", "/favicon.ico"]

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName)
    return cache.addAll([...precachedResources, fallbackUrl])
  })())
})

self.addEventListener("fetch", event => {
  event.respondWith((async () => {
    const cachedResponse = await caches.match(event.request)
    if (cachedResponse) return cachedResponse

    try {
      let response;

      const preloadResponse = await event.preloadResponse
      if (preloadResponse) response = preloadResponse

      const fetchResponse = await fetch(event.request)
      if (fetchResponse) response = fetchResponse

      if (response) {
        return response
      }
    } catch (error) {
      return await caches.match(fallbackUrl)
    }
  })())
})

self.addEventListener("activate", event => {
  event.waitUntil(self.registration?.navigationPreload.enable());
})
