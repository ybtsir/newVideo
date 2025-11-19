// Slide carousel with autoplay that mirrors the uploaded reel.
// Timings are configurable below.

document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const startBtn = document.getElementById('startBtn');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const qrLink = document.getElementById('qrLink');

  // CONFIG: adjust these to match the video exactly
  // slideDur: how long each slide stays fully visible (ms)
  // transitionMs: animation duration (ms) - should match CSS transition
  const slideDur = 2600;        // default 2.6s (change to 3500 or 4000 if video shows slower slides)
  const transitionMs = 620;     // must be >= CSS animation time (~550ms)
  const autoplayRounds = 1;     // how many full cycles autoplay runs on Start

  // QR placeholder (replace with final deployed URL later)
  const placeholder = 'https://ybtsir.github.io/newVideo/';
  qrLink.href = `https://chart.googleapis.com/chart?cht=qr&chs=350x350&chl=${encodeURIComponent(placeholder)}`;

  let current = 0;
  let animating = false;
  let autoplayTimer = null;

  function show(i) {
    if (animating || i === current) return;
    animating = true;
    const old = slides[current];
    const next = slides[(i + slides.length) % slides.length];

    // determine direction for nicer effect
    const dir = (i > current || (i === 0 && current === slides.length -1)) ? 'left' : 'right';

    // set exit/enter classes
    if (dir === 'left') {
      old.classList.add('exit-left');
      next.classList.add('enter-right');
    } else {
      old.classList.add('exit-right');
      next.classList.add('enter-left');
    }

    // small delay then swap active
    requestAnimationFrame(() => {
      // ensure classes applied then switch active
      slides.forEach(s => s.classList.remove('active'));
      next.classList.add('active');
      next.setAttribute('aria-hidden','false');
      old.setAttribute('aria-hidden','true');
    });

    // clear transitional classes after transition finishes
    setTimeout(() => {
      slides.forEach(s => s.classList.remove('enter-left','enter-right','exit-left','exit-right'));
      current = (i + slides.length) % slides.length;
      animating = false;
    }, transitionMs + 40);
  }

  // buttons
  nextBtn.addEventListener('click', () => {
    show((current + 1) % slides.length);
  });
  prevBtn.addEventListener('click', () => {
    show((current - 1 + slides.length) % slides.length);
  });

  // Start button: autoplay through slides for autoplayRounds cycles
  startBtn.addEventListener('click', () => {
    if (autoplayTimer) return;
    startBtn.disabled = true;
    let cycles = 0;
    autoplayTimer = setInterval(() => {
      const nextIdx = (current + 1) % slides.length;
      show(nextIdx);
      if (nextIdx === slides.length - 1) cycles++;
      if (cycles >= autoplayRounds) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
        startBtn.disabled = false;
      }
    }, slideDur + transitionMs); // wait slide duration + animation time
  });

  // keyboard support (optional)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });

  // initial show
  slides.forEach((s, idx) => {
    if (idx === 0) s.classList.add('active');
    else s.classList.remove('active');
  });
});
