/* EVERTON ALVES — interactions */
(function () {
  'use strict';

  /* ---------- Year ---------- */
  var y = document.getElementById('ano');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Sticky header ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        document.body.classList.remove('nav-open');
        nav.classList.remove('open');
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animate(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dur = 1500, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = (target % 1 === 0) ? Math.round(val).toLocaleString('pt-BR') : val.toFixed(1);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animate(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Accordions (FAQ + generic) ---------- */
  document.querySelectorAll('[data-accordion]').forEach(function (root) {
    root.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.addEventListener('click', function () {
        var open = item.classList.toggle('open');
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
        a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
      });
    });
  });

  /* ---------- "Por que eu" 4-image slideshow (synced with items) ---------- */
  var whySlider = document.getElementById('whySlider');
  if (whySlider) {
    var slides = whySlider.querySelectorAll('.why-slide');
    var dots = whySlider.querySelectorAll('.wd');
    var items = document.querySelectorAll('.why-list .why-item');
    var wi = 0, wtimer = null;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function whyGo(n) {
      wi = (n + slides.length) % slides.length;
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.toggle('is-active', i === wi);
        if (dots[i]) dots[i].classList.toggle('is-active', i === wi);
        if (items[i]) items[i].classList.toggle('active', i === wi);
      }
    }
    function whyStart() { if (!reduce) { whyStop(); wtimer = setInterval(function () { whyGo(wi + 1); }, 3600); } }
    function whyStop() { if (wtimer) { clearInterval(wtimer); wtimer = null; } }
    dots.forEach(function (d, i) { d.addEventListener('click', function () { whyGo(i); whyStart(); }); });
    items.forEach(function (it, i) { it.addEventListener('mouseenter', function () { whyGo(i); whyStop(); }); });
    var whyVisual = document.querySelector('.why-visual');
    if (whyVisual) {
      whyVisual.addEventListener('mouseenter', whyStop);
      whyVisual.addEventListener('mouseleave', whyStart);
    }
    var whyList = document.querySelector('.why-list');
    if (whyList) whyList.addEventListener('mouseleave', whyStart);
    whyGo(0); whyStart();
  }

  /* ---------- Hero slideshow (3 fotos advogado + trabalhador) ---------- */
  var heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    var hSlides = heroSlider.querySelectorAll('.hero-slide');
    var hDots = document.querySelectorAll('#heroDots .hd');
    var hi = 0, htimer = null;
    var hReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function heroGo(n) {
      hi = (n + hSlides.length) % hSlides.length;
      for (var i = 0; i < hSlides.length; i++) {
        hSlides[i].classList.toggle('is-active', i === hi);
        if (hDots[i]) hDots[i].classList.toggle('is-active', i === hi);
      }
    }
    function heroStart() { if (!hReduce && hSlides.length > 1) { heroStop(); htimer = setInterval(function () { heroGo(hi + 1); }, 4200); } }
    function heroStop() { if (htimer) { clearInterval(htimer); htimer = null; } }
    hDots.forEach(function (d, i) { d.addEventListener('click', function () { heroGo(i); heroStart(); }); });
    var frame = heroSlider.closest('.hero-photo-frame');
    if (frame) {
      frame.addEventListener('mouseenter', heroStop);
      frame.addEventListener('mouseleave', heroStart);
    }
    heroGo(0); heroStart();
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  var waForm = document.getElementById('waForm');
  if (waForm) {
    waForm.addEventListener('submit', function (e) {
      e.preventDefault();
      function val(id) { var el = document.getElementById(id); return el ? (el.value || '').trim() : ''; }
      var nome = val('c-nome'), tel = val('c-tel'), assunto = val('c-assunto'), msg = val('c-msg');
      if (!nome) { var n = document.getElementById('c-nome'); if (n) n.focus(); return; }
      var parts = ['Olá! Meu nome é ' + nome + '.', 'Assunto: ' + (assunto || 'Outro assunto') + '.'];
      if (msg) parts.push(msg);
      if (tel) parts.push('Meu contato: ' + tel + '.');
      var url = 'https://wa.me/5512996732743?text=' + encodeURIComponent(parts.join(' '));
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---------- Áreas de atuação: busca (ignora maiúsculas/acentos/cedilha) ---------- */
  var areaSearch = document.getElementById('areaSearch');
  if (areaSearch) {
    var grid = document.querySelector('.areas-grid');
    var cards = grid ? Array.prototype.slice.call(grid.querySelectorAll('.area-card:not(.area-cta)')) : [];
    var clearBtn = document.getElementById('areaSearchClear');
    var noResult = document.getElementById('areaNoResult');
    function norm(s) {
      return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
    }
    cards.forEach(function (c) {
      c._text = norm(c.textContent + ' ' + (c.getAttribute('data-keywords') || ''));
    });
    function filterAreas() {
      var q = norm(areaSearch.value);
      var terms = q ? q.split(' ') : [];
      var visible = 0;
      cards.forEach(function (c) {
        var show = terms.every(function (t) { return c._text.indexOf(t) !== -1; });
        c.classList.toggle('is-hidden', !show);
        if (show) visible++;
      });
      if (clearBtn) clearBtn.hidden = !areaSearch.value;
      if (noResult) noResult.hidden = !(q && visible === 0);
    }
    areaSearch.addEventListener('input', filterAreas);
    if (clearBtn) clearBtn.addEventListener('click', function () { areaSearch.value = ''; filterAreas(); areaSearch.focus(); });
  }

  /* ---------- Map consent loader ---------- */
  function loadMap() {
    var f = document.getElementById('mapFrame'), ph = document.getElementById('mapPh');
    if (f && !f.getAttribute('src')) {
      f.setAttribute('src', f.getAttribute('data-consent-src') || '');
      f.style.display = 'block';
    }
    if (ph) ph.style.display = 'none';
  }
  var mapLoadBtn = document.getElementById('mapLoad');
  if (mapLoadBtn) mapLoadBtn.addEventListener('click', loadMap);

  /* ---------- Cookie consent banner (LGPD) ---------- */
  (function () {
    var KEY = 'ea_cookie_consent';
    var choice = null;
    try { choice = localStorage.getItem(KEY); } catch (e) {}

    function applyConsent(c) { if (c === 'accepted') loadMap(); }

    if (choice) { applyConsent(choice); return; }

    var bar = document.createElement('div');
    bar.className = 'cookie-bar';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Aviso de cookies');
    bar.innerHTML =
      '<span class="cc-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 00.34-19.99 2.5 2.5 0 01-2.6 2.99 2.5 2.5 0 01-2.24 3.24A2.5 2.5 0 015 9.5 10 10 0 0112 2zm-2 6a1.2 1.2 0 100 2.4A1.2 1.2 0 0010 8zm5 3a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zm-6 4a1.3 1.3 0 100 2.6A1.3 1.3 0 009 15zm6 1a1 1 0 100 2 1 1 0 000-2z"/></svg></span>' +
      '<div class="cc-text"><b>Este site usa cookies</b>Usamos cookies essenciais para o funcionamento do site e recursos de terceiros (como o mapa do Google). Você decide sobre os cookies não essenciais. Saiba mais na <a href="/politica-de-privacidade.html">Política de Privacidade</a>.</div>' +
      '<div class="cc-actions"><button type="button" class="btn btn-ghost" data-cc="reject">Recusar</button><button type="button" class="btn btn-sage" data-cc="accept">Aceitar</button></div>';
    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar.classList.add('show'); });

    function close() { bar.classList.remove('show'); setTimeout(function () { if (bar.parentNode) bar.parentNode.removeChild(bar); }, 450); }
    function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} applyConsent(v); close(); }
    bar.querySelector('[data-cc="accept"]').addEventListener('click', function () { set('accepted'); });
    bar.querySelector('[data-cc="reject"]').addEventListener('click', function () { set('rejected'); });
  })();

  /* ---------- Subtle hero parallax (desktop, motion-safe) ---------- */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var media = document.querySelector('.hero-media');
  if (media && !prefersReduced && window.innerWidth > 1080) {
    window.addEventListener('scroll', function () {
      var offset = Math.min(window.scrollY, 600);
      media.style.transform = 'translateY(' + (offset * 0.05) + 'px)';
    }, { passive: true });
  }
})();
