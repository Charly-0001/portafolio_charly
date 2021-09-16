;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_Portafolo_JCBA',
  urlsToCache = [
    './',
    'https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap',
    'https://kit.fontawesome.com/2c36e9b7b1.js',
    'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
    'https://fonts.googleapis.com/css?family=Raleway:400,700',
    'https://cdn.jsdelivr.net/npm/web-animations-js@2.3.2/web-animations.min.js',
    'https://cdn.jsdelivr.net/npm/muuri@0.9.5/dist/muuri.min.js',
    './style.css',
    './script.js',
    './img/iconos/32.png',
    './img/iconos/32.png'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
