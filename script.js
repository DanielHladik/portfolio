// Debug log to confirm script execution
console.log('Script loaded successfully');

// Add interactivity to your portfolio here
console.log('Welcome to my portfolio!');

// AMOLED animated background with interactive stars
const canvas = document.getElementById('amoled-bg');
if (!canvas) {
    console.error('Canvas element not found');
} else {
    console.log('Canvas element found and initialized');
    const ctx = canvas.getContext('2d');
    let stars = [];
    let w = window.innerWidth;
    let h = window.innerHeight;
    let mouse = { x: w/2, y: h/2 };
    const STAR_COUNT = Math.floor((w * h) / 2000);

    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.2 + 0.5,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1,
                alpha: Math.random() * 0.5 + 0.5
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        for (let star of stars) {
            // Parallax effect
            let dx = (star.x - mouse.x) * 0.002;
            let dy = (star.y - mouse.y) * 0.002;
            ctx.beginPath();
            ctx.arc(star.x + dx, star.y + dy, star.r, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(200,255,255,${star.alpha})`;
            ctx.shadowColor = '#00faff';
            ctx.shadowBlur = 8;
            ctx.fill();
        }
    }

    function animate() {
        for (let star of stars) {
            star.x += star.vx;
            star.y += star.vy;
            if (star.x < 0 || star.x > w) star.vx *= -1;
            if (star.y < 0 || star.y > h) star.vy *= -1;
        }
        draw();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    canvas.addEventListener('touchmove', e => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    });
    resize();
    animate();
}

// Ensure main content and footer are displayed properly
const enterBtn = document.getElementById('enter-btn');
if (enterBtn) {
    enterBtn.addEventListener('click', () => {
        console.log('Enter button clicked');
        const landing = document.getElementById('landing');
        const mainContent = document.getElementById('main-content');
        const footer = document.querySelector('footer');

        if (landing && mainContent && footer) {
            landing.style.display = 'none';
            mainContent.style.display = 'block'; // Ensure block display
            footer.style.display = 'block'; // Ensure block display
            console.log('Landing hidden, main content and footer displayed');
        } else {
            console.error('One or more elements not found');
        }
    });
} else {
    console.error('Enter button not found');
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(51, 51, 51, 0.9)';
    } else {
        header.style.background = '#333';
    }
});
