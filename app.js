(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
  };

  // ── 언어 (data-ko / data-en) ──
  let language = store.get('fs-site-lang') === 'en' ? 'en' : 'ko';
  function applyLanguage() {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-ko]').forEach(el => { el.textContent = el.dataset[language]; });
    document.querySelectorAll('[data-alt-ko]').forEach(el => { el.alt = language === 'ko' ? el.dataset.altKo : el.dataset.altEn; });
    const b = $('language');
    b.textContent = language === 'ko' ? 'EN' : '한국어';
    b.setAttribute('aria-label', language === 'ko' ? 'Switch to English' : '한국어로 보기');
    const svg = $('demo-svg');
    if (svg) svg.setAttribute('aria-label', language === 'ko' ? '공급 유닛과 조립 유닛의 흐름 예' : 'Example flow of a supply unit and an assembly unit');
  }
  $('language').addEventListener('click', () => {
    language = language === 'ko' ? 'en' : 'ko';
    store.set('fs-site-lang', language);
    applyLanguage();
  });
  if (language !== 'ko') applyLanguage();

  // ── 스크롤 진행 막대, 나타나기 ──
  const bar = document.querySelector('.scroll-progress');
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('visible'));
  }

  // ── 동작 방식 데모 ──
  const states = [
    { s: ['n-s1', 77, 'active'], a: ['n-a1', 77, 'active'], sig: false, lock: false },
    { s: ['n-s2', 147, 'waiting'], a: ['n-a2', 147, 'waiting'], sig: false, lock: false },
    { s: ['n-s3', 217, 'active'], a: ['n-a3', 217, 'active'], sig: true, lock: false },
    { s: ['n-s4', 287, 'active'], a: ['n-a4', 287, 'waiting'], sig: false, lock: true }
  ];
  const steps = document.querySelectorAll('#demo-steps li');
  let step = 0;
  function render() {
    const st = states[step];
    document.querySelectorAll('#demo-svg .nodes g').forEach(g => g.classList.remove('active', 'waiting'));
    for (const [tok, [node, y, cls]] of [['tok-s', st.s], ['tok-a', st.a]]) {
      $(node).classList.add(cls);
      $(tok).setAttribute('cy', y);
    }
    $('sig-line').classList.toggle('on', st.sig);
    $('lock-line').classList.toggle('on', st.lock);
    steps.forEach((li, i) => li.classList.toggle('current', i === step));
    $('demo-prev').disabled = step === 0;
    $('demo-next').disabled = step === states.length - 1;
  }
  $('demo-next').addEventListener('click', () => { if (step < states.length - 1) { step++; render(); } });
  $('demo-prev').addEventListener('click', () => { if (step > 0) { step--; render(); } });
  steps.forEach((li, i) => li.addEventListener('click', () => { step = i; render(); }));
  render();
})();
