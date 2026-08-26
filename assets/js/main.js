// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    })
);

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('revealed'), (i % 4) * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

// Animated stat counters
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (!isNaN(target)) {
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 30));
            const tick = () => {
                current = Math.min(current + step, target);
                el.textContent = current;
                if (current < target) requestAnimationFrame(tick);
            };
            tick();
        }
        countObserver.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-count]').forEach(el => countObserver.observe(el));
