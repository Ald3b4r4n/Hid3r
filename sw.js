const CACHE_NAME = 'hid3r-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/imagens/richter.png',
  '/imagens/dracula.png',
  '/imagens/dracula_laugh.png',
  '/imagens/portoes_fechados.jpg',
  '/imagens/portoes_abertos.jpg',
  '/imagens/background.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME)
         .map(key => caches.delete(key))
    ))
  );
});

