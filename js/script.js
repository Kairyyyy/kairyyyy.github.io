// script.js - Clean version with typing animation including cursor
document.addEventListener('DOMContentLoaded', () => {
    // ---------- THEME MANAGEMENT ----------
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    const getCurrentTheme = () => {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    let currentTheme = getCurrentTheme();
    
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('portfolio-theme', theme);
    };
    
    applyTheme(currentTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        currentTheme = newTheme;
        applyTheme(currentTheme);
    });
    
    // ---------- PROFILE IMAGE HANDLING ----------
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            if (!parent.querySelector('.fallback-user')) {
                const fallbackDiv = document.createElement('div');
                fallbackDiv.style.cssText = `
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #2563eb, #1e40af);
                    color: white;
                    font-size: 3.5rem;
                `;
                fallbackDiv.innerHTML = '<i class="fas fa-user-circle"></i>';
                fallbackDiv.className = 'fallback-user';
                parent.appendChild(fallbackDiv);
            }
        });
        
        if (!profileImg.src || profileImg.src.includes('null')) {
            profileImg.src = 'https://ui-avatars.com/api/?background=2563eb&color=fff&bold=true&size=300&name=Kairy+Ken';
        }
    }
    
    // ---------- MOBILE NAVIGATION ----------
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // ---------- INITIALIZE EMAILJS ----------
    emailjs.init('D7vkLWtydyz-mfrO5');
    
    // ---------- CONTACT FORM ----------
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const sendBtn = document.getElementById('sendBtn');
            const originalText = sendBtn.innerHTML;
            sendBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
            sendBtn.disabled = true;
            
            const userEmail = document.getElementById('userEmail').value;
            const userSubject = document.getElementById('userSubject').value;
            const userMessage = document.getElementById('userMessage').value;
            
            const serviceID = 'service_juqps7v';
            const templateID = 'template_7rjf1tk';
            
            const templateParams = {
                from_email: userEmail,
                subject: userSubject,
                message: userMessage,
                to_email: 'kairykenm@gmail.com'
            };
            
            emailjs.send(serviceID, templateID, templateParams)
                .then(function(response) {
                    formStatus.innerHTML = '<span style="color: #10b981;">✓ Message sent successfully! I\'ll get back to you soon.</span>';
                    contactForm.reset();
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 5000);
                })
                .catch(function(error) {
                    console.error('Email error:', error);
                    formStatus.innerHTML = '<span style="color: #ef4444;">❌ Failed to send. Please email me directly at kairykenm@gmail.com</span>';
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 5000);
                })
                .finally(() => {
                    sendBtn.innerHTML = originalText;
                    sendBtn.disabled = false;
                });
        });
    }
    
    // ---------- SMOOTH SCROLLING ----------
    document.querySelectorAll('.nav-link, .btn-primary, .btn-outline').forEach(anchor => {
        if (anchor.getAttribute('href') && anchor.getAttribute('href').startsWith('#')) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    const targetElem = document.querySelector(targetId);
                    if (targetElem) {
                        e.preventDefault();
                        targetElem.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        }
    });
    
    // ---------- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ----------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    document.querySelectorAll('.skill-category, .project-card, .about-container').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Update footer year
    const footerPara = document.querySelector('.footer p');
    if (footerPara) {
        const currentYear = new Date().getFullYear();
        footerPara.innerHTML = footerPara.innerHTML.replace('2026', currentYear);
    }
    
    console.log('Portfolio ready!');
});

// ========== PARTICLE BACKGROUND EFFECT ==========
function createParticles() {
    const existingParticles = document.querySelector('.particles');
    if (existingParticles) {
        existingParticles.remove();
    }
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.insertBefore(particlesContainer, document.body.firstChild);
    
    const particleCount = window.innerWidth < 1024 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 12 + 8}s`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
    if ((lastWidth >= 768 && window.innerWidth < 768) || 
        (lastWidth < 768 && window.innerWidth >= 768)) {
        createParticles();
        lastWidth = window.innerWidth;
    }
});

// ========== TYPING ANIMATION WITH CURSOR INCLUDED IN THE TEXT ==========
const roles = ["Web Developer", "Game Developer", "IT Support Specialist"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;
const typedRoleElement = document.getElementById('typedRole');

function typeEffect() {
    if (!typedRoleElement) return;
    if (isPaused) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        // Delete characters one by one (slower delete)
        if (charIndex > 0) {
            charIndex--;
            typedRoleElement.innerHTML = currentRole.substring(0, charIndex) + '<span class="typed-cursor">|</span>';
            setTimeout(typeEffect, 50); // Slower delete speed
        } else {
            // Finished deleting, move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 300);
        }
    } else {
        // Type characters one by one (slower typing)
        if (charIndex < currentRole.length) {
            charIndex++;
            typedRoleElement.innerHTML = currentRole.substring(0, charIndex) + '<span class="typed-cursor">|</span>';
            setTimeout(typeEffect, 150); // Slower typing speed (was 70, now 120)
        } else {
            // Finished typing, remove cursor then pause and delete
            typedRoleElement.innerHTML = currentRole;
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                typeEffect();
            }, 1500);
        }
    }
}

// Start the typing effect
if (typedRoleElement) {
    typedRoleElement.innerHTML = '<span class="typed-cursor">|</span>';
    setTimeout(typeEffect, 500);
}

// ========== IMAGE SLIDESHOW WITH ENHANCED PULSE WAVE (5 seconds) ==========
const images = [
    'images/pic1.png',
    'images/pic2.png', 
    'images/pic3.png'
];
let currentImageIndex = 0;
let isTransitioning = false;
let slideshowInterval = null;
const profileImg = document.getElementById('profileImg');
const profilePlaceholder = document.querySelector('.profile-pic-placeholder');

// Create pulse ring element
let pulseRing = document.querySelector('.pulse-ring');
if (!pulseRing && profilePlaceholder) {
    pulseRing = document.createElement('div');
    pulseRing.className = 'pulse-ring';
    profilePlaceholder.appendChild(pulseRing);
}

// Preload images
const preloadedImages = [];
function preloadImages() {
    images.forEach((src, index) => {
        const img = new Image();
        img.onload = () => {
            preloadedImages[index] = img;
        };
        img.src = src;
    });
}

// Show enhanced pulse wave effect before transition
function showPulseEffect() {
    if (!pulseRing) return;
    
    // Remove active class and force reflow
    pulseRing.classList.remove('active');
    void pulseRing.offsetWidth;
    
    // Add active class to start animation
    pulseRing.classList.add('active');
    
    // Add ripple effect to container
    profilePlaceholder.classList.add('ripple-effect');
    setTimeout(() => {
        profilePlaceholder.classList.remove('ripple-effect');
    }, 800);
    
    // Add glow effect to image
    profileImg.classList.add('pulse-glow');
    setTimeout(() => {
        profileImg.classList.remove('pulse-glow');
    }, 600);
    
    // Add shine effect
    profileImg.classList.add('shine-effect');
    setTimeout(() => {
        profileImg.classList.remove('shine-effect');
    }, 800);
}

function changeImage() {
    if (!profileImg || isTransitioning) return;
    
    // Show the enhanced pulse wave effect
    showPulseEffect();
    
    // Wait for the pulse effect to complete before changing image
    setTimeout(() => {
        isTransitioning = true;
        
        // Add fade out effect
        profileImg.style.opacity = '0';
        
        setTimeout(() => {
            // Change to next image
            currentImageIndex = (currentImageIndex + 1) % images.length;
            
            // Use preloaded image if available
            if (preloadedImages[currentImageIndex]) {
                profileImg.src = preloadedImages[currentImageIndex].src;
            } else {
                profileImg.src = images[currentImageIndex];
            }
            
            // Ensure the image maintains its shape
            profileImg.style.borderRadius = '38% 62% 63% 37% / 41% 44% 56% 59%';
            profileImg.style.objectFit = 'cover';
            profileImg.style.width = '100%';
            profileImg.style.height = '100%';
            
            // Add fade in effect
            profileImg.style.opacity = '1';
            
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }, 500);
    }, 400);
}

// Start the slideshow if the image exists
if (profileImg && profilePlaceholder) {
    preloadImages();
    
    // Set initial image
    profileImg.src = images[0];
    profileImg.style.transition = 'opacity 0.5s ease-in-out';
    profileImg.style.opacity = '1';
    profileImg.style.borderRadius = '38% 62% 63% 37% / 41% 44% 56% 59%';
    profileImg.style.objectFit = 'cover';
    profileImg.style.width = '100%';
    profileImg.style.height = '100%';
    profileImg.style.display = 'block';
    
    // Change image every 5 seconds
    slideshowInterval = setInterval(changeImage, 5000);
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
});

// Debounce resize events for better performance
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if ((lastWidth >= 768 && window.innerWidth < 768) || 
            (lastWidth < 768 && window.innerWidth >= 768)) {
            createParticles();
            lastWidth = window.innerWidth;
        }
    }, 250);
});