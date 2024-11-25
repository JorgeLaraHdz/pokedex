const CACHE_NAME = 'pwa-pokemon-cache-v1';
const APP_SHELL =require('./www/app-shell.json');

// Al instalar el service worker, cacheamos los archivos del App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching App Shell...');
      return cache.addAll(APP_SHELL);
    })
  );
});

// Limpiar cachés antiguas durante la activación
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Interceptar solicitudes y servir desde la caché o red
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Cachea dinámicamente los datos de Pokémon (tab2)
  if (url.includes('pokeapi.co/api/v2/pokemon')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        fetch(event.request)
          .then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => caches.match(event.request))
      )
    );
    return;
  }

  // Cache-first strategy para el App Shell
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          caches.match('/offline.html') // Opcional: Página de respaldo offline
        )
      );
    })
  );
});
