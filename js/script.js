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
                icon.style.transition = 'transform 0.3s ease';
                icon.style.transform = 'rotate(90deg)';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                icon.style.transform = 'rotate(0deg)';
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    icon.style.transform = 'rotate(0deg)';
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
    
    // ========== TYPING ANIMATION ==========
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
            if (charIndex > 0) {
                charIndex--;
                typedRoleElement.innerHTML = currentRole.substring(0, charIndex) + '<span class="typed-cursor">|</span>';
                setTimeout(typeEffect, 50);
            } else {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, 300);
            }
        } else {
            if (charIndex < currentRole.length) {
                charIndex++;
                typedRoleElement.innerHTML = currentRole.substring(0, charIndex) + '<span class="typed-cursor">|</span>';
                setTimeout(typeEffect, 150);
            } else {
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
    
    if (typedRoleElement) {
        typedRoleElement.innerHTML = '<span class="typed-cursor">|</span>';
        setTimeout(typeEffect, 500);
    }
    
    // ========== IMAGE SLIDESHOW ==========
    const images = [
        'images/pic1.png',
        'images/pic2.png', 
        'images/pic3.png'
    ];
    let currentImageIndex = 0;
    let isTransitioning = false;
    let slideshowInterval = null;
    const profileImgSlide = document.getElementById('profileImg');
    const profilePlaceholder = document.querySelector('.profile-pic-placeholder');
    
    let pulseRing = document.querySelector('.pulse-ring');
    if (!pulseRing && profilePlaceholder) {
        pulseRing = document.createElement('div');
        pulseRing.className = 'pulse-ring';
        profilePlaceholder.appendChild(pulseRing);
    }
    
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
    
    function showPulseEffect() {
        if (!pulseRing) return;
        pulseRing.classList.remove('active');
        void pulseRing.offsetWidth;
        pulseRing.classList.add('active');
        
        if (profilePlaceholder) {
            profilePlaceholder.classList.add('ripple-effect');
            setTimeout(() => {
                profilePlaceholder.classList.remove('ripple-effect');
            }, 800);
        }
        
        if (profileImgSlide) {
            profileImgSlide.classList.add('pulse-glow');
            setTimeout(() => {
                profileImgSlide.classList.remove('pulse-glow');
            }, 600);
            
            profileImgSlide.classList.add('shine-effect');
            setTimeout(() => {
                profileImgSlide.classList.remove('shine-effect');
            }, 800);
        }
    }
    
    function changeImage() {
        if (!profileImgSlide || isTransitioning) return;
        showPulseEffect();
        
        setTimeout(() => {
            isTransitioning = true;
            profileImgSlide.style.opacity = '0';
            
            setTimeout(() => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                if (preloadedImages[currentImageIndex]) {
                    profileImgSlide.src = preloadedImages[currentImageIndex].src;
                } else {
                    profileImgSlide.src = images[currentImageIndex];
                }
                profileImgSlide.style.opacity = '1';
                
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }, 500);
        }, 400);
    }
    
    if (profileImgSlide && profilePlaceholder) {
        preloadImages();
        profileImgSlide.src = images[0];
        profileImgSlide.style.transition = 'opacity 0.5s ease-in-out';
        profileImgSlide.style.opacity = '1';
        slideshowInterval = setInterval(changeImage, 5000);
    }
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
    });
    
    // ========== CERTIFICATE LIGHTBOX FUNCTIONALITY ==========
    function initLightbox() {
        // Create modal elements if they don't exist
        let modal = document.getElementById('lightbox-modal');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'lightbox-modal';
            modal.className = 'lightbox-modal';
            modal.innerHTML = `
                <span class="close-lightbox">&times;</span>
                <img class="lightbox-content" id="lightbox-img">
                <div class="lightbox-caption" id="lightbox-caption"></div>
            `;
            document.body.appendChild(modal);
        }
        
        const modalImg = document.getElementById('lightbox-img');
        const captionText = document.getElementById('lightbox-caption');
        const closeBtn = modal.querySelector('.close-lightbox');
        
        // Get all certificate images
        const certImages = document.querySelectorAll('.certificate-image');
        
        certImages.forEach(container => {
            // Remove existing listeners to avoid duplicates
            container.removeEventListener('click', lightboxClickHandler);
            // Add click listener
            container.addEventListener('click', lightboxClickHandler);
            
            function lightboxClickHandler(e) {
                const img = container.querySelector('img');
                if (img && img.src) {
                    modal.classList.add('show');
                    modalImg.src = img.src;
                    modalImg.alt = img.alt || 'Certificate Image';
                    captionText.textContent = img.alt || 'Certificate Image';
                    
                    // Prevent body scroll when modal is open
                    document.body.style.overflow = 'hidden';
                }
            }
        });
        
        // Close modal function
        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            setTimeout(() => {
                modalImg.src = '';
            }, 300);
        }
        
        // Close button click
        if (closeBtn) {
            closeBtn.removeEventListener('click', closeModal);
            closeBtn.addEventListener('click', closeModal);
        }
        
        // Close when clicking outside the image
        modal.removeEventListener('click', modalOutsideClick);
        modal.addEventListener('click', modalOutsideClick);
        
        function modalOutsideClick(e) {
            if (e.target === modal) {
                closeModal();
            }
        }
        
        // Close with Escape key
        document.removeEventListener('keydown', escapeKeyHandler);
        document.addEventListener('keydown', escapeKeyHandler);
        
        function escapeKeyHandler(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        }
    }
    
    // Initialize lightbox
    initLightbox();
    
    // Re-initialize lightbox if new certificates are added dynamically (optional)
    // For mutation observer to watch for dynamically added certificate images
    const observerLightbox = new MutationObserver(() => {
        initLightbox();
    });
    
    observerLightbox.observe(document.body, {
        childList: true,
        subtree: true
    });
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