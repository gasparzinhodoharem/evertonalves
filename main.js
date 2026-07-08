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
