// Menu toggle
const burger = document.getElementById('hamburger');
const menu = document.getElementById('site-menu');

function openMenu(){
  menu.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow='hidden';
}
function closeMenu(){
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow='';
}

burger.addEventListener('click', () => {
  (menu.classList.contains('open')) ? closeMenu() : openMenu();
});

// Close on ESC & when a link is clicked
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && menu.classList.contains('open')) closeMenu(); });
menu.addEventListener('click', (e)=>{ if(e.target.closest('a')) closeMenu(); });

// Live local date & time in footer
const clock = document.getElementById('clock');
function tick(){
  const d = new Date();
  const date = d.toLocaleDateString(undefined, {year:'numeric', month:'short', day:'numeric'});
  const time = d.toLocaleTimeString(undefined, {hour:'2-digit', minute:'2-digit', second:'2-digit'});
  clock.textContent = `${date} · ${time}`;
}
tick();
setInterval(tick, 1000);

/* ========= Fluid flow from the cursor (emitter at mouse) ========= */
// Create canvas
const canvas = document.createElement('canvas');
canvas.id = 'fluid-canvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

const DPR = Math.min(window.devicePixelRatio || 1, 2);
let W=0, H=0;
function resize(){
  W = canvas.width  = Math.floor(innerWidth  * DPR);
  H = canvas.height = Math.floor(innerHeight * DPR);
  canvas.style.width  = innerWidth  + 'px';
  canvas.style.height = innerHeight + 'px';
}
addEventListener('resize', resize, {passive:true});
resize();

const isMobile = matchMedia('(max-width: 900px)').matches;
const MAX  = isMobile ? 800 : 1600;   // max particles
const EMIT = isMobile ? 4   : 12;     // particles per frame
const particles = [];

const mouse = {x: W/2, y: H/2, vx: 0, vy: 0};
addEventListener('mousemove', (e)=>{
  const x = e.clientX * DPR, y = e.clientY * DPR;
  mouse.vx = x - mouse.x; mouse.vy = y - mouse.y;
  mouse.x = x; mouse.y = y;
}, {passive:true});

// Touch support
addEventListener('touchmove', (e)=>{
  if(!e.touches || !e.touches[0]) return;
  const t = e.touches[0];
  const x = t.clientX * DPR, y = t.clientY * DPR;
  mouse.vx = x - mouse.x; mouse.vy = y - mouse.y;
  mouse.x = x; mouse.y = y;
}, {passive:true});

function emit(){
  for(let i=0;i<EMIT;i++){
    if(particles.length >= MAX){ particles.shift(); }
    particles.push({
      x: mouse.x + (Math.random()-0.5) * 8 * DPR,
      y: mouse.y + (Math.random()-0.5) * 8 * DPR,
      vx: mouse.vx * 0.10,
      vy: mouse.vy * 0.10,
      life: 0,
      max: 120 + Math.random()*160
    });
  }
}

function step(){
  // Fade previous frame for trails
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.fillRect(0,0,W,H);

  // Emit near cursor so the flow STARTS at the pointer
  emit();

  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 1;

  for(let k=0; k<particles.length; k++){
    const p = particles[k];
    const ox = p.x, oy = p.y;

    // Vector field centered on cursor: outward + gentle swirl
    const dx = p.x - mouse.x; const dy = p.y - mouse.y;
    const r2 = dx*dx + dy*dy; const r = Math.sqrt(r2) + 1e-5;
    const ux = dx / r; const uy = dy / r;     // radial unit
    const px = -uy,  py = ux;                  // perpendicular (swirl)

    const radial = 1.6 * Math.exp(-r2 / (9000 * DPR));
    const swirlS = 0.9 * Math.exp(-r2 / (16000 * DPR));

    // Add mouse motion direction for streaklines when moving
    p.vx += (ux*radial + px*swirlS) + mouse.vx * 0.002;
    p.vy += (uy*radial + py*swirlS) + mouse.vy * 0.002;

    // Damping & integration
    p.vx *= 0.985; p.vy *= 0.985;
    p.x  += p.vx * 2.0; p.y += p.vy * 2.0;

    // Draw the segment
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = 'rgba(170, 200, 255, 0.08)';
    ctx.stroke();

    // Recycle
    p.life++;
    if(p.life > p.max || p.x < 0 || p.y < 0 || p.x > W || p.y > H){
      particles.splice(k,1); k--;
    }
  }
  requestAnimationFrame(step);
}
step();
