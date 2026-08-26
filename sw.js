/* Quran Garden Service Worker — full offline */
const CACHE_NAME = 'quran-garden-off-v89';
const PRECACHE = ['./icons/quran-garden-banner.png', './icons/install.png', './icons/offline.png', './icons/fullscreen.png', './icons/multiplayer-vs.png', "./README.txt", "./audio/bismillah.mp3", "./css/fx-premium.css", "./css/style.css", "./fonts/AlMajeed.woff", "./fonts/AlMajeedQuranic.ttf", "./fonts/MuhammadiQuranic.woff", "./fonts/NooreHuda.ttf", "./fonts/TamilTechSai.ttf", "./fonts/Tamil010.ttf", "./fonts/Tamil009.ttf", "./fonts/Tamil008.ttf", "./fonts/Tamil007.ttf", "./fonts/Tamil006.ttf", "./fonts/Tamil005.ttf", "./fonts/Tamil004.ttf", "./fonts/Tamil003.ttf", "./fonts/Tamil002.ttf", "./fonts/Tamil001.ttf", "./fonts/Vazirmatn.ttf", "./fonts/NotoNaskhArabic.ttf", "./fonts/ScheherazadeNew.ttf", "./fonts/Marhey.ttf", "./fonts/Lateef.ttf", "./fonts/UthmanicHafs.woff2", "./icons/app-icon-192.png", "./icons/app-icon-512.png", "./icons/app-icon.png", "./icons/apple-touch-icon.png", "./icons/back.png", "./icons/badge.png", "./icons/bismillah-splash.png", "./icons/card-back.png", "./icons/coin.png", "./icons/contact.png", "./icons/dhikr.png", "./icons/dua.png", "./icons/fire.png", "./icons/font.png", "./icons/game-blank.png", "./icons/game-memory.png", "./icons/game-order.png", "./icons/game-speed.png", "./icons/game-surah.png", "./icons/game-tf.png", "./icons/games.png", "./icons/garden.png", "./icons/icon-heart.png", "./icons/icon-next.png", "./icons/icon-prev.png", "./icons/icon-stop.png", "./icons/juz-1.png", "./icons/juz-10.png", "./icons/juz-11.png", "./icons/juz-12.png", "./icons/juz-13.png", "./icons/juz-14.png", "./icons/juz-15.png", "./icons/juz-16.png", "./icons/juz-17.png", "./icons/juz-18.png", "./icons/juz-19.png", "./icons/juz-2.png", "./icons/juz-20.png", "./icons/juz-3.png", "./icons/juz-4.png", "./icons/juz-5.png", "./icons/juz-6.png", "./icons/juz-7.png", "./icons/juz-8.png", "./icons/juz-9.png", "./icons/juz.png", "./icons/lang-globe.png", "./icons/menu-btn.png", "./icons/nabi-dua.png", "./icons/next.png", "./icons/pause.png", "./icons/play.png", "./icons/prayer.png", "./icons/prev.png", "./icons/quiz.png", "./icons/hadees.png", "./icons/rank1.png", "./icons/rank2.png", "./icons/rank3.png", "./icons/sound.png", "./icons/surah-72.png", "./icons/surah.png", "./icons/theme.png", "./index.html", "./js/animations.js", "./js/app.js", "./js/fx-premium.js", "./js/nabi-quiz.js", "./js/quran-duel.js", "./manifest.webmanifest", "./sw.js", "./data/bukhari/sections.json", "./data/muslim/sections.json", "./data/abudawud/sections.json", "./data/tirmidhi/sections.json", "./data/nasai/sections.json", "./data/ibnmajah/sections.json"];

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(PRECACHE.map(function(url) {
        return cache.add(url).catch(function(err) {
          console.warn('SW precache skip', url, err);
        });
      }));
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) {
        if (k !== CACHE_NAME) return caches.delete(k);
      }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('message', function(event) {
  if (!event.data) return;
  if (event.data.type === 'CACHE_ALL') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return Promise.all(PRECACHE.map(function(url) {
          return cache.add(url).catch(function(){});
        })).then(function() {
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ ok: true, count: PRECACHE.length });
          }
        });
      })
    );
  }
});

self.addEventListener('fetch', function(event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  // Cross-origin: network only (prayer API, external audio)
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(req).catch(function() {
      return new Response('', { status: 503, statusText: 'Offline' });
    }));
    return;
  }

  // HTML: network first, cache fallback
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').indexOf('text/html') !== -1) {
    event.respondWith(
      fetch(req).then(function(res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function(c) { c.put(req, copy); });
        return res;
      }).catch(function() {
        return caches.match('./index.html').then(function(r) { return r || caches.match(req); });
      })
    );
    return;
  }

  // Same-origin assets: cache first
  event.respondWith(
    caches.match(req).then(function(cached) {
      if (cached) return cached;
      return fetch(req).then(function(res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function(c) { c.put(req, copy); });
        }
        return res;
      }).catch(function() {
        return cached || new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
