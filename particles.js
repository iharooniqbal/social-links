const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const colors = ['#00e5ff','#007cf0','#ff00c8','#00ff9f'];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Track mouse
const mouse = { x: null, y: null };
window.addEventListener('mousemove', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor(x, y, size, color){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = (Math.random()-0.5)*2;
    this.speedY = (Math.random()-0.5)*2;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    // move slightly away from mouse if close
    if(mouse.x && mouse.y){
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 150){
        this.x -= dx*30/dist;
        this.y -= dy*30/dist;
      }
    }

    // wrap around edges
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

function connectParticles(){
  let maxDistance = 120;
  for(let a=0; a<particlesArray.length; a++){
    for(let b=a; b<particlesArray.length; b++){
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < maxDistance){
        // line glow
        let alpha = 1 - distance/maxDistance;
        ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();

        // tiny sparkle along the line
        let midX = (particlesArray[a].x + particlesArray[b].x)/2 + (Math.random()*6-3);
        let midY = (particlesArray[a].y + particlesArray[b].y)/2 + (Math.random()*6-3);
        ctx.fillStyle = `rgba(255,255,255,${Math.random()*0.8})`;
        ctx.beginPath();
        ctx.arc(midX, midY, Math.random()*1.5 + 0.5, 0, Math.PI*2);
        ctx.fill();
      }
    }
  }
}

function init(){
  particlesArray = [];
  for(let i=0; i<120; i++){
    let x = Math.random()*canvas.width;
    let y = Math.random()*canvas.height;
    let size = Math.random()*3 + 1;
    let color = colors[Math.floor(Math.random()*colors.length)];
    particlesArray.push(new Particle(x, y, size, color));
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles(); // Draw lines + sparkles
  requestAnimationFrame(animate);
}

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();



// Ripple effect on card
const card = document.getElementById('card');

card.addEventListener('mousemove', function(e) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  card.appendChild(ripple);

  // Position ripple at mouse
  const rect = card.getBoundingClientRect();
  ripple.style.left = `${e.clientX - rect.left}px`;
  ripple.style.top = `${e.clientY - rect.top}px`;

  // Remove ripple after animation
  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
});
