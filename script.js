// Thay đổi thông điệp khi bấm nút
function changeMessage() {
    const messages = [
        "Chúc bạn ngày 20/10 thật vui vẻ và ý nghĩa!",
        "Mong bạn luôn hạnh phúc, mạnh khỏe và gặp nhiều may mắn!",
        "Chúc bạn thành công và mãi mãi xinh đẹp!"
    ];
    const messageElement = document.getElementById("message");
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageElement.innerText = messages[randomIndex];
}

// Hiệu ứng confetti
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const colors = ['#FF0D72', '#0DFF72', '#0D72FF', '#72FF0D', '#FF720D'];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 2,
        speedX: (Math.random() - 0.5) * 5,
        speedY: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
    };
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.y > canvas.height) {
            particles[i] = createParticle();
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function loop() {
    updateParticles();
    requestAnimationFrame(loop);
}

function initConfetti() {
    resizeCanvas();
    particles = Array.from({ length: 200 }, createParticle);
    loop();
}

window.addEventListener('resize', resizeCanvas);
window.onload = initConfetti;
