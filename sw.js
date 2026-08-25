/* Quran Garden Service Worker — full offline */
const CACHE_NAME = 'quran-garden-off-v82';
const PRECACHE = ['./icons/quran-garden-banner.png', './icons/install.png', './icons/offline.png', './icons/fullscreen.png', './icons/multiplayer-vs.png', "./README.txt", "./audio/bismillah.mp3", "./css/fx-premium.css", "./css/style.css", "./fonts/AlMajeed.woff", "./fonts/AlMajeedQuranic.ttf", "./fonts/MuhammadiQuranic.woff", "./fonts/NooreHuda.ttf", "./fonts/TamilTechSai.ttf", "./fonts/Tamil010.ttf", "./fonts/Tamil009.ttf", "./fonts/Tamil008.ttf", "./fonts/Tamil007.ttf", "./fonts/Tamil006.ttf", "./fonts/Tamil005.ttf", "./fonts/Tamil004.ttf", "./fonts/Tamil003.ttf", "./fonts/Tamil002.ttf", "./fonts/Tamil001.ttf", "./fonts/Vazirmatn.ttf", "./fonts/NotoNaskhArabic.ttf", "./fonts/ScheherazadeNew.ttf", "./fonts/Marhey.ttf", "./fonts/Lateef.ttf", "./fonts/UthmanicHafs.woff2", "./icons/app-icon-192.png", "./icons/app-icon-512.png", "./icons/app-icon.png", "./icons/apple-touch-icon.png", "./icons/back.png", "./icons/badge.png", "./icons/bismillah-splash.png", "./icons/card-back.png", "./icons/coin.png", "./icons/contact.png", "./icons/dhikr.png", "./icons/dua.png", "./icons/fire.png", "./icons/font.png", "./icons/game-blank.png", "./icons/game-memory.png", "./icons/game-order.png", "./icons/game-speed.png", "./icons/game-surah.png", "./icons/game-tf.png", "./icons/games.png", "./icons/garden.png", "./icons/icon-heart.png", "./icons/icon-next.png", "./icons/icon-prev.png", "./icons/icon-stop.png", "./icons/juz-1.png", "./icons/juz-10.png", "./icons/juz-11.png", "./icons/juz-12.png", "./icons/juz-13.png", "./icons/juz-14.png", "./icons/juz-15.png", "./icons/juz-16.png", "./icons/juz-17.png", "./icons/juz-18.png", "./icons/juz-19.png", "./icons/juz-2.png", "./icons/juz-20.png", "./icons/juz-3.png", "./icons/juz-4.png", "./icons/juz-5.png", "./icons/juz-6.png", "./icons/juz-7.png", "./icons/juz-8.png", "./icons/juz-9.png", "./icons/juz.png", "./icons/lang-globe.png", "./icons/menu-btn.png", "./icons/nabi-dua.png", "./icons/next.png", "./icons/pause.png", "./icons/play.png", "./icons/prayer.png", "./icons/prev.png", "./icons/quiz.png", "./icons/hadees.png", "./icons/rank1.png", "./icons/rank2.png", "./icons/rank3.png", "./icons/sound.png", "./icons/surah-72.png", "./icons/surah.png", "./icons/theme.png", "./index.html", "./js/animations.js", "./js/app.js", "./js/fx-premium.js", "./js/nabi-quiz.js", "./js/quran-duel.js", "./manifest.webmanifest", "./sw.js", "./data/bukhari/s1.json.gz", "./data/bukhari/s10.json.gz", "./data/bukhari/s11.json.gz", "./data/bukhari/s12.json.gz", "./data/bukhari/s13.json.gz", "./data/bukhari/s14.json.gz", "./data/bukhari/s15.json.gz", "./data/bukhari/s16.json.gz", "./data/bukhari/s17.json.gz", "./data/bukhari/s18.json.gz", "./data/bukhari/s19.json.gz", "./data/bukhari/s2.json.gz", "./data/bukhari/s20.json.gz", "./data/bukhari/s21.json.gz", "./data/bukhari/s22.json.gz", "./data/bukhari/s23.json.gz", "./data/bukhari/s24.json.gz", "./data/bukhari/s25.json.gz", "./data/bukhari/s26.json.gz", "./data/bukhari/s27.json.gz", "./data/bukhari/s28.json.gz", "./data/bukhari/s29.json.gz", "./data/bukhari/s3.json.gz", "./data/bukhari/s30.json.gz", "./data/bukhari/s31.json.gz", "./data/bukhari/s32.json.gz", "./data/bukhari/s33.json.gz", "./data/bukhari/s34.json.gz", "./data/bukhari/s35.json.gz", "./data/bukhari/s36.json.gz", "./data/bukhari/s37.json.gz", "./data/bukhari/s38.json.gz", "./data/bukhari/s39.json.gz", "./data/bukhari/s4.json.gz", "./data/bukhari/s40.json.gz", "./data/bukhari/s41.json.gz", "./data/bukhari/s42.json.gz", "./data/bukhari/s43.json.gz", "./data/bukhari/s44.json.gz", "./data/bukhari/s45.json.gz", "./data/bukhari/s46.json.gz", "./data/bukhari/s47.json.gz", "./data/bukhari/s48.json.gz", "./data/bukhari/s49.json.gz", "./data/bukhari/s5.json.gz", "./data/bukhari/s50.json.gz", "./data/bukhari/s51.json.gz", "./data/bukhari/s52.json.gz", "./data/bukhari/s53.json.gz", "./data/bukhari/s54.json.gz", "./data/bukhari/s55.json.gz", "./data/bukhari/s56.json.gz", "./data/bukhari/s57.json.gz", "./data/bukhari/s58.json.gz", "./data/bukhari/s59.json.gz", "./data/bukhari/s6.json.gz", "./data/bukhari/s60.json.gz", "./data/bukhari/s61.json.gz", "./data/bukhari/s62.json.gz", "./data/bukhari/s63.json.gz", "./data/bukhari/s64.json.gz", "./data/bukhari/s65.json.gz", "./data/bukhari/s66.json.gz", "./data/bukhari/s67.json.gz", "./data/bukhari/s68.json.gz", "./data/bukhari/s69.json.gz", "./data/bukhari/s7.json.gz", "./data/bukhari/s70.json.gz", "./data/bukhari/s71.json.gz", "./data/bukhari/s72.json.gz", "./data/bukhari/s73.json.gz", "./data/bukhari/s74.json.gz", "./data/bukhari/s75.json.gz", "./data/bukhari/s76.json.gz", "./data/bukhari/s77.json.gz", "./data/bukhari/s78.json.gz", "./data/bukhari/s79.json.gz", "./data/bukhari/s8.json.gz", "./data/bukhari/s80.json.gz", "./data/bukhari/s81.json.gz", "./data/bukhari/s82.json.gz", "./data/bukhari/s83.json.gz", "./data/bukhari/s84.json.gz", "./data/bukhari/s85.json.gz", "./data/bukhari/s86.json.gz", "./data/bukhari/s87.json.gz", "./data/bukhari/s88.json.gz", "./data/bukhari/s89.json.gz", "./data/bukhari/s9.json.gz", "./data/bukhari/s90.json.gz", "./data/bukhari/s91.json.gz", "./data/bukhari/s92.json.gz", "./data/bukhari/s93.json.gz", "./data/bukhari/s94.json.gz", "./data/bukhari/s95.json.gz", "./data/bukhari/s96.json.gz", "./data/bukhari/s97.json.gz", "./data/bukhari/sections.json", "./data/bukhari/sections.json.gz", "./data/muslim/s0.json.gz", "./data/muslim/s1.json.gz", "./data/muslim/s10.json.gz", "./data/muslim/s11.json.gz", "./data/muslim/s12.json.gz", "./data/muslim/s13.json.gz", "./data/muslim/s14.json.gz", "./data/muslim/s15.json.gz", "./data/muslim/s16.json.gz", "./data/muslim/s17.json.gz", "./data/muslim/s18.json.gz", "./data/muslim/s19.json.gz", "./data/muslim/s2.json.gz", "./data/muslim/s20.json.gz", "./data/muslim/s21.json.gz", "./data/muslim/s22.json.gz", "./data/muslim/s23.json.gz", "./data/muslim/s24.json.gz", "./data/muslim/s25.json.gz", "./data/muslim/s26.json.gz", "./data/muslim/s27.json.gz", "./data/muslim/s28.json.gz", "./data/muslim/s29.json.gz", "./data/muslim/s3.json.gz", "./data/muslim/s30.json.gz", "./data/muslim/s31.json.gz", "./data/muslim/s32.json.gz", "./data/muslim/s33.json.gz", "./data/muslim/s34.json.gz", "./data/muslim/s35.json.gz", "./data/muslim/s36.json.gz", "./data/muslim/s37.json.gz", "./data/muslim/s38.json.gz", "./data/muslim/s39.json.gz", "./data/muslim/s4.json.gz", "./data/muslim/s40.json.gz", "./data/muslim/s41.json.gz", "./data/muslim/s42.json.gz", "./data/muslim/s43.json.gz", "./data/muslim/s44.json.gz", "./data/muslim/s45.json.gz", "./data/muslim/s46.json.gz", "./data/muslim/s47.json.gz", "./data/muslim/s48.json.gz", "./data/muslim/s49.json.gz", "./data/muslim/s5.json.gz", "./data/muslim/s50.json.gz", "./data/muslim/s51.json.gz", "./data/muslim/s52.json.gz", "./data/muslim/s53.json.gz", "./data/muslim/s54.json.gz", "./data/muslim/s55.json.gz", "./data/muslim/s56.json.gz", "./data/muslim/s6.json.gz", "./data/muslim/s7.json.gz", "./data/muslim/s8.json.gz", "./data/muslim/s9.json.gz", "./data/muslim/sections.json", "./data/abudawud/sections.json", "./data/tirmidhi/sections.json", "./data/nasai/sections.json", "./data/ibnmajah/sections.json", "./data/ibnmajah/s0.json.gz", "./data/ibnmajah/s1.json.gz", "./data/ibnmajah/s2.json.gz", "./data/ibnmajah/s3.json.gz", "./data/ibnmajah/s4.json.gz", "./data/ibnmajah/s5.json.gz", "./data/ibnmajah/s6.json.gz", "./data/ibnmajah/s7.json.gz", "./data/ibnmajah/s8.json.gz", "./data/ibnmajah/s9.json.gz", "./data/ibnmajah/s10.json.gz", "./data/ibnmajah/s11.json.gz", "./data/ibnmajah/s12.json.gz", "./data/ibnmajah/s13.json.gz", "./data/ibnmajah/s14.json.gz", "./data/ibnmajah/s15.json.gz", "./data/ibnmajah/s16.json.gz", "./data/ibnmajah/s17.json.gz", "./data/ibnmajah/s18.json.gz", "./data/ibnmajah/s19.json.gz", "./data/ibnmajah/s20.json.gz", "./data/ibnmajah/s21.json.gz", "./data/ibnmajah/s22.json.gz", "./data/ibnmajah/s23.json.gz", "./data/ibnmajah/s24.json.gz", "./data/ibnmajah/s25.json.gz", "./data/ibnmajah/s26.json.gz", "./data/ibnmajah/s27.json.gz", "./data/ibnmajah/s28.json.gz", "./data/ibnmajah/s29.json.gz", "./data/ibnmajah/s30.json.gz", "./data/ibnmajah/s31.json.gz", "./data/ibnmajah/s32.json.gz", "./data/ibnmajah/s33.json.gz", "./data/ibnmajah/s34.json.gz", "./data/ibnmajah/s35.json.gz", "./data/ibnmajah/s36.json.gz", "./data/ibnmajah/s37.json.gz", "./data/nasai/s1.json.gz", "./data/nasai/s2.json.gz", "./data/nasai/s3.json.gz", "./data/nasai/s4.json.gz", "./data/nasai/s5.json.gz", "./data/nasai/s6.json.gz", "./data/nasai/s7.json.gz", "./data/nasai/s8.json.gz", "./data/nasai/s9.json.gz", "./data/nasai/s10.json.gz", "./data/nasai/s11.json.gz", "./data/nasai/s12.json.gz", "./data/nasai/s13.json.gz", "./data/nasai/s14.json.gz", "./data/nasai/s15.json.gz", "./data/nasai/s16.json.gz", "./data/nasai/s17.json.gz", "./data/nasai/s18.json.gz", "./data/nasai/s19.json.gz", "./data/nasai/s20.json.gz", "./data/nasai/s21.json.gz", "./data/nasai/s22.json.gz", "./data/nasai/s23.json.gz", "./data/nasai/s24.json.gz", "./data/nasai/s25.json.gz", "./data/nasai/s26.json.gz", "./data/nasai/s27.json.gz", "./data/nasai/s28.json.gz", "./data/nasai/s29.json.gz", "./data/nasai/s30.json.gz", "./data/nasai/s31.json.gz", "./data/nasai/s32.json.gz", "./data/nasai/s33.json.gz", "./data/nasai/s34.json.gz", "./data/nasai/s35.json.gz", "./data/nasai/s36.json.gz", "./data/nasai/s37.json.gz", "./data/nasai/s38.json.gz", "./data/nasai/s39.json.gz", "./data/nasai/s40.json.gz", "./data/nasai/s41.json.gz", "./data/nasai/s42.json.gz", "./data/nasai/s43.json.gz", "./data/nasai/s44.json.gz", "./data/nasai/s45.json.gz", "./data/nasai/s46.json.gz", "./data/nasai/s47.json.gz", "./data/nasai/s48.json.gz", "./data/nasai/s49.json.gz", "./data/nasai/s50.json.gz", "./data/nasai/s51.json.gz", "./data/tirmidhi/s1.json.gz", "./data/tirmidhi/s2.json.gz", "./data/tirmidhi/s3.json.gz", "./data/tirmidhi/s4.json.gz", "./data/tirmidhi/s5.json.gz", "./data/tirmidhi/s6.json.gz", "./data/tirmidhi/s7.json.gz", "./data/tirmidhi/s8.json.gz", "./data/tirmidhi/s9.json.gz", "./data/tirmidhi/s10.json.gz", "./data/tirmidhi/s11.json.gz", "./data/tirmidhi/s12.json.gz", "./data/tirmidhi/s13.json.gz", "./data/tirmidhi/s14.json.gz", "./data/tirmidhi/s15.json.gz", "./data/tirmidhi/s16.json.gz", "./data/tirmidhi/s17.json.gz", "./data/tirmidhi/s18.json.gz", "./data/tirmidhi/s19.json.gz", "./data/tirmidhi/s20.json.gz", "./data/tirmidhi/s21.json.gz", "./data/tirmidhi/s22.json.gz", "./data/tirmidhi/s23.json.gz", "./data/tirmidhi/s24.json.gz", "./data/tirmidhi/s25.json.gz", "./data/tirmidhi/s26.json.gz", "./data/tirmidhi/s27.json.gz", "./data/tirmidhi/s28.json.gz", "./data/tirmidhi/s29.json.gz", "./data/tirmidhi/s30.json.gz", "./data/tirmidhi/s31.json.gz", "./data/tirmidhi/s32.json.gz", "./data/tirmidhi/s33.json.gz", "./data/tirmidhi/s34.json.gz", "./data/tirmidhi/s35.json.gz", "./data/tirmidhi/s36.json.gz", "./data/tirmidhi/s37.json.gz", "./data/tirmidhi/s38.json.gz", "./data/tirmidhi/s39.json.gz", "./data/tirmidhi/s40.json.gz", "./data/tirmidhi/s41.json.gz", "./data/tirmidhi/s42.json.gz", "./data/tirmidhi/s43.json.gz", "./data/tirmidhi/s44.json.gz", "./data/tirmidhi/s45.json.gz", "./data/tirmidhi/s46.json.gz", "./data/tirmidhi/s47.json.gz", "./data/tirmidhi/s48.json.gz", "./data/tirmidhi/s49.json.gz", "./data/abudawud/s1.json.gz", "./data/abudawud/s2.json.gz", "./data/abudawud/s3.json.gz", "./data/abudawud/s4.json.gz", "./data/abudawud/s5.json.gz", "./data/abudawud/s6.json.gz", "./data/abudawud/s7.json.gz", "./data/abudawud/s8.json.gz", "./data/abudawud/s9.json.gz", "./data/abudawud/s10.json.gz", "./data/abudawud/s11.json.gz", "./data/abudawud/s12.json.gz", "./data/abudawud/s13.json.gz", "./data/abudawud/s14.json.gz", "./data/abudawud/s15.json.gz", "./data/abudawud/s16.json.gz", "./data/abudawud/s17.json.gz", "./data/abudawud/s18.json.gz", "./data/abudawud/s19.json.gz", "./data/abudawud/s20.json.gz", "./data/abudawud/s21.json.gz", "./data/abudawud/s22.json.gz", "./data/abudawud/s23.json.gz", "./data/abudawud/s24.json.gz", "./data/abudawud/s25.json.gz", "./data/abudawud/s26.json.gz", "./data/abudawud/s27.json.gz", "./data/abudawud/s28.json.gz", "./data/abudawud/s29.json.gz", "./data/abudawud/s30.json.gz", "./data/abudawud/s31.json.gz", "./data/abudawud/s32.json.gz", "./data/abudawud/s33.json.gz", "./data/abudawud/s34.json.gz", "./data/abudawud/s35.json.gz", "./data/abudawud/s36.json.gz", "./data/abudawud/s37.json.gz", "./data/abudawud/s38.json.gz", "./data/abudawud/s39.json.gz", "./data/abudawud/s40.json.gz", "./data/abudawud/s41.json.gz", "./data/abudawud/s42.json.gz", "./data/abudawud/s43.json.gz", "./data/muslim/override-1-92.json.gz"];

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
