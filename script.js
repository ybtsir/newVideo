:root{
  --bg1: #071029;
  --accent: #7ce7c8;
  --muted: rgba(255,255,255,0.82);
  --card-bg: rgba(255,255,255,0.03);
  --glass: rgba(255,255,255,0.04);
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  background: linear-gradient(180deg,#021528 0%, #031a2a 100%);
  color:#fff;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  align-items:stretch;
  min-height:100vh;
}

/* animated background subtle */
.bg-anim{
  position:fixed;
  inset:0;
  pointer-events:none;
  background: radial-gradient(800px 400px at 10% 10%, rgba(124,231,200,0.08), transparent 8%),
              radial-gradient(600px 350px at 90% 80%, rgba(90,180,220,0.06), transparent 12%);
  filter: blur(36px) saturate(110%);
  z-index:0;
  animation: moveBg 12s linear infinite alternate;
}
@keyframes moveBg{ from{ transform:translateY(-8px) } to{ transform:translateY(8px) } }

/* hero layout */
.hero{
  position:relative;
  z-index:1;
  flex:1;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:36px 20px;
}

.wrap{
  width:100%;
  max-width:920px;
  text-align:center;
  padding:28px;
  border-radius:16px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border:1px solid rgba(255,255,255,0.03);
  box-shadow: 0 18px 60px rgba(2,6,23,0.6);
}

/* brand */
.brand{margin-bottom:12px}
h1{
  margin:0;
  font-size:36px;
  line-height:1.02;
  font-weight:800;
  letter-spacing:0.2px;
  color: white;
}
p#subtitle{
  margin:8px 0 18px;
  color:var(--muted);
  font-size:15px;
}

/* actions */
.action-row{display:flex;gap:12px;justify-content:center;align-items:center;margin-bottom:18px}
.btn{
  border:0;
  padding:12px 18px;
  border-radius:999px;
  font-weight:700;
  cursor:pointer;
  text-decoration:none;
  display:inline-flex;
  align-items:center;
  justify-content:center;
}
.btn.primary{
  background: linear-gradient(90deg,var(--accent), #5be2c8);
  color:#04262a;
  box-shadow: 0 8px 28px rgba(92, 219, 180, 0.12);
  font-size:16px;
}
.btn.ghost{
  background: transparent;
  border:1px solid rgba(255,255,255,0.06);
  color:var(--muted);
  padding:10px 14px;
}

/* carousel */
.carousel{
  display:flex;
  gap:14px;
  justify-content:center;
  align-items:stretch;
  margin:14px auto 6px;
  max-width:880px;
  padding:6px;
  position:relative;
}

.card{
  width:240px;
  min-height:110px;
  padding:18px;
  border-radius:14px;
  background: var(--card-bg);
  border:1px solid rgba(255,255,255,0.02);
  transform:scale(.94);
  opacity:.55;
  transition: all .45s cubic-bezier(.2,.9,.3,1);
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  backdrop-filter: blur(6px);
}
.card.active{
  transform:scale(1.05);
  opacity:1;
  box-shadow: 0 18px 40px rgba(2,8,25,0.55);
}
.num{
  font-weight:800;
  font-size:22px;
  color:var(--accent);
  margin-bottom:10px;
}
.card-text{
  margin:0;
  color:var(--muted);
  font-size:15px;
}

/* controls */
.controls{display:flex;gap:12px;justify-content:center;margin-top:14px}
.ctrl{
  background:transparent;
  border:1px solid rgba(255,255,255,0.06);
  padding:8px 14px;
  color:var(--muted);
  border-radius:10px;
  font-weight:600;
}

/* footer */
.footer{margin-top:18px;color:rgba(255,255,255,0.45);font-size:13px}

/* responsive tweaks */
@media (max-width:640px){
  h1{font-size:28px}
  .carousel{gap:10px;flex-wrap:nowrap;overflow:auto;padding-bottom:8px}
  .card{width:72vw;min-height:120px}
  .controls{display:none}
  .action-row{flex-direction:row; gap:10px}
  .wrap{padding:20px}
}
@media (min-width:900px){
  h1{font-size:44px}
  .card{width:260px}
}
