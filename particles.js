const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const colors = ['#00e5ff','#007cf0','#ff00c8','#00ff9f'];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ===== Mouse Tracking (Desktop only) ===== */
const mouse = { x: null, y: null };

window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

/* ===== Particle Class ===== */
class Particle {
  constructor(x, y, size, color){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = (Math.random() - 0.5) * 1.2; // reduced speed
    this.speedY = (Math.random() - 0.5) * 1.2;
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    // repel from mouse (lighter math)
    if(mouse.x !== null){
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distSq = dx*dx + dy*dy;

      if(distSq < 150*150){
        const force = 150 / Math.sqrt(distSq);
        this.x -= dx * force * 0.02;
        this.y -= dy * force * 0.02;
      }
    }

    // wrap edges
    if(this.x > canvas.width) this.x = 0;
    if(this.x < 0) this.x = canvas.width;
    if(this.y > canvas.height) this.y = 0;
    if(this.y < 0) this.y = canvas.height;
  }

  draw(){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

/* ===== Connect Particles ===== */
function connectParticles(){
  const maxDistance = window.innerWidth < 768 ? 70 : 120;

  for(let a = 0; a < particlesArray.length; a++){
    for(let b = a + 1; b < particlesArray.length; b++){

      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distSq = dx*dx + dy*dy;

      if(distSq < maxDistance * maxDistance){
        const alpha = 1 - distSq/(maxDistance*maxDistance);
        ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

/* ===== Init ===== */
function init(){
  particlesArray = [];

  const numberOfParticles = window.innerWidth < 768 ? 30 : 65;

  for(let i=0; i<numberOfParticles; i++){
    const size = Math.random()*2 + 1;
    const x = Math.random()*canvas.width;
    const y = Math.random()*canvas.height;
    const color = colors[Math.floor(Math.random()*colors.length)];
    particlesArray.push(new Particle(x, y, size, color));
  }
}

/* ===== Animation Loop ===== */
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

/* ===== Resize ===== */
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();


/* ================================================= */
/* ============ RIPPLE EFFECT (SAFE) =============== */
/* ================================================= */

const card = document.getElementById('card');

if(card){
  card.addEventListener('mousemove', e => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = card.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    card.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}


/* ================================================= */
/* ============ SCROLL REVEAL (OPTIMIZED) ========== */
/* ================================================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll, { passive: true });
window.addEventListener("load", revealOnScroll);



/* ================================================= */
/* ============ RIPPLE EFFECT (SAFE) =============== */
/* ================================================= */

const card = document.getElementById('card');

if(card){
  card.addEventListener('mousemove', e => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = card.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    card.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}
