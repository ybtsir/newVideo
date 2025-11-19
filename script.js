// script.js - image-only slider with autoplay toggle

document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const startBtn = document.getElementById('startBtn');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const qrLink = document.getElementById('qrLink');

  // set QR to open site (you can change it)
  const siteURL = 'https://ybtsir.github.io/newVideo/';
  qrLink.href = `https://chart.googleapis.com/chart?cht=qr&chs=350x350&chl=${encodeURIComponent(siteURL)}`;

  const transitionMs = 420;  // CSS animation time (if used)
  let current = slides.findIndex(s => s.classList.contains('active'));
  if (current === -1) current = 0;
  let animating = false;
  let autoplayTimer = null;
  const autoplayDelay = 3200; // ms per slide during autoplay

  // helper: safely set active slide
  function setActive(index) {
    index = (index + slides.length) % slides.length;
    slides.forEach((s, i) => {
      const active = i === index;
      s.classList.toggle('active', active);
      s.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    current = index;
  }

  // scroll active slide into comfortable view
  function scrollActiveIntoView() {
    const active = document.querySelector('.slide.active');
    if (!active) return;
    const rect = active.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const offset = 80; // adjust to place card a bit below top
    window.scrollTo({ top: Math.max(absoluteTop - offset, 0), behavior: 'smooth' });
  }

  function goTo(nextIndex, direction='left') {
    if (animating || nextIndex === current) return;
    animating = true;

    const old = slides[current];
    const next = slides[(nextIndex + slides.length) % slides.length];

    // add exit/enter classes for optional CSS animation (if you have them)
    if (direction === 'left') {
      old.classList.add('exit-left');
      next.classList.add('enter-right');
    } else {
      old.classList.add('exit-right');
      next.classList.add('enter-left');
    }

    // switch active
    requestAnimationFrame(() => {
      slides.forEach(s => s.classList.remove('active'));
      next.classList.add('active');
      next.setAttribute('aria-hidden','false');
      old.setAttribute('aria-hidden','true');
    });

    setTimeout(() => {
      slides.forEach(s => s.classList.remove('enter-left','enter-right','exit-left','exit-right'));
      current = (nextIndex + slides.length) % slides.length;
      animating = false;
      scrollActiveIntoView();
    }, transitionMs + 10);
  }

  nextBtn.addEventListener('click', () => {
    goTo((current + 1) % slides.length, 'left');
  });

  prevBtn.addEventListener('click', () => {
    goTo((current - 1 + slides.length) % slides.length, 'right');
  });

  // Start button toggles autoplay (image slideshow)
  startBtn.addEventListener('click', () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
      startBtn.textContent = 'Start';
      return;
    }
    // start autoplay
    startBtn.textContent = 'Stop';
    autoplayTimer = setInterval(() => {
      goTo((current + 1) % slides.length, 'left');
    }, autoplayDelay);
  });

  // keyboard nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });

  // initial scroll so first slide sits nicely
  setTimeout(scrollActiveIntoView, 250);
});
