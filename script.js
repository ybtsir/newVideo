// Slide-based carousel with animated slide in/out
document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const startBtn = document.getElementById('startBtn');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const qrLink = document.getElementById('qrLink');
  const placeholder = 'https://ybtsir.github.io/newVideo/'; // set to your site
  qrLink.href = `https://chart.googleapis.com/chart?cht=qr&chs=350x350&chl=${encodeURIComponent(placeholder)}`;

  let index = 0;
  let animating = false;
  const total = slides.length;

  function setActive(i) {
    slides.forEach(s => s.classList.remove('active','enter-left','enter-right','exit-left','exit-right'));
    slides[i].classList.add('active');
    index = i;
  }

  // initial
  setActive(0);

  function goTo(nextIndex, direction = 'left') {
    if (animating || nextIndex === index) return;
    animating = true;
    const current = slides[index];
    const next = slides[nextIndex];

    // set classes for animation
    if (direction === 'left') {
      current.classList.add('exit-left');
      next.classList.add('enter-right'); // start off-screen right -> slide in left
    } else {
      current.classList.add('exit-right');
      next.classList.add('enter-left');
    }

    // small timeout to allow the enter class to be applied before we toggle active
    setTimeout(() => {
      slides.forEach(s => s.classList.remove('active'));
      next.classList.add('active');
    }, 20);

    // wait for animation (match CSS durations ~ 550ms)
    setTimeout(() => {
      // clear transitional classes
      slides.forEach(s => s.classList.remove('enter-left','enter-right','exit-left','exit-right'));
      index = nextIndex;
      animating = false;
    }, 620);
  }

  // buttons
  nextBtn.addEventListener('click', () => {
    const ni = (index + 1) % total;
    goTo(ni, 'left');
  });
  prevBtn.addEventListener('click', () => {
    const ni = (index - 1 + total) % total;
    goTo(ni, 'right');
  });

  // Start autoplay once: cycles through slides once then stops
  startBtn.addEventListener('click', () => {
    // hide start briefly and run autoplay
    startBtn.disabled = true;
    let cycles = 0;
    const interval = setInterval(() => {
      const ni = (index + 1) % total;
      goTo(ni, 'left');
      if (ni === total - 1) cycles++;
      if (cycles >= 1) {
        clearInterval(interval);
        startBtn.disabled = false;
      }
    }, 2400);
  });

  // keyboard navigation (optional)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });
});
