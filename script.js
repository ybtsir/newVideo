// Minimal JS: controls steps, start animation, and QR link setup
document.addEventListener('DOMContentLoaded', () => {
  const steps = Array.from(document.querySelectorAll('.step'));
  let idx = 0;
  const startBtn = document.getElementById('startBtn');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const qrLink = document.getElementById('qrLink');

  function show(i){
    steps.forEach(s => s.classList.remove('active'));
    const n = (i + steps.length) % steps.length;
    steps[n].classList.add('active');
    idx = n;
  }

  startBtn.addEventListener('click', () => {
    // simple auto-advance every 2.6s, stop after one loop
    let count = 0;
    show(0);
    const t = setInterval(() => {
      show(++idx);
      count++;
      if (count >= steps.length) clearInterval(t);
    }, 2600);
  });

  prev.addEventListener('click', () => show(idx - 1));
  next.addEventListener('click', () => show(idx + 1));

  // QR link: default placeholder - will be replaced after deploy
  const placeholder = 'https://your-domain.vercel.app';
  qrLink.href = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(placeholder)}`;
  qrLink.target = '_blank';
});
