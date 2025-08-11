document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Evelynn Bot Website Loaded');
    initNavigation();
    initCounterAnimations();
    initTabSwitching();
    initScrollEffects();
    initSmoothScrolling();
    initInteractiveElements();
});

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger animation
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// Animated counters for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter, .stat-number[data-target]');
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            // Format the display value
            if (target < 1) {
                element.textContent = current.toFixed(1);
            } else if (target >= 1000) {
                element.textContent = Math.floor(current).toLocaleString();
            } else {
                element.textContent = Math.floor(current);
            }
            requestAnimationFrame(updateCounter);
        } else {
            // Final value
            if (target < 1) {
                element.textContent = target.toFixed(1);
            } else if (target >= 1000) {
                element.textContent = target.toLocaleString();
            } else {
                element.textContent = target;
            }
        }
    };
    
    requestAnimationFrame(updateCounter);
}

// Tab switching functionality for commands section
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Add entrance animation
                targetContent.style.animation = 'none';
                setTimeout(() => {
                    targetContent.style.animation = 'fadeIn 0.5s ease';
                }, 10);
            }
        });
    });
}

// Scroll effects for navbar and elements
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class to navbar
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // Clear timeout and set new one
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            navbar.style.transform = 'translateY(0)';
        }, 1000);
    });

    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-bg-animation');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Interactive elements and additional features
function initInteractiveElements() {
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px) scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Add loading states for external links
    const externalButtons = document.querySelectorAll('a[href^="http"], a[href^="#invite"]');
    externalButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('loading')) {
                button.classList.add('loading');
                const originalText = button.textContent;
                button.textContent = 'Loading...';
                
                setTimeout(() => {
                    button.classList.remove('loading');
                    button.textContent = originalText;
                }, 2000);
            }
        });
    });

    // Ultra-smooth floating animation for avatar container
    const masterContainer = document.querySelector('.master-float-container');
    if (masterContainer) {
        let startTime = null;
        
        function smoothFloat(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            
            // Sine wave calculation for perfect smoothness
            const cycle = 4000; // 4 second cycle
            const progress = (elapsed % cycle) / cycle;
            const yOffset = Math.sin(progress * Math.PI * 2) * -12;
            
            masterContainer.style.transform = `translate3d(0, ${yOffset}px, 0)`;
            requestAnimationFrame(smoothFloat);
        }
        
        requestAnimationFrame(smoothFloat);
    }

    // 3D Orbiting animation for feature orbs
    const featureOrbs = document.querySelectorAll('.feature-orb');
    if (featureOrbs.length > 0) {
        let orbitStartTime = null;
        
        function orbit3D(timestamp) {
            if (!orbitStartTime) orbitStartTime = timestamp;
            const elapsed = timestamp - orbitStartTime;
            
            featureOrbs.forEach((orb, index) => {
                const orbCycle = 12000; // 12 second cycle
                const delayOffset = (index * orbCycle) / featureOrbs.length;
                const adjustedTime = elapsed + delayOffset;
                const progress = (adjustedTime % orbCycle) / orbCycle;
                const angle = progress * Math.PI * 2;
                
                // Calculate 3D position
                const radius = 220;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                
                // Calculate depth-based effects
                const normalizedZ = (z + radius) / (radius * 2); // 0 to 1
                const scale = 0.6 + (normalizedZ * 0.4); // Scale from 0.6 to 1.0
                const opacity = 0.2 + (normalizedZ * 0.8); // Opacity from 0.2 to 1.0
                const blur = (1 - normalizedZ) * 3; // Blur from 3px to 0px
                const brightness = 0.4 + (normalizedZ * 0.6); // Brightness from 0.4 to 1.0
                
                // Apply 3D transform and effects
                orb.style.transform = `translate3d(${x}px, 0, ${z}px) scale(${scale})`;
                orb.style.opacity = opacity;
                orb.style.filter = `blur(${blur}px) brightness(${brightness})`;
                orb.style.zIndex = Math.floor(normalizedZ * 20) - 10; // Z-index from -10 to 10
            });
            
            requestAnimationFrame(orbit3D);
        }
        
        requestAnimationFrame(orbit3D);
    }

    // Dynamic typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        let index = 0;
        heroTitle.innerHTML = '';
        
        function typeWriter() {
            if (index < originalText.length) {
                heroTitle.innerHTML = originalText.slice(0, index + 1);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Utility functions
function throttle(func, wait) {
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

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .loading {
        opacity: 0.7;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Log successful initialization
console.log('✨ All website features initialized successfully!');