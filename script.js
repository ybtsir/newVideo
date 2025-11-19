// FINAL script.js - video-aware slider with pinned controls + auto-advance on video end
document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const startBtn = document.getElementById('startBtn');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const qrLink = document.getElementById('qrLink');

  // Set your QR target (change to Vercel URL if you deploy there)
  const placeholder = 'https://ybtsir.github.io/newVideo/';
  qrLink.href = `https://chart.googleapis.com/chart?cht=qr&chs=350x350&chl=${encodeURIComponent(placeholder)}`;

  const transitionMs = 620; // should match CSS transition
  let current = 0;
  let animating = false;
  let videoEndHandler = null;

  // helper: return <video> element inside a slide or null if not present
  const getVideo = (slide) => {
    if (!slide) return null;
    const el = slide.querySelector('.slide-video');
    return el && el.tagName === 'VIDEO' ? el : null;
  };

  function pauseVideo(i){
    const v = getVideo(slides[i]);
    if (v){ try { v.pause(); v.currentTime = 0; } catch(e){} }
  }

  function playVideo(i){
    const v = getVideo(slides[i]);
    if (!v) return;

    // cleanup old listener
    if (videoEndHandler){
      slides.forEach(s=>{
        const vv = getVideo(s);
        if (vv) vv.removeEventListener('ended', videoEndHandler);
      });
      videoEndHandler = null;
    }

    videoEndHandler = () => {
      goTo((i + 1) % slides.length, 'left');
    };
    v.addEventListener('ended', videoEndHandler);

    v.muted = true;           // required for autoplay on mobile
    v.currentTime = 0;
    const p = v.play();
    if (p && p.catch) p.catch(()=>{ /* ignore autoplay rejection */ });
  }

  function goTo(nextIndex, direction='left'){
    if (animating || nextIndex === current) return;
    animating = true;

    const oldSlide = slides[current];
    const newSlide = slides[(nextIndex + slides.length) % slides.length];

    // pause old slide's video (if any)
    pauseVideo(current);

    if (direction === 'left'){
      oldSlide.classList.add('exit-left');
      newSlide.classList.add('enter-right');
    } else {
      oldSlide.classList.add('exit-right');
      newSlide.classList.add('enter-left');
    }

    requestAnimationFrame(()=>{
      slides.forEach(s => s.classList.remove('active'));
      newSlide.classList.add('active');
      newSlide.setAttribute('aria-hidden','false');
      oldSlide.setAttribute('aria-hidden','true');
    });

    setTimeout(()=>{
      slides.forEach(s => s.classList.remove('enter-left','enter-right','exit-left','exit-right'));
      current = (nextIndex + slides.length) % slides.length;
      animating = false;
      playVideo(current);
      scrollActiveIntoView(); // ensure controls visible on mobile
    }, transitionMs + 20);
  }

  // scroll helper keeps controls visible under mobile UI
  function scrollActiveIntoView(){
    const active = document.querySelector('.slide.active');
    if (!active) return;
    const rect = active.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const offset = 100; // push it a bit below top
    window.scrollTo({ top: Math.max(absoluteTop - offset, 0), behavior: 'smooth' });
  }

  // wire buttons
  nextBtn.addEventListener('click', () => goTo((current + 1) % slides.length, 'left'));
  prevBtn.addEventListener('click', () => goTo((current - 1 + slides.length) % slides.length, 'right'));

  // Start: play first slide video if present; otherwise do nothing
  startBtn.addEventListener('click', () => {
    playVideo(current);
  });

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });

  // initial state
  slides.forEach((s, i) => {
    if (i === 0) s.classList.add('active');
    else s.classList.remove('active');
  });
});
