const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let confetti = [];

// NO button dodges
noBtn.addEventListener("mouseover", () => {
  const card = document.querySelector(".card");
  const cardRect = card.getBoundingClientRect();

  // limit NO button inside card boundaries
  const maxX = cardRect.width - noBtn.offsetWidth;
  const maxY = cardRect.height - noBtn.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

// YES button click
yesBtn.addEventListener("click", () => {
  startConfetti();
  document.querySelector(".card").innerHTML = `
    <h1>YAY!!! 💕🥰</h1>
    <p>I can’t wait to be your Valentine ❤️</p>
  `;
});

// Confetti animation
function startConfetti() {
  confetti = [];
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 3 + 2, // slower/faster variation
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      tilt: Math.random() * 10 - 5,
      tiltSpeed: Math.random() * 0.1 + 0.05
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach(c => {
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate((c.tilt * Math.PI) / 180);
    ctx.fillRect(-c.r/2, -c.r/2, c.r, c.r);
    ctx.restore();

    c.y += c.d;
    c.tilt += c.tiltSpeed;

    if (c.y > canvas.height) {
      c.y = -c.r; // recycle confetti
      c.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animateConfetti);
}
