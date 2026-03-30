// ============== Smooth Navigation ============== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============== Active Navigation Link ============== 
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = '#8b949e';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#58a6ff';
        }
    });
});

// ============== Contact Form Handling ============== 
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
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
            
            // Validate fields
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
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setStatus('Please enter a valid email address.', 'error');
                emailInput?.focus();
                return;
            }
            
            try {
                // Show loading state
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                setStatus('Sending your message...', '');
                
                // Send to backend
                await sendContactMessage(name, email, subject, message);
                
                // Success
                setStatus(`Thank you ${name}! Your message has been sent successfully.`, 'success');
                this.reset();
                nameInput.focus();
                
                // Restore button
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
    btn.addEventListener('click', function() {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
});

// ============== Intersection Observer for Animations ============== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animations to cards and sections
const elementsToAnimate = document.querySelectorAll(
    '.project-card, .testimonial-card, .timeline-item, .proficiency-item, .tech-category, .about-profile-circle'
);

elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============== Parallax Effect on Hero ============== 
window.addEventListener('scroll', () => {
    const heroWrapper = document.querySelector('.hero-wrapper');
    if (heroWrapper) {
        const scrolled = window.pageYOffset;
        heroWrapper.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============== Number Counter Animation ============== 
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 16);
}

const proficiencyObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const progressBar = entry.target.querySelector('.progress');
            const percentage = entry.target.querySelector('.percentage');
            if (progressBar && percentage) {
                const targetWidth = progressBar.style.width;
                const targetValue = parseInt(targetWidth);
                
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s ease-in-out';
                    progressBar.style.width = targetWidth;
                    animateCounter(percentage, targetValue);
                }, 100);
                
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.proficiency-item').forEach(item => {
    proficiencyObserver.observe(item);
});

// ============== Hover Effect on Tech Tags ============== 
const techTags = document.querySelectorAll('.tech-tags span');
techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// ============== Project Card Hover ============== 
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(88, 166, 255, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 30px rgba(88, 166, 255, 0.15)';
    });
});

// ============== Scroll-based Navbar Background ============== 
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ============== Page Load Animation ============== 
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.animation = 'fadeInUp 0.8s ease-out forwards';
    
    // Log welcome message
    console.log('%c👋 Welcome to My Portfolio!', 'font-size: 18px; color: #58a6ff; font-weight: bold;');
    console.log('%cFeel free to explore my work!', 'font-size: 14px; color: #79c0ff;');
});

// ============== Add Fade-In Animation ============== 
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
