// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize ke semua functions
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initParticles();
    initTypingAnimation();
    initFloatingAnimation();
    createScrollToTopButton();
    initCounterAnimations();
});

// Navigasi functions
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // button hamburger
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // tutup menu saat link di klik
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // navbar efek scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Aktiv link highilight
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// scroll animasi
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                
                // animasi buat beda element
                if (entry.target.classList.contains('home-text')) {
                    animateHomeText();
                }
                if (entry.target.classList.contains('skill-card')) {
                    animateSkillCard(entry.target);
                }
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);

    // element yang di observe
    const animatedElements = document.querySelectorAll('.home-text, .about-content, .skill-card, .project-card, .timeline-item, .contact-content');
    animatedElements.forEach(el => observer.observe(el));
}

// text animasi di home section
function animateHomeText() {
    const homeText = document.querySelector('.home-text');
    const elements = homeText.querySelectorAll('h1, h2, p, .social-links');
    
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = `slideInLeft 0.8s ease ${index * 0.2}s forwards`;
        }, index * 100);
    });
}

// skil kartu animasi
function animateSkillCard(card) {
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
        
        // animasi progress bar
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
            const width = progressBar.getAttribute('data-width');
            setTimeout(() => {
                progressBar.style.width = width;
            }, 500);
        }
    }, 200);
}

// projek kartu animasi
function animateProjectCard(card) {
    card.style.animation = 'fadeInUp 0.6s ease forwards';
    
    // tambah efek hover
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px) scale(1)';
    });
}

// timeline animasi
function animateTimelineItem(item) {
    if (item.classList.contains('left')) {
        item.style.animation = 'slideInLeft 0.8s ease forwards';
    } else {
        item.style.animation = 'slideInRight 0.8s ease forwards';
    }
}

// Skill bar animasi
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 500);
            }
        });
    });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// form kontak
function initContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // form input fokus efek
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // cek jika sudah ada isi
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // form submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // tunjukin loading animasi
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with EmailJS)
        setTimeout(() => {
            // Sukses animasi
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
            
            // reset form
            form.reset();
            inputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
            
            // Reset buton setelah delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'linear-gradient(45deg, #64ffda, #a8edea)';
                submitBtn.disabled = false;
            }, 3000);
            
            // tunjukin message sukses
            showNotification('Message sent successfully!', 'success');
        }, 2000);
    });
}

// notifikasi system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // tambah style
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'linear-gradient(45deg, #00ff88, #00cc66)' : 'linear-gradient(45deg, #64ffda, #a8edea)',
        color: '#0a0a23',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animasi masuk
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animasi keluar dan masuk
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// partikel terbang
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    Object.assign(particlesContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '-1'
    });
    
    document.body.appendChild(particlesContainer);
    
    // buat partikel
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    
    Object.assign(particle.style, {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        background: `rgba(100, 255, 218, ${Math.random() * 0.5 + 0.1})`,
        borderRadius: '50%',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animation: `floatParticle ${Math.random() * 10 + 10}s infinite linear`
    });
    
    container.appendChild(particle);
    
    // ilangin dan buat ulang
    setTimeout(() => {
        if (container.contains(particle)) {
            container.removeChild(particle);
            createParticle(container);
        }
    }, (Math.random() * 10 + 10) * 1000);
}

// tambah keyframes untuk particle
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-10vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// typing animasi di home section
function initTypingAnimation() {
    const typingElement = document.querySelector('.home-text h2');
    if (!typingElement) return;
    
    const originalText = typingElement.textContent;
    const texts = [originalText, 'Front End Developer', 'UI/UX Designer', 'Web Developer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause di akhir
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause sebelum mulai ngetik lagi
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // mulai ketik saat load
    setTimeout(typeText, 2000);
}

// animasi terbang di profile pic
function initFloatingAnimation() {
    const profilePic = document.querySelector('.profile-pic');
    if (!profilePic) return;
    
    profilePic.style.animation = 'float 3s ease-in-out infinite';
    
    // tambah efek gerak mouse
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        profilePic.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// skrol ke atas
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    
    Object.assign(scrollBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        background: 'linear-gradient(45deg, #64ffda, #a8edea)',
        color: '#0a0a23',
        fontSize: '1.2rem',
        cursor: 'pointer',
        zIndex: '1000',
        opacity: '0',
        transform: 'scale(0)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(100, 255, 218, 0.3)'
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // muncul atau sembunyi saat scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'scale(1)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'scale(0)';
        }
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(100, 255, 218, 0.5)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(100, 255, 218, 0.3)';
    });
    
    document.body.appendChild(scrollBtn);
}

// counter animasi
function initCounterAnimations() {
    const counters = [
        { element: null, target: 6, suffix: '+', label: 'Projects Completed' },
        { element: null, target: 4, suffix: '+', label: 'Months Experience' },
        { element: null, target: 24, suffix: '/7', label: 'Support Available' }
    ];
    
    // tambah counter ke tentang saya section
    const aboutSection = document.querySelector('.about-content');
    if (aboutSection) {
        const counterContainer = document.createElement('div');
        counterContainer.className = 'counter-container';
        Object.assign(counterContainer.style, {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
        });
        
        counters.forEach((counter, index) => {
            const counterElement = document.createElement('div');
            counterElement.className = 'counter-item';
            counterElement.innerHTML = `
                <div class="counter-number">0${counter.suffix}</div>
                <div class="counter-label">${counter.label}</div>
            `;
            
            Object.assign(counterElement.style, {
                textAlign: 'center',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(100, 255, 218, 0.1)'
            });
            
            const numberElement = counterElement.querySelector('.counter-number');
            Object.assign(numberElement.style, {
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#64ffda',
                marginBottom: '0.5rem'
            });
            
            const labelElement = counterElement.querySelector('.counter-label');
            Object.assign(labelElement.style, {
                fontSize: '0.9rem',
                opacity: '0.8'
            });
            
            counter.element = numberElement;
            counterContainer.appendChild(counterElement);
        });
        
        aboutSection.appendChild(counterContainer);
        
        // animasi saat scroll ke counter
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        animateCounter(counter.element, counter.target, counter.suffix);
                    });
                }
            });
        });
        
        counterObserver.observe(counterContainer);
    }
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 40);
}

// Cursor efek
function initCursorEffects() {
    // cursor buat dekstop
    if (window.innerWidth > 768) {
        createCursorTrail();
    }
}

function createCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    // buat dot trail
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        Object.assign(dot.style, {
            position: 'fixed',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: `rgba(100, 255, 218, ${(trailLength - i) / trailLength * 0.5})`,
            pointerEvents: 'none',
            zIndex: '9999',
            transition: 'all 0.1s ease'
        });
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = mouseX - 4 + 'px';
                dot.style.top = mouseY - 4 + 'px';
            }, index * 50);
        });
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// biar smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// social link animasi
document.querySelectorAll('.social-link, .social-link-contact').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(1.2) rotate(360deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.animation = 'bounce 2s infinite';
        this.style.transform = 'scale(1)';
    });
});

// projek kartu 3D efek
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// tambah loading screen
window.addEventListener('load', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="width: 50px; height: 50px; border: 3px solid rgba(100, 255, 218, 0.3); border-top: 3px solid #64ffda; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 1rem; color: #64ffda;">Loading...</p>
        </div>
    `;
    
    Object.assign(loadingScreen.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0a0a23 0%, #1a1a3e 50%, #000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000',
        transition: 'opacity 0.5s ease'
    });
    
    // tambah animasi spin
    const spinStyles = document.createElement('style');
    spinStyles.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyles);
    
    document.body.appendChild(loadingScreen);
    
    // sembunyikan loading screen setelah load
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(loadingScreen)) {
                document.body.removeChild(loadingScreen);
            }
        }, 500);
    }, 1500);
});

// EmailJS
function initEmailJS() {
    emailjs.init("Qe0adz3QxQZKR9hAx");
    
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        emailjs.sendForm('service_d2h6l4k', 'template_139umo5', this)
            .then(function() {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
                form.reset();
                showNotification('Message sent successfully!', 'success');
            })
            .catch(function(error) {
                console.error('EmailJS error:', error);
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to send';
                submitBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ff5252)';
                showNotification('Failed to send message. Please try again.', 'error');
            })
            .finally(function() {
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = 'linear-gradient(45deg, #64ffda, #a8edea)';
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
}

// Console message for developers
console.log(`
🚀 Selamat datang di portofolio saya
📧 Contact: nandiodifanusantarawk@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/nandio-difanusantara-82949a381/
🐙 GitHub: https://github.com/NandioWK

Built with ❤️ using HTML, CSS, and JavaScript
`);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});