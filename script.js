const navLinks = document.querySelectorAll('.nav-links a');
const navToggle = document.querySelector('.nav-toggle');
const mobileNavBreakpoint = window.matchMedia('(max-width: 960px)');
const finePointer = window.matchMedia('(pointer: fine)').matches;
const sections = Array.from(document.querySelectorAll('section'));
const navbar = document.querySelector('.navbar');

function setActiveNavLink(targetId) {
    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${targetId}` ? '#58a6ff' : '#8b949e';
    });
}

function setMobileNavState(isOpen) {
    document.body.classList.toggle('nav-open', isOpen);

    if (navToggle) {
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    }
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = document.body.classList.contains('nav-open');
        setMobileNavState(!isOpen);
    });
}

mobileNavBreakpoint.addEventListener('change', event => {
    if (!event.matches) {
        setMobileNavState(false);
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        setMobileNavState(false);
    }
});

// ============== Smooth Navigation ==============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const isServicesDownButton =
            this.classList.contains('section-scroll') &&
            !this.classList.contains('section-scroll-up') &&
            this.closest('#services');
        const targetSelector = isServicesDownButton ? '#tech-stack' : this.getAttribute('href');
        const target = document.querySelector(targetSelector);

        if (target) {
            if (this.matches('.nav-links a')) {
                setActiveNavLink(target.id);
            }
            if (mobileNavBreakpoint.matches) {
                setMobileNavState(false);
            }
            if (targetSelector === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ============== Page Ready ==============
document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('page-ready');
});

// ============== Active Navigation Link ==============
function updateScrollState() {
    const activationLine = window.innerHeight * 0.32;

    const activeSection =
        sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= activationLine && rect.bottom > activationLine;
        }) || sections[0];

    if (activeSection) {
        setActiveNavLink(activeSection.id);
    }
    if (navbar) {
        navbar.classList.toggle('is-scrolled', window.scrollY > 50);
    }
}

let scrollTicking = false;
function handleScroll() {
    if (scrollTicking) return;
    scrollTicking = true;

    window.requestAnimationFrame(() => {
        updateScrollState();
        scrollTicking = false;
    });
}

window.addEventListener('scroll', handleScroll, { passive: true });
updateScrollState();

// ============== Contact Form Handling ==============
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const subjectInput = this.querySelector('input[name="subject"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const statusText = this.querySelector('.form-status');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            function setStatus(messageText, type = '') {
                if (!statusText) return;
                statusText.textContent = messageText;
                statusText.className = 'form-status';

                if (type) {
                    statusText.classList.add(`is-${type}`);
                }
            }

            if (!name) {
                setStatus('Please enter your name.', 'error');
                nameInput?.focus();
                return;
            }
            if (!email) {
                setStatus('Please enter your email.', 'error');
                emailInput?.focus();
                return;
            }
            if (!subject) {
                setStatus('Please enter a project title.', 'error');
                subjectInput?.focus();
                return;
            }
            if (!message) {
                setStatus('Please enter your message.', 'error');
                messageInput?.focus();
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setStatus('Please enter a valid email address.', 'error');
                emailInput?.focus();
                return;
            }

            try {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                setStatus('Sending your message...', '');

                await sendContactMessage(name, email, subject, message);

                setStatus(`Thank you ${name}! Your message has been sent successfully.`, 'success');
                this.reset();
                nameInput.focus();

                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            } catch (error) {
                setStatus(`Error sending message: ${error.message}`, 'error');
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }
        });
    }
});

// ============== CTA Button Navigation ==============
const ctaButtons = document.querySelectorAll('.cta-button.primary');
ctaButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
});

// ============== Scroll Reveal System ==============
const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: '0px 0px -80px 0px'
    }
);

const revealSelectors = [
    '.section-header',
    '.project-card',
    '.testimonial-card',
    '.timeline-item',
    '.proficiency-item',
    '.tech-category',
    '.about-profile-circle',
    '.contact-form',
    '.contact-info',
    '.footer-section'
];

revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add('reveal');

        if (element.matches('.project-card:nth-child(odd), .timeline-item:nth-child(odd), .footer-section:nth-child(odd)')) {
            element.classList.add('reveal-left');
        } else if (element.matches('.project-card:nth-child(even), .timeline-item:nth-child(even), .footer-section:nth-child(even)')) {
            element.classList.add('reveal-right');
        }

        element.style.setProperty('--reveal-delay', `${Math.min(index * 0.08, 0.28)}s`);
        revealObserver.observe(element);
    });
});

// ============== Number Counter Animation ==============
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = `${target}%`;
            clearInterval(counter);
        } else {
            element.textContent = `${Math.floor(current)}%`;
        }
    }, 16);
}

const proficiencyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const progressBar = entry.target.querySelector('.progress');
            const percentage = entry.target.querySelector('.percentage');
            if (progressBar && percentage) {
                const targetWidth = progressBar.style.width;
                const targetValue = parseInt(targetWidth, 10);

                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s ease-in-out';
                    progressBar.style.width = targetWidth;
                    animateCounter(percentage, targetValue);
                }, 120);

                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.45 });

document.querySelectorAll('.proficiency-item').forEach(item => {
    proficiencyObserver.observe(item);
});

// ============== Pull Effect on Tech Stack Pills ==============
const techPills = document.querySelectorAll('.tech-pill');
if (finePointer) {
    techPills.forEach(pill => {
        const resetPill = () => {
            pill.style.setProperty('--tech-pull-x', '0px');
            pill.style.setProperty('--tech-pull-y', '0px');
        };

        pill.addEventListener('pointermove', event => {
            const rect = pill.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const maxPull = 10;
            const pullX = Math.max(-maxPull, Math.min(maxPull, (event.clientX - centerX) * 0.16));
            const pullY = Math.max(-maxPull, Math.min(maxPull, (event.clientY - centerY) * 0.16));

            pill.style.setProperty('--tech-pull-x', `${pullX}px`);
            pill.style.setProperty('--tech-pull-y', `${pullY}px`);
        });

        pill.addEventListener('pointerleave', resetPill);
        pill.addEventListener('pointerup', resetPill);
        pill.addEventListener('pointercancel', resetPill);
    });
}

// ============== Pull Effect on Tech Logos ==============
const techTags = document.querySelectorAll('.tech-tag');
if (finePointer) {
    techTags.forEach(tag => {
        const logo = tag.querySelector('img');
        if (!logo) return;

        const resetLogo = () => {
            tag.classList.remove('is-pulling');
            tag.style.setProperty('--logo-pull-x', '0px');
            tag.style.setProperty('--logo-pull-y', '0px');
            tag.style.setProperty('--logo-scale', '1');
        };

        logo.addEventListener('pointerdown', event => {
            event.preventDefault();
            logo.setPointerCapture(event.pointerId);
            tag.classList.add('is-pulling');
            tag.style.setProperty('--logo-scale', '1.14');
        });

        logo.addEventListener('pointermove', event => {
            if (!tag.classList.contains('is-pulling')) return;

            const rect = tag.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const maxPull = 16;

            const pullX = Math.max(-maxPull, Math.min(maxPull, (event.clientX - centerX) * 0.35));
            const pullY = Math.max(-maxPull, Math.min(maxPull, (event.clientY - centerY) * 0.35));

            tag.style.setProperty('--logo-pull-x', `${pullX}px`);
            tag.style.setProperty('--logo-pull-y', `${pullY}px`);
        });

        const releaseLogo = event => {
            if (logo.hasPointerCapture(event.pointerId)) {
                logo.releasePointerCapture(event.pointerId);
            }
            resetLogo();
        };

        logo.addEventListener('pointerup', releaseLogo);
        logo.addEventListener('pointercancel', releaseLogo);
        logo.addEventListener('lostpointercapture', resetLogo);
        tag.addEventListener('mouseleave', () => {
            if (!tag.classList.contains('is-pulling')) {
                resetLogo();
            }
        });
    });
}

// ============== Console Greeting ==============
console.log('%cWelcome to My Portfolio!', 'font-size: 18px; color: #58a6ff; font-weight: bold;');
console.log('%cFeel free to explore my work!', 'font-size: 14px; color: #79c0ff;');

// ============== Background Particles ==============
const particlesCanvas = document.getElementById('particles-bg');

if (particlesCanvas) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = particlesCanvas.getContext('2d');
    let particlesArray = [];
    let particleAnimationFrame = null;
    const particleCount = prefersReducedMotion ? 40 : 90;

    class Particle {
        constructor() {
            this.reset(true);
            this.size = Math.random() * 1.5 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.22;
            this.speedY = (Math.random() - 0.5) * 0.22;
        }

        reset(initial = false) {
            this.x = Math.random() * particlesCanvas.width;
            this.y = Math.random() * particlesCanvas.height;

            if (!initial) {
                this.size = Math.random() * 1.5 + 0.2;
            }
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > particlesCanvas.width) this.x = 0;
            if (this.x < 0) this.x = particlesCanvas.width;
            if (this.y > particlesCanvas.height) this.y = 0;
            if (this.y < 0) this.y = particlesCanvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function resizeParticlesCanvas() {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < particleCount; i += 1) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });

        particleAnimationFrame = window.requestAnimationFrame(animateParticles);
    }

    resizeParticlesCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        resizeParticlesCanvas();
        initParticles();
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (particleAnimationFrame) {
                window.cancelAnimationFrame(particleAnimationFrame);
                particleAnimationFrame = null;
            }
            return;
        }

        if (!particleAnimationFrame) {
            animateParticles();
        }
    });
}
