/* ============================================================
   FX PREMIUM — global 3D + animation boost (behavior layer)
   Purely additive: wraps existing functions, never edits them.
   ============================================================ */
(function(){
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Splash sparkle dust ---------- */
  function addSplashStars(){
    var splash = document.getElementById('appSplash');
    if(!splash || reduceMotion) return;
    for(var i=0;i<18;i++){
      var s = document.createElement('span');
      s.className = 'fxp-star';
      s.style.left = (Math.random()*100) + '%';
      s.style.top = (20 + Math.random()*60) + '%';
      s.style.animationDelay = (Math.random()*2.4) + 's';
      splash.appendChild(s);
    }
  }

  /* ---------- 2. Ripple + press-down on every tappable control ---------- */
  function nearestTappable(el){
    return el.closest('button, .icon-btn, .home-tile, .opt-btn, .mode-btn, .back-btn, .s3d-card, .level-tile, .badge-card, .theme-swatch, [role="button"]');
  }
  function spawnRipple(target, x, y){
    if(reduceMotion) return;
    var cs = getComputedStyle(target);
    if(cs.position === 'static') target.style.position = 'relative';
    var layer = target.querySelector(':scope > .fxp-ripple-layer');
    if(!layer){
      layer = document.createElement('span');
      layer.className = 'fxp-ripple-layer';
      target.appendChild(layer);
    }
    var r = target.getBoundingClientRect();
    var size = Math.max(r.width, r.height) * 1.2;
    var ripple = document.createElement('span');
    ripple.className = 'fxp-ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (x - r.left - size/2) + 'px';
    ripple.style.top = (y - r.top - size/2) + 'px';
    layer.appendChild(ripple);
    setTimeout(function(){ try{ ripple.remove(); }catch(e){} }, 650);
  }
  document.addEventListener('pointerdown', function(e){
    var t = nearestTappable(e.target);
    if(!t) return;
    t.classList.add('fxp-press');
    spawnRipple(t, e.clientX, e.clientY);
  }, true);
  ['pointerup','pointerleave','pointercancel'].forEach(function(ev){
    document.addEventListener(ev, function(e){
      var t = nearestTappable(e.target);
      if(t) t.classList.remove('fxp-press');
      document.querySelectorAll('.fxp-press').forEach(function(el){ el.classList.remove('fxp-press'); });
    }, true);
  });

  /* ---------- 3. Home-tile pointer-tracked 3D tilt ---------- */
  function wireTilt(){
    if(reduceMotion) return;
    document.querySelectorAll('.home-tile').forEach(function(tile){
      if(tile._fxpTilt) return;
      tile._fxpTilt = true;
      tile.addEventListener('pointermove', function(e){
        var r = tile.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tile.style.setProperty('--fxp-rx', (px*10).toFixed(2));
        tile.style.setProperty('--fxp-ry', (py*10).toFixed(2));
      });
      tile.addEventListener('pointerleave', function(){
        tile.style.setProperty('--fxp-rx', 0);
        tile.style.setProperty('--fxp-ry', 0);
      });
    });
  }

  /* ---------- 4. Screen transition hook (re-trigger animation class) ---------- */
  function retriggerScreenAnim(id){
    var scr = document.getElementById(id);
    if(!scr) return;
    scr.classList.remove('fxp-in');
    void scr.offsetWidth;
    scr.classList.add('fxp-in');
    wireTilt();
  }
  function hookSwitchScreen(){
    if(typeof window.switchScreen !== 'function' || window.switchScreen._fxpHooked) return;
    var orig = window.switchScreen;
    window.switchScreen = function(id){
      var r = orig.apply(this, arguments);
      retriggerScreenAnim(id);
      return r;
    };
    window.switchScreen._fxpHooked = true;
  }

  /* ---------- 5. Confetti burst (badges, level-up, correct answers) ---------- */
  function confettiBurst(x, y, count){
    if(reduceMotion) return;
    var colors = ['#ffb703','#ffe066','#00d4ff','#7ef0ff','#12e07a','#ff4d6d'];
    count = count || 22;
    for(var i=0;i<count;i++){
      var c = document.createElement('div');
      c.className = 'fxp-confetti';
      var dx = (Math.random()*2-1) * 160;
      var dy = 260 + Math.random()*220;
      c.style.left = x + 'px';
      c.style.top = y + 'px';
      c.style.background = colors[i % colors.length];
      c.style.setProperty('--fxp-dx', dx + 'px');
      c.style.setProperty('--fxp-dy', dy + 'px');
      c.style.animationDelay = (Math.random()*0.15) + 's';
      document.body.appendChild(c);
      setTimeout(function(el){ try{ el.remove(); }catch(e){} }, 1700, c);
    }
  }
  window.FXPremium = { confettiBurst: confettiBurst };

  // Fire confetti on badge unlock banners and correct answers
  document.addEventListener('click', function(e){
    var correct = e.target.closest('.opt-btn.correct');
    if(correct){
      var r = correct.getBoundingClientRect();
      confettiBurst(r.left + r.width/2, r.top, 14);
    }
  }, true);

  // Watch for the level-complete toast (green gradient) appearing directly on body, burst confetti
  var bannerObserver = new MutationObserver(function(mutations){
    mutations.forEach(function(m){
      m.addedNodes && m.addedNodes.forEach(function(node){
        if(node.nodeType !== 1 || node.parentNode !== document.body) return;
        var style = node.getAttribute && node.getAttribute('style');
        if(style && style.indexOf('10b981') !== -1){
          confettiBurst(window.innerWidth/2, window.innerHeight - 60, 26);
        }
      });
    });
  });
  bannerObserver.observe(document.body, { childList:true });

  /* ---------- 6. Offline / online status banner ---------- */
  function ensureOfflineBanner(){
    var b = document.getElementById('fxpOfflineBanner');
    if(b) return b;
    b = document.createElement('div');
    b.id = 'fxpOfflineBanner';
    b.className = 'fxp-offline-banner';
    b.innerHTML =
      '<span>📴 இணையம் இல்லை — விளையாட்டு, கேள்வி &amp; தோட்டம் இயங்கும். குரல் ஓதுதல் / தொழுகை நேரம் இணையம் வந்ததும் கிடைக்கும்.</span>';
    document.body.appendChild(b);
    return b;
  }
  function updateOnlineStatus(){
    var b = ensureOfflineBanner();
    if(navigator.onLine){
      b.classList.remove('fxp-show');
    } else {
      b.classList.add('fxp-show');
    }
  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  /* ---------- 8. Full-Quran offline audio downloader (Juz-by-Juz) ---------- */
  var SW_CACHE_NAME = 'quran-garden-v10'; // must match sw.js CACHE_NAME
  var JUZ_DONE_KEY = 'quran_garden_juz_done_v1'; // JSON array of finished juz numbers

  // Standard 30-Juz boundaries: each juz = list of {surah, from, to} ayah segments
  var JUZ_BOUNDS = {
    1:[{s:1,f:1,t:7},{s:2,f:1,t:141}],
    2:[{s:2,f:142,t:252}],
    3:[{s:2,f:253,t:286},{s:3,f:1,t:92}],
    4:[{s:3,f:93,t:200},{s:4,f:1,t:23}],
    5:[{s:4,f:24,t:147}],
    6:[{s:4,f:148,t:176},{s:5,f:1,t:81}],
    7:[{s:5,f:82,t:120},{s:6,f:1,t:110}],
    8:[{s:6,f:111,t:165},{s:7,f:1,t:87}],
    9:[{s:7,f:88,t:206},{s:8,f:1,t:40}],
    10:[{s:8,f:41,t:75},{s:9,f:1,t:92}],
    11:[{s:9,f:93,t:129},{s:10,f:1,t:109},{s:11,f:1,t:5}],
    12:[{s:11,f:6,t:123},{s:12,f:1,t:52}],
    13:[{s:12,f:53,t:111},{s:13,f:1,t:43},{s:14,f:1,t:52}],
    14:[{s:15,f:1,t:99},{s:16,f:1,t:128}],
    15:[{s:17,f:1,t:111},{s:18,f:1,t:74}],
    16:[{s:18,f:75,t:110},{s:19,f:1,t:98},{s:20,f:1,t:135}],
    17:[{s:21,f:1,t:112},{s:22,f:1,t:78}],
    18:[{s:23,f:1,t:118},{s:24,f:1,t:64},{s:25,f:1,t:20}],
    19:[{s:25,f:21,t:77},{s:26,f:1,t:227},{s:27,f:1,t:55}],
    20:[{s:27,f:56,t:93},{s:28,f:1,t:88},{s:29,f:1,t:45}],
    21:[{s:29,f:46,t:69},{s:30,f:1,t:60},{s:31,f:1,t:34},{s:32,f:1,t:30},{s:33,f:1,t:30}],
    22:[{s:33,f:31,t:73},{s:34,f:1,t:54},{s:35,f:1,t:45},{s:36,f:1,t:27}],
    23:[{s:36,f:28,t:83},{s:37,f:1,t:182},{s:38,f:1,t:88},{s:39,f:1,t:31}],
    24:[{s:39,f:32,t:75},{s:40,f:1,t:85},{s:41,f:1,t:46}],
    25:[{s:41,f:47,t:54},{s:42,f:1,t:53},{s:43,f:1,t:89},{s:44,f:1,t:59},{s:45,f:1,t:37}],
    26:[{s:46,f:1,t:35},{s:47,f:1,t:38},{s:48,f:1,t:29},{s:49,f:1,t:18},{s:50,f:1,t:45},{s:51,f:1,t:30}],
    27:[{s:51,f:31,t:60},{s:52,f:1,t:49},{s:53,f:1,t:62},{s:54,f:1,t:55},{s:55,f:1,t:78},{s:56,f:1,t:96},{s:57,f:1,t:29}],
    28:[{s:58,f:1,t:22},{s:59,f:1,t:24},{s:60,f:1,t:13},{s:61,f:1,t:14},{s:62,f:1,t:11},{s:63,f:1,t:11},{s:64,f:1,t:18},{s:65,f:1,t:12},{s:66,f:1,t:12}],
    29:[{s:67,f:1,t:30},{s:68,f:1,t:52},{s:69,f:1,t:52},{s:70,f:1,t:44},{s:71,f:1,t:28},{s:72,f:1,t:28},{s:73,f:1,t:20},{s:74,f:1,t:56},{s:75,f:1,t:40},{s:76,f:1,t:31},{s:77,f:1,t:50}],
    30:[{s:78,f:1,t:40},{s:79,f:1,t:46},{s:80,f:1,t:42},{s:81,f:1,t:29},{s:82,f:1,t:19},{s:83,f:1,t:36},{s:84,f:1,t:25},{s:85,f:1,t:22},{s:86,f:1,t:17},{s:87,f:1,t:19},{s:88,f:1,t:26},{s:89,f:1,t:30},{s:90,f:1,t:20},{s:91,f:1,t:15},{s:92,f:1,t:21},{s:93,f:1,t:11},{s:94,f:1,t:8},{s:95,f:1,t:8},{s:96,f:1,t:19},{s:97,f:1,t:5},{s:98,f:1,t:8},{s:99,f:1,t:8},{s:100,f:1,t:11},{s:101,f:1,t:11},{s:102,f:1,t:8},{s:103,f:1,t:3},{s:104,f:1,t:9},{s:105,f:1,t:5},{s:106,f:1,t:4},{s:107,f:1,t:7},{s:108,f:1,t:3},{s:109,f:1,t:6},{s:110,f:1,t:3},{s:111,f:1,t:5},{s:112,f:1,t:4},{s:113,f:1,t:5},{s:114,f:1,t:6}]
  };

  function buildUrlsForJuz(juzNum){
    var urls = [];
    (JUZ_BOUNDS[juzNum] || []).forEach(function(seg){
      var s = String(seg.s).padStart(3,'0');
      for(var a=seg.f; a<=seg.t; a++){
        urls.push('https://everyayah.com/data/Alafasy_128kbps/' + s + String(a).padStart(3,'0') + '.mp3');
      }
    });
    return urls;
  }
  function ayahCountForJuz(juzNum){
    var n = 0;
    (JUZ_BOUNDS[juzNum] || []).forEach(function(seg){ n += (seg.t - seg.f + 1); });
    return n;
  }
  function getDoneJuz(){
    try{ return JSON.parse(localStorage.getItem(JUZ_DONE_KEY) || '[]'); }catch(e){ return []; }
  }
  function markJuzDone(juzNum){
    var done = getDoneJuz();
    if(done.indexOf(juzNum) === -1) done.push(juzNum);
    localStorage.setItem(JUZ_DONE_KEY, JSON.stringify(done));
  }

  var juzDownloading = {}; // juzNum -> true while in progress

  function downloadJuz(juzNum, rowEl){
    if(juzDownloading[juzNum]) return;
    if(!navigator.onLine){
      alert('இணையம் இல்லை. WiFi இணைப்புடன் மீண்டும் முயற்சிக்கவும்.');
      return;
    }
    juzDownloading[juzNum] = true;
    var urls = buildUrlsForJuz(juzNum);
    var total = urls.length;
    var done = 0, failed = 0;
    var CONCURRENCY = 4;
    var idx = 0;
    var statusEl = rowEl ? rowEl.querySelector('.fxp-juz-status') : null;

    function updateStatus(){
      if(!statusEl) return;
      var pct = Math.round((done/total)*100);
      statusEl.textContent = pct + '%';
    }
    if(rowEl) rowEl.classList.add('fxp-juz-active');
    updateStatus();

    caches.open(SW_CACHE_NAME).then(function(cache){
      function next(){
        if(idx >= total) return Promise.resolve();
        var url = urls[idx++];
        return cache.match(url).then(function(existing){
          if(existing){ done++; updateStatus(); return next(); }
          return fetch(url).then(function(res){
            if(res && res.status === 200){
              return cache.put(url, res.clone()).then(function(){ done++; updateStatus(); return next(); });
            }
            failed++; done++; updateStatus(); return next();
          }).catch(function(){ failed++; done++; updateStatus(); return next(); });
        });
      }
      var workers = [];
      for(var i=0;i<CONCURRENCY;i++) workers.push(next());
      return Promise.all(workers);
    }).then(function(){
      juzDownloading[juzNum] = false;
      if(rowEl) rowEl.classList.remove('fxp-juz-active');
      if(failed === 0){
        markJuzDone(juzNum);
        if(rowEl) rowEl.classList.add('fxp-juz-done');
        if(statusEl) statusEl.textContent = '✅';
      } else if(statusEl){
        statusEl.textContent = '⚠️ மீண்டும்';
      }
    });
  }

  function buildJuzPanel(){
    var panel = document.createElement('div');
    panel.id = 'fxpJuzPanel';
    panel.className = 'fxp-juz-panel';
    var doneList = getDoneJuz();
    var html = '<div class="fxp-juz-panel-inner">' +
      '<div class="fxp-juz-panel-head">' +
        '<span>📥 முழு குர்ஆன் ஆடியோ — ஜுஸ்வு வாரியாக</span>' +
        '<button type="button" class="fxp-juz-close" aria-label="close">✕</button>' +
      '</div>' +
      '<div class="fxp-juz-panel-sub">ஒவ்வொரு ஜுஸ்வும் தனித்தனியா download பண்ணலாம் (~50-80MB). WiFi பரிந்துரைக்கப்படுகிறது.</div>' +
      '<div class="fxp-juz-list">';
    for(var j=1;j<=30;j++){
      var isDone = doneList.indexOf(j) !== -1;
      var count = ayahCountForJuz(j);
      html += '<div class="fxp-juz-row' + (isDone ? ' fxp-juz-done' : '') + '" data-juz="' + j + '">' +
        '<span class="fxp-juz-label">ஜுஸ்வு ' + j + ' <small>(' + count + ' ஆயத்)</small></span>' +
        '<button type="button" class="fxp-juz-dl-btn">' +
          '<span class="fxp-juz-status">' + (isDone ? '✅' : '⬇️') + '</span>' +
        '</button>' +
      '</div>';
    }
    html += '</div></div>';
    panel.innerHTML = html;
    document.body.appendChild(panel);

    panel.querySelector('.fxp-juz-close').addEventListener('click', function(){
      panel.classList.remove('fxp-show');
      setTimeout(function(){ try{ panel.remove(); }catch(e){} }, 300);
    });
    panel.querySelectorAll('.fxp-juz-row').forEach(function(row){
      row.querySelector('.fxp-juz-dl-btn').addEventListener('click', function(){
        var juzNum = parseInt(row.getAttribute('data-juz'), 10);
        if(row.classList.contains('fxp-juz-done')) return;
        downloadJuz(juzNum, row);
      });
    });
    requestAnimationFrame(function(){ panel.classList.add('fxp-show'); });
  }

  function ensureDownloadFab(){
    var fab = document.getElementById('fxpDownloadFab');
    if(fab) return fab;
    fab = document.createElement('button');
    fab.type = 'button';
    fab.id = 'fxpDownloadFab';
    fab.className = 'fxp-download-fab';
    fab.innerHTML = '<span class="fxp-fab-icon">📥</span><span class="fxp-fab-label">குர்ஆன் ஆடியோ<br>Offline-ல் சேமி</span>';
    document.body.appendChild(fab);
    fab.addEventListener('click', function(){
      if(document.getElementById('fxpJuzPanel')) return;
      buildJuzPanel();
    });
    return fab;
  }

  /* ---------- Init ---------- */
  function init(){
    addSplashStars();
    wireTilt();
    hookSwitchScreen();
    // in case switchScreen is defined slightly after this script runs
    setTimeout(hookSwitchScreen, 300);
    setTimeout(hookSwitchScreen, 1000);
    var activeScreen = document.querySelector('.screen.active');
    if(activeScreen) activeScreen.classList.add('fxp-in');
    updateOnlineStatus();
    ensureDownloadFab();
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
