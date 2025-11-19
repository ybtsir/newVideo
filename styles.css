:root{
  --bg-a: #ffefe6;
  --bg-b: #e6f7ff;
  --accent: #6de3c7;
  --muted: rgba(10,10,10,0.6);
  --card-bg: rgba(255,255,255,0.85);
  --glass: rgba(255,255,255,0.6);
  --max-w: 920px;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  color:#0b2230;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  min-height:100vh;
  background: linear-gradient(180deg,var(--bg-a) 0%, var(--bg-b) 100%);
  display:flex;
  align-items:stretch;
}

/* animated layered background (sweeter) */
.bg-wrap{
  position:fixed; inset:0; overflow:hidden; pointer-events:none; z-index:0;
}
.bg-layer{
  position:absolute; width:120%; height:120%; left:-10%; top:-10%; filter: blur(80px); opacity:0.95;
  transform-origin:center;
}
.bg-layer.layer1{ background: radial-gradient(600px 300px at 15% 25%, rgba(255,190,180,0.7), transparent 10%); animation: move1 18s ease-in-out infinite;}
.bg-layer.layer2{ background: radial-gradient(500px 250px at 80% 80%, rgba(160,220,255,0.55), transparent 12%); animation: move2 20s ease-in-out infinite;}
.bg-layer.layer3{ background: radial-gradient(420px 220px at 40% 80%, rgba(200,255,230,0.5), transparent 12%); animation: move3 24s ease-in-out infinite;}
@keyframes move1 {0%{transform:translateY(-8px) rotate(-2deg)}50%{transform:translateY(8px) rotate(2deg)}100%{transform:translateY(-8px) rotate(-2deg)}}
@keyframes move2 {0%{transform:translateX(-10px)}50%{transform:translateX(10px)}100%{transform:translateX(-10px)}}
@keyframes move3 {0%{transform:translateY(6px) translateX(-6px)}50%{transform:translateY(-6px) translateX(6px)}100%{transform:translateY(6px) translateX(-6px)}}

/* hero */
.hero{ position:relative; z-index:1; flex:1; display:flex; align-items:center; justify-content:center; padding:36px 20px;}
.container{ width:100%; max-width:var(--max-w); margin:0 auto; text-align:left; padding:28px; border-radius:14px;}

/* header */
.brand{ margin-bottom:20px; padding-left:6px; }
h1{ margin:0; font-size:40px; line-height:1.02; color:#042a33; font-weight:800; animation: fadeUp .6s ease both; }
@keyframes fadeUp { from { opacity:0; transform:translateY(8px)} to {opacity:1; transform:none} }
#subtitle{ margin:10px 0 20px; color:var(--muted); font-size:15px; opacity:0.95; animation: fadeUp .6s .08s both; }

/* action row */
.action-row{ display:flex; gap:12px; align-items:center; margin-bottom:18px; padding-left:6px; }
.btn{ border:0; padding:12px 20px; border-radius:999px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; text-decoration:none; }
.btn.primary{ background: linear-gradient(90deg,var(--accent), #54d6b9); color:#063a36; box-shadow: 0 10px 26px rgba(15,72,68,0.08); }
.btn.ghost{ background:transparent; border:1px solid rgba(8,20,22,0.06); color:var(--muted); padding:10px 14px; }

/* carousel area - single centered slide view */
.carousel{ position:relative; height:260px; display:flex; align-items:center; justify-content:center; margin-bottom:8px; }
.slide{
  position:absolute;
  width:100%;
  max-width:640px;
  left:50%;
  transform:translateX(-50%) translateY(12px) scale(.98);
  padding:28px;
  border-radius:14px;
  background:var(--card-bg);
  box-shadow: 0 18px 40px rgba(12,40,45,0.07);
  opacity:0;
  pointer-events:none;
  transition: transform .55s cubic-bezier(.2,.9,.3,1), opacity .45s ease;
  text-align:left;
  border:1px solid rgba(10,20,22,0.03);
}
.slide.active{
  opacity:1;
  pointer-events:auto;
  transform:translateX(-50%) translateY(0) scale(1);
}
.slide.exit-left{
  transform:translateX(-110%) scale(.95);
  opacity:0;
}
.slide.exit-right{
  transform:translateX(110%) scale(.95);
  opacity:0;
}
.slide.enter-left{
  transform:translateX(-50%) translateY(0) translateX(-110%) scale(.95);
  opacity:0;
}
.slide.enter-right{
  transform:translateX(-50%) translateY(0) translateX(110%) scale(.95);
  opacity:0;
}

/* slide content */
.slide-num{ font-weight:800; color:#0b6; font-size:18px; margin-bottom:10px;}
.slide-title{ margin:0 0 8px; font-size:20px; color:#042a33; font-weight:700; }
.slide-desc{ margin:0; color: #0b2a31; opacity:0.85; line-height:1.4; font-size:15px; }

/* controls */
.controls{ display:flex; gap:12px; justify-content:center; margin-top:16px; padding-left:6px; }
.ctrl{ background:transparent; border:1px solid rgba(8,20,22,0.06); padding:10px 14px; color:var(--muted); border-radius:10px; cursor:pointer; }

/* footer */
.footer{ margin-top:20px; color:rgba(8,20,22,0.45); font-size:13px; padding-left:6px; }

/* responsive */
@media (max-width:720px){
  h1{ font-size:32px; }
  .carousel{ height:300px; }
  .slide{ padding:18px; max-width:86vw; }
  .container{ padding:16px; }
  .action-row{ gap:8px; }
}
@media (min-width:960px){
  .slide{ max-width:760px; }
}
