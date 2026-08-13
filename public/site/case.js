// Kaelo portfolio & case-pagina's — gedeelde motion-laag.
// Zelfde bewezen boot-logica als de homepage: motion start pas na een echt
// gerenderd frame; verborgen tabs wachten op zichtbaarheid; na 5s zonder
// frame valt de pagina terug op de volledig leesbare statische versie.
(function(){
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu
  const menuBtn = $('#menuBtn'), nlinks = $('#nlinks');
  if(menuBtn){
    menuBtn.addEventListener('click', () => nlinks.classList.toggle('open'));
    nlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nlinks.classList.remove('open')));
  }

  // Nav verbergen bij scroll-down (scroll-event, geen rAF nodig)
  const nav = $('#nav');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('hide', y > 220 && y > lastY);
    lastY = y;
  }, {passive:true});

  const libsOk = window.gsap && window.ScrollTrigger && window.SplitText && window.Lenis;
  let motionStarted = false;

  function bootMotion(){
    if(motionStarted) return;
    motionStarted = true;
    const fastForward = document.documentElement.classList.contains('no-motion');
    document.documentElement.classList.remove('no-motion');
    document.fonts.ready.then(() => initMotion(fastForward)).catch(() => initMotion(fastForward));
  }
  window.bootMotion = bootMotion;

  function probeFrames(){
    if(motionStarted) return;
    if(reducedMotion || !libsOk){ document.documentElement.classList.add('no-motion'); return; }
    requestAnimationFrame(() => bootMotion());
  }
  document.addEventListener('visibilitychange', () => { if(!document.hidden) probeFrames(); });
  probeFrames();
  setTimeout(() => {
    if(!motionStarted){ document.documentElement.classList.add('no-motion'); }
  }, 5000);

  function initMotion(fastForward){
    gsap.registerPlugin(ScrollTrigger, SplitText);
    document.documentElement.classList.add('has-lenis');

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = a.getAttribute('href');
        if(target.length > 1 && $(target)){
          e.preventDefault();
          lenis.scrollTo(target, { offset: -20 });
        }
      });
    });

    // Intro: nav + hero-elementen
    gsap.set('.nav', { yPercent: -130 });
    const introEls = $$('[data-intro]');
    gsap.set(introEls, { autoAlpha: 0, y: 30 });

    const pre = gsap.timeline({
      onComplete: () => { window.__preloaderDone = true; const p = $('#preloader'); if(p) p.style.display = 'none'; }
    });
    const preLogo = $('#preLogo');
    if(preLogo){
      pre.from(preLogo, { scale: .4, rotate: -8, duration: .6, ease: 'back.out(2.2)' }, 0);
      pre.to('#preloader', { yPercent: -100, duration: .7, ease: 'expo.inOut' }, .95);
      pre.to('.nav', { yPercent: 0, duration: .9, ease: 'expo.out' }, 1.15);
      pre.to(introEls, { autoAlpha: 1, y: 0, duration: .9, ease: 'expo.out', stagger: .1 }, 1.2);
    } else {
      pre.to('.nav', { yPercent: 0, duration: .9, ease: 'expo.out' }, .1);
      pre.to(introEls, { autoAlpha: 1, y: 0, duration: .9, ease: 'expo.out', stagger: .1 }, .15);
    }
    if(fastForward){ pre.progress(1); }

    // Reveals
    $$('[data-reveal]').forEach(el => {
      gsap.from(el, {
        y: 40, autoAlpha: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
    $$('[data-pop]').forEach(el => {
      gsap.from(el, {
        scale: .4, rotate: -8, autoAlpha: 0, duration: .7, ease: 'back.out(2.4)',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });
    $$('[data-lines]').forEach(el => {
      const split = new SplitText(el, { type: 'lines', mask: 'lines' });
      gsap.from(split.lines, {
        yPercent: 115, duration: 1, ease: 'expo.out', stagger: .09,
        scrollTrigger: { trigger: el, start: 'top 86%' }
      });
    });
    $$('[data-card]').forEach((el, i) => {
      gsap.from(el, {
        y: 80, autoAlpha: 0, scale: .94, duration: 1, ease: 'back.out(1.4)', delay: (i % 3) * .06,
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });

    // Telefoon-mockups: parallax
    $$('[data-phone]').forEach(p => {
      gsap.fromTo(p, { y: 30 }, {
        y: -30, ease: 'none',
        scrollTrigger: { trigger: p.closest('.mock-wrap') || p, start: 'top bottom', end: 'bottom top', scrub: .5 }
      });
    });

    // Magnetisch + cursor
    if(window.matchMedia('(pointer:fine)').matches){
      $$('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * .22,
            y: (e.clientY - r.top - r.height / 2) * .26,
            duration: .45, ease: 'power2.out'
          });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1,.45)' });
        });
      });

      const dot = $('#curDot'), ring = $('#curRing');
      if(dot && ring){
        const pos = { x: -100, y: -100 }, ringPos = { x: -100, y: -100 };
        window.addEventListener('mousemove', e => { pos.x = e.clientX; pos.y = e.clientY; });
        gsap.ticker.add(() => {
          ringPos.x += (pos.x - ringPos.x) * .15;
          ringPos.y += (pos.y - ringPos.y) * .15;
          dot.style.transform = `translate(${pos.x - 4}px, ${pos.y - 4}px)`;
          const half = ring.offsetWidth / 2;
          ring.style.transform = `translate(${ringPos.x - half}px, ${ringPos.y - half}px)`;
        });
        $$('a, button, [data-cursor]').forEach(el => {
          el.addEventListener('mouseenter', () => {
            if(el.dataset.cursor === 'view'){ ring.classList.add('is-view'); }
            else { ring.classList.add('is-link'); }
          });
          el.addEventListener('mouseleave', () => { ring.classList.remove('is-view', 'is-link'); });
        });
      }
    }

    ScrollTrigger.refresh();
  }
})();
