// FULL VIDEO-ENABLED SLIDER

document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const startBtn = document.getElementById('startBtn');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const qrLink = document.getElementById('qrLink');

  // Your site for Scan/Open QR
  const placeholder = 'https://ybtsir.github.io/newVideo/';
  qrLink.href = `https://chart.googleapis.com/chart?cht=qr&chs=350x350&chl=${encodeURIComponent(placeholder)}`;

  const transitionMs = 620; // match CSS slide transition
  let current = 0;
  let animating = false;
  let videoEndHandler = null;

  const getVideo = (slide) => slide.querySelector('.slide-video');

  function pauseVideo(i){
    const v = getVideo(slides[i]);
    if (v){ v.pause(); v.currentTime = 0; }
  }

  function playVideo(i){
    const v = getVideo(slides[i]);
    if (!v) return;

    // clean old listeners
    if (videoEndHandler){
      slides.forEach(s=>{
        const vv = getVideo(s);
        if (vv) vv.removeEventListener('ended', videoEndHandler);
      });
    }

    // new listener to auto-advance when finished
    videoEndHandler = () => {
      goTo((i+1)%slides.length, 'left');
    };
    v.addEventListener('ended', videoEndHandler);

    v.muted = true;
    v.currentTime = 0;
    const p = v.play();
    if (p && p.catch){ p.catch(()=>{}); }
  }

  function goTo(nextIndex, direction='left'){
    if (animating || nextIndex===current) return;
    animating = true;

    const oldSlide = slides[current];
    const newSlide = slides[nextIndex];

    pauseVideo(current);

    if (direction==='left'){
      oldSlide.classList.add('exit-left');
      newSlide.classList.add('enter-right');
    } else {
      oldSlide.classList.add('exit-right');
      newSlide.classList.add('enter-left');
    }

    requestAnimationFrame(()=>{
      slides.forEach(s=>s.classList.remove('active'));
      newSlide.classList.add('active');
      newSlide.setAttribute('aria-hidden','false');
      oldSlide.setAttribute('aria-hidden','true');
    });

    setTimeout(()=>{
      slides.forEach(s=>s.classList.remove('enter-left','enter-right','exit-left','exit-right'));
      current = nextIndex;
      animating = false;
      playVideo(current);
    }, transitionMs+20);
  }

  nextBtn.addEventListener('click', ()=> goTo((current+1)%slides.length,'left'));
  prevBtn.addEventListener('click', ()=> goTo((current-1+slides.length)%slides.length,'right'));

  startBtn.addEventListener('click', ()=>{
    playVideo(current);  // start playing the first slide video
  });

  // initial
  slides.forEach((s,i)=>{
    if (i===0) s.classList.add('active');
    else s.classList.remove('active');
  });
});
