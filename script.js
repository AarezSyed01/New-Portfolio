// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeImageHandling();
    initializeSkillBars();
    initializeSmoothScrolling();
    initializeActiveNavigation();
    initializeParticles();
    initializeLazyLoading();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe all sections and animated elements
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    sections.forEach(section => observer.observe(section));
    animatedElements.forEach(element => observer.observe(element));

    // Add animation classes to elements
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('slide-in-left');
        } else {
            item.classList.add('slide-in-right');
        }
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.classList.add('scale-in');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Image handling and upload hints
function initializeImageHandling() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        const img = placeholder.querySelector('img');
        const hint = placeholder.querySelector('.image-upload-hint');
        
        // Handle image load errors
        if (img) {
            img.addEventListener('error', function() {
                this.style.display = 'none';
                if (hint) {
                    hint.style.opacity = '1';
                    hint.style.position = 'static';
                }
            });

            img.addEventListener('load', function() {
                if (hint && this.src.includes('placeholder')) {
                    hint.style.opacity = '0';
                    hint.style.position = 'absolute';
                }
            });
        }

        // Add click handler for future image upload functionality
        placeholder.addEventListener('click', function() {
            const imageType = this.dataset.image;
            console.log(`Image upload clicked for: ${imageType}`);
            // Future: Implement image upload functionality
            showImageUploadInstructions(imageType);
        });
    });
}

// Show image upload instructions
function showImageUploadInstructions(imageType) {
    const instructions = {
        profile: 'Upload a professional profile photo (400x400px recommended)',
        about: 'Upload a casual or professional photo for the about section (500x600px recommended)',
        project1: 'Upload a screenshot of the Study Companion App (600x400px recommended)',
        project2: 'Upload a screenshot of the Portfolio Website (600x400px recommended)',
        project3: 'Upload a screenshot of the Task Tracker app (600x400px recommended)'
    };

    const message = instructions[imageType] || 'Upload an image for this section';
    
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = 'upload-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-tertiary);
        border: 1px solid var(--primary-color);
        border-radius: var(--border-radius-lg);
        padding: var(--spacing-md);
        z-index: 10000;
        max-width: 300px;
        box-shadow: var(--shadow-lg);
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
        const progress = bar.dataset.progress;
        bar.style.width = '0%';
        bar.style.transition = 'width 0s';
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const progress = bar.dataset.progress;
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = progress + '%';
        }, index * 200);
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active navigation highlighting
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Particle effects for hero section
function initializeParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    
    if (!particlesContainer) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form enhanced interactions
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
}

// Scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: var(--bg-color);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        transition: var(--transition-normal);
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize scroll to top
createScrollToTop();

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce scroll events for better performance
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events that don't need immediate response
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes floatParticle {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        25% {
            transform: translateY(-20px) rotate(90deg);
        }
        50% {
            transform: translateY(0) rotate(180deg);
        }
        75% {
            transform: translateY(20px) rotate(270deg);
        }
        100% {
            transform: translateY(0) rotate(360deg);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        color: var(--text-color);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-color);
        cursor: pointer;
        font-size: 1.2rem;
        margin-left: auto;
        padding: 0;
        transition: var(--transition-fast);
    }
    
    .notification-close:hover {
        color: var(--primary-color);
    }
    
    .form-group.focused label {
        color: var(--primary-color);
        transform: translateY(-5px) scale(0.9);
    }
    
    .form-group.has-value label {
        transform: translateY(-5px) scale(0.9);
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .slide-in-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .slide-in-left.visible {
        opacity: 1;
        transform: translateX(0);
    }
    
    .slide-in-right {
        opacity: 0;
        transform: translateX(50px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .slide-in-right.visible {
        opacity: 1;
        transform: translateX(0);
    }
    
    .scale-in {
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .scale-in.visible {
        opacity: 1;
        transform: scale(1);
    }
`;

document.head.appendChild(style);

// Console welcome message
console.log(`
🚀 Welcome to Aarez Syed's Portfolio!
📧 Contact: aarez.syed@example.com
🔗 LinkedIn: linkedin.com/in/aarezsyed
💻 GitHub: github.com/aarezsyed

This portfolio is built with:
- HTML5 & CSS3
- Vanilla JavaScript
- Responsive Design
- Modern Animations
- Accessibility Features

Feel free to explore the code and reach out for collaborations!
`);