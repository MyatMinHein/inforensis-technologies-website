(() => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    }));
  }
  document.getElementById('year').textContent = new Date().getFullYear();
  const track = document.querySelector('.client-track');
  const slides = Array.from(document.querySelectorAll('.client-slide'));
  const dotsWrap = document.querySelector('.carousel-dots');
  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  if (!track || !slides.length || !dotsWrap) return;
  let index = 0, timer;
  const visible = () => window.innerWidth <= 650 ? 2 : window.innerWidth <= 900 ? 3 : 4;
  const maxIndex = () => Math.max(0, slides.length - visible());
  slides.forEach((_, i) => {
    const dot = document.createElement('button'); dot.type = 'button';
    dot.setAttribute('aria-label', `Show client logo group ${i + 1}`);
    dot.addEventListener('click', () => { index = Math.min(i, maxIndex()); render(); restart(); });
    dotsWrap.appendChild(dot);
  });
  function render() {
    index = Math.min(index, maxIndex());
    const slide = slides[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const distance = slide.getBoundingClientRect().width + gap;
    track.style.transform = `translateX(${-index * distance}px)`;
    Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === index));
  }
  function advance(step) { index += step; if (index > maxIndex()) index = 0; if (index < 0) index = maxIndex(); render(); }
  function restart() { clearInterval(timer); timer = setInterval(() => advance(1), 3500); }
  prev.addEventListener('click', () => { advance(-1); restart(); });
  next.addEventListener('click', () => { advance(1); restart(); });
  window.addEventListener('resize', render);
  const carousel = document.querySelector('.client-carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', restart);
  carousel.addEventListener('focusin', () => clearInterval(timer));
  carousel.addEventListener('focusout', restart);
  render(); restart();
})();
