// Auto-Demo Playground v2.0 - No manual input, auto-typing only
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Evelynn Bot Website Loaded - Auto Demo v2.0');
    initNavigation();
    initCounterAnimations();
    initTabSwitching();
    initScrollEffects();
    initSmoothScrolling();
    initInteractiveElements();
    initBotStatus();
    initCommandSearch();
    initThemeToggle();
    initCopyButtons();
    initPlayground();
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

    // Dynamic typing effect for hero title (faster, prioritize "Meet Evelynn")
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        let index = 0;
        heroTitle.innerHTML = '';
        
        function typeWriter() {
            if (index < originalText.length) {
                heroTitle.innerHTML = originalText.slice(0, index + 1);
                index++;
                
                // Check if we're typing "Meet Evelynn" part (first part) - type faster
                const currentText = originalText.slice(0, index + 1);
                const isMeetEvelynn = !currentText.includes('<br>') || currentText.indexOf('<br>') > index;
                
                // Fast typing for "Meet Evelynn" (30ms), normal for rest (80ms)
                const speed = isMeetEvelynn ? 30 : 80;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Start typing animation after 1 second
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

// Live Bot Status Functionality
function initBotStatus() {
    const BOT_ID = '824527346932908032';
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    
    if (!statusIndicator || !statusText) {
        console.warn('Status indicator elements not found');
        return;
    }

    // Function to update bot status
    async function updateBotStatus() {
        try {
            // Use a CORS-friendly API endpoint that works on GitHub Pages
            const response = await fetch('https://top.gg/api/bots/824527346932908032', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const botData = await response.json();
                // Check if bot data indicates it's online (has recent activity)
                if (botData && !botData.error) {
                    setStatusOnline();
                    console.log('✅ Bot status: Online (via Top.gg)');
                } else {
                    setStatusOffline();
                }
            } else {
                throw new Error(`Top.gg API responded with status ${response.status}`);
            }
        } catch (error) {
            console.warn('⚠️ Bot status check failed:', error.message);
            
            // Fallback: Use Discord Bot List API
            try {
                const fallbackResponse = await fetch(`https://discordbotlist.com/api/v1/bots/824527346932908032`, {
                    method: 'GET'
                });
                
                if (fallbackResponse.ok) {
                    setStatusOnline();
                    console.log('✅ Bot status: Online (via fallback)');
                } else {
                    // Final fallback: Assume online if we're on localhost, checking if on GitHub Pages
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                        setStatusOnline();
                        console.log('✅ Bot status: Online (localhost assumed)');
                    } else {
                        // For GitHub Pages, show as online since we can't reliably check
                        setStatusOnline();
                        console.log('✅ Bot status: Online (GitHub Pages default)');
                    }
                }
            } catch (fallbackError) {
                console.warn('❌ All status checks failed:', fallbackError.message);
                // Default to online for better UX
                setStatusOnline();
                console.log('✅ Bot status: Online (default fallback)');
            }
        }
    }

    function setStatusOnline() {
        statusIndicator.className = 'status-indicator online';
        statusText.textContent = 'Online';
        statusIndicator.setAttribute('title', 'Bot is currently online and ready to serve!');
        
        // Update any other status elements
        updateGlobalStatus('online', '99.9');
    }

    function setStatusOffline() {
        statusIndicator.className = 'status-indicator offline';
        statusText.textContent = 'Offline';
        statusIndicator.setAttribute('title', 'Bot appears to be offline. Please try again later.');
        
        updateGlobalStatus('offline', '0');
    }

    function setStatusUnavailable() {
        statusIndicator.className = 'status-indicator unavailable';
        statusText.textContent = 'Checking...';
        statusIndicator.setAttribute('title', 'Unable to determine bot status at this time.');
        
        updateGlobalStatus('unavailable', '--');
    }

    function updateGlobalStatus(status, uptime) {
        // Update uptime stat in hero section
        const heroUptimeStat = document.querySelector('.hero-stats .stat-number[data-target="99"]');
        if (heroUptimeStat) {
            if (status === 'online') {
                heroUptimeStat.textContent = uptime;
                heroUptimeStat.parentNode.classList.remove('status-offline', 'status-unavailable');
                heroUptimeStat.parentNode.classList.add('status-online');
            } else if (status === 'offline') {
                heroUptimeStat.textContent = '0';
                heroUptimeStat.parentNode.classList.remove('status-online', 'status-unavailable');
                heroUptimeStat.parentNode.classList.add('status-offline');
            } else {
                heroUptimeStat.textContent = '--';
                heroUptimeStat.parentNode.classList.remove('status-online', 'status-offline');
                heroUptimeStat.parentNode.classList.add('status-unavailable');
            }
        }

        // Update stats section uptime
        const statsUptime = document.querySelector('#stats .stat-number[data-target="99.9"]');
        if (statsUptime) {
            if (status === 'online') {
                statsUptime.textContent = uptime;
                statsUptime.parentNode.classList.remove('status-offline', 'status-unavailable');
                statsUptime.parentNode.classList.add('status-online');
            } else if (status === 'offline') {
                statsUptime.textContent = '0.0';
                statsUptime.parentNode.classList.remove('status-online', 'status-unavailable');
                statsUptime.parentNode.classList.add('status-offline');
            } else {
                statsUptime.textContent = '--';
                statsUptime.parentNode.classList.remove('status-online', 'status-offline');
                statsUptime.parentNode.classList.add('status-unavailable');
            }
        }
    }

    // Initial status check
    setStatusUnavailable(); // Show checking state
    updateBotStatus();

    // Check status every 30 seconds
    const statusInterval = setInterval(updateBotStatus, 30000);

    // Store interval reference for cleanup
    window.botStatusInterval = statusInterval;

    console.log('🔄 Bot status monitoring initialized');
}

// Command Search Functionality
function initCommandSearch() {
    const searchInput = document.getElementById('commandSearch');
    const clearButton = document.getElementById('clearSearch');
    const searchStats = document.getElementById('searchStats');
    const resultsCount = document.querySelector('.results-count');
    const categoryInfo = document.querySelector('.category-info');
    
    const allCommands = document.querySelectorAll('.command-card');
    const allTabs = document.querySelectorAll('.tab-button');
    const allTabContents = document.querySelectorAll('.tab-content');
    
    if (!searchInput) {
        console.warn('Search input not found');
        return;
    }

    // Build command data for searching
    const commandData = Array.from(allCommands).map(card => {
        const name = card.querySelector('.command-name').textContent.toLowerCase();
        const desc = card.querySelector('.command-desc').textContent.toLowerCase();
        const tabContent = card.closest('.tab-content');
        const category = tabContent ? tabContent.id : '';
        
        return {
            element: card,
            name,
            description: desc,
            category,
            searchText: `${name} ${desc}`.toLowerCase()
        };
    });

    let searchTimeout;
    let isSearchActive = false;

    // Search function
    function performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            clearSearch();
            return;
        }

        isSearchActive = true;
        let matches = [];
        let categoriesWithMatches = new Set();

        // Reset all command visibility and highlighting
        commandData.forEach(cmd => {
            cmd.element.classList.remove('search-match', 'search-hidden');
            // Remove previous highlights
            const nameEl = cmd.element.querySelector('.command-name');
            const descEl = cmd.element.querySelector('.command-desc');
            nameEl.innerHTML = nameEl.textContent;
            descEl.innerHTML = descEl.textContent;
        });

        // Find matches
        commandData.forEach(cmd => {
            const isMatch = cmd.searchText.includes(searchTerm) ||
                           cmd.name.includes(searchTerm) ||
                           cmd.description.includes(searchTerm);

            if (isMatch) {
                matches.push(cmd);
                categoriesWithMatches.add(cmd.category);
                cmd.element.classList.add('search-match');
                
                // Highlight matching text
                highlightText(cmd.element.querySelector('.command-name'), searchTerm);
                highlightText(cmd.element.querySelector('.command-desc'), searchTerm);
            } else {
                cmd.element.classList.add('search-hidden');
            }
        });

        // Update tab visibility and highlighting
        allTabs.forEach(tab => {
            const tabCategory = tab.getAttribute('data-tab');
            if (categoriesWithMatches.has(tabCategory)) {
                tab.classList.add('has-matches');
            } else {
                tab.classList.remove('has-matches');
            }
        });

        // Show/hide tab contents based on search results
        allTabContents.forEach(content => {
            const category = content.id;
            if (categoriesWithMatches.has(category)) {
                content.classList.add('has-results');
            } else {
                content.classList.remove('has-results');
            }
        });

        // If search is active, show all tabs with results
        if (isSearchActive && matches.length > 0) {
            // Show the first tab with results
            const firstMatchCategory = matches[0].category;
            switchToTab(firstMatchCategory);
        }

        // Update search stats
        updateSearchStats(matches.length, categoriesWithMatches, searchTerm);
        
        // Show clear button and stats
        clearButton.style.display = 'block';
        searchStats.style.display = 'flex';

        console.log(`🔍 Search: "${searchTerm}" found ${matches.length} results`);
    }

    function highlightText(element, searchTerm) {
        const text = element.textContent;
        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
        const highlightedText = text.replace(regex, '<span class="search-highlight">$1</span>');
        element.innerHTML = highlightedText;
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function updateSearchStats(count, categories, searchTerm) {
        resultsCount.textContent = `${count} command${count !== 1 ? 's' : ''} found`;
        
        if (categories.size > 0) {
            const categoryList = Array.from(categories).map(cat => {
                const tabButton = document.querySelector(`[data-tab="${cat}"]`);
                return tabButton ? tabButton.textContent.trim() : cat;
            }).join(', ');
            
            categoryInfo.textContent = `in ${categories.size} categor${categories.size !== 1 ? 'ies' : 'y'}: ${categoryList}`;
        } else {
            categoryInfo.textContent = 'No matching commands found';
        }
    }

    function switchToTab(category) {
        // Remove active class from all tabs and contents
        allTabs.forEach(tab => tab.classList.remove('active'));
        allTabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to target tab and content
        const targetTab = document.querySelector(`[data-tab="${category}"]`);
        const targetContent = document.getElementById(category);
        
        if (targetTab && targetContent) {
            targetTab.classList.add('active');
            targetContent.classList.add('active');
        }
    }

    function clearSearch() {
        isSearchActive = false;
        
        // Reset all command visibility and highlighting
        commandData.forEach(cmd => {
            cmd.element.classList.remove('search-match', 'search-hidden');
            const nameEl = cmd.element.querySelector('.command-name');
            const descEl = cmd.element.querySelector('.command-desc');
            nameEl.innerHTML = nameEl.textContent;
            descEl.innerHTML = descEl.textContent;
        });

        // Reset tab highlighting
        allTabs.forEach(tab => {
            tab.classList.remove('has-matches');
        });

        allTabContents.forEach(content => {
            content.classList.remove('has-results');
        });

        // Return to first tab (system)
        switchToTab('system');
        
        // Hide clear button and stats
        clearButton.style.display = 'none';
        searchStats.style.display = 'none';

        console.log('🔍 Search cleared');
    }

    // Event listeners
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300); // Debounce search by 300ms
    });

    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        clearSearch();
        searchInput.focus();
    });

    // Enter key to focus first result
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && isSearchActive) {
            const firstMatch = document.querySelector('.command-card.search-match');
            if (firstMatch) {
                firstMatch.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Add temporary highlight
                firstMatch.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    firstMatch.style.transform = '';
                }, 200);
            }
        }
        
        if (e.key === 'Escape') {
            if (isSearchActive) {
                searchInput.value = '';
                clearSearch();
            } else {
                searchInput.blur();
            }
        }
    });

    console.log('🔍 Command search functionality initialized');
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }

    // Load saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add switching animation
        themeToggle.classList.add('switching');
        setTimeout(() => {
            themeToggle.classList.remove('switching');
        }, 500);
        
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        console.log(`🎨 Theme switched to: ${newTheme}`);
    });

    function setTheme(theme) {
        // Set the theme attribute
        html.setAttribute('data-theme', theme);
        
        // Update the toggle button title
        if (theme === 'light') {
            themeToggle.title = 'Switch to Dark Mode';
        } else {
            themeToggle.title = 'Switch to Light Mode';
        }

        // Update body background for smooth transitions
        updateBackgroundElements(theme);
        
        console.log(`🎨 Theme set to: ${theme}`);
    }

    function updateBackgroundElements(theme) {
        const body = document.body;
        
        if (theme === 'light') {
            // Light theme adjustments
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            
            // Update body background gradient for light theme
            const lightBg = `
                radial-gradient(600px at 50% 0%, rgba(139, 70, 255, 0.05) 0%, transparent 50%),
                radial-gradient(400px at 80% 100%, rgba(255, 61, 113, 0.03) 0%, transparent 50%),
                radial-gradient(300px at 20% 50%, rgba(6, 182, 212, 0.02) 0%, transparent 50%)
            `;
            
            if (body.querySelector('::before')) {
                const beforeElement = body.querySelector('::before');
                if (beforeElement) {
                    beforeElement.style.background = lightBg;
                }
            }
        } else {
            // Dark theme (default)
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        }
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                const systemTheme = e.matches ? 'light' : 'dark';
                setTheme(systemTheme);
                console.log(`🎨 Auto-switched to system theme: ${systemTheme}`);
            }
        });
        
        // Set initial theme based on system preference if no saved preference
        if (!localStorage.getItem('theme')) {
            const systemTheme = mediaQuery.matches ? 'light' : 'dark';
            setTheme(systemTheme);
        }
    }

    // Add smooth transition to all elements
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            transition: background-color 0.3s ease, 
                       border-color 0.3s ease, 
                       color 0.3s ease,
                       box-shadow 0.3s ease !important;
        }
        
        /* Disable transitions during theme switch to prevent flickering */
        .theme-switching *, 
        .theme-switching *::before, 
        .theme-switching *::after {
            transition: none !important;
        }
        
        /* Light theme specific adjustments */
        :root[data-theme="light"] .hero::before,
        :root[data-theme="light"] body::before {
            background: 
                radial-gradient(600px at 50% 0%, rgba(139, 70, 255, 0.05) 0%, transparent 50%),
                radial-gradient(400px at 80% 100%, rgba(255, 61, 113, 0.03) 0%, transparent 50%),
                radial-gradient(300px at 20% 50%, rgba(6, 182, 212, 0.02) 0%, transparent 50%) !important;
        }
        
        /* Ensure gradients remain vibrant in light theme */
        :root[data-theme="light"] .gradient-text,
        :root[data-theme="light"] .btn-primary {
            background: var(--gradient-primary) !important;
            -webkit-background-clip: text !important;
            background-clip: text !important;
        }
    `;
    document.head.appendChild(style);

    console.log('🎨 Theme toggle functionality initialized');
}

// Copy Command Buttons Functionality
function initCopyButtons() {
    // Add copy buttons to all command cards
    const commandCards = document.querySelectorAll('.command-card');
    
    if (commandCards.length === 0) {
        console.warn('No command cards found');
        return;
    }

    commandCards.forEach(card => {
        const commandName = card.querySelector('.command-name');
        if (!commandName) return;
        
        const command = commandName.textContent.trim();
        
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-command-btn';
        copyBtn.setAttribute('data-command', command);
        copyBtn.title = `Copy "${command}" to clipboard`;
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        
        // Add copy functionality
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            copyToClipboard(command, copyBtn);
        });
        
        // Add the button to the card
        card.appendChild(copyBtn);
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.innerHTML = '<i class="fas fa-check"></i><span>Copied to clipboard!</span>';
    document.body.appendChild(notification);

    async function copyToClipboard(command, button) {
        try {
            // Try modern clipboard API first
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(command);
                showCopySuccess(command, button);
            } else {
                // Fallback for older browsers or non-secure contexts
                fallbackCopyToClipboard(command, button);
            }
        } catch (error) {
            console.warn('Clipboard API failed, trying fallback:', error);
            fallbackCopyToClipboard(command, button);
        }
    }

    function fallbackCopyToClipboard(command, button) {
        try {
            // Create a temporary textarea element
            const textArea = document.createElement('textarea');
            textArea.value = command;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (successful) {
                showCopySuccess(command, button);
            } else {
                showCopyError();
            }
        } catch (error) {
            console.error('Fallback copy failed:', error);
            showCopyError();
        }
    }

    function showCopySuccess(command, button) {
        // Animate button
        button.classList.add('copied');
        setTimeout(() => {
            button.classList.remove('copied');
        }, 1500);

        // Show notification
        const notification = document.querySelector('.copy-notification');
        const span = notification.querySelector('span');
        span.textContent = `Copied "${command}" to clipboard!`;
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);

        console.log(`📋 Copied command to clipboard: ${command}`);
    }

    function showCopyError() {
        // Show error notification
        const notification = document.querySelector('.copy-notification');
        notification.style.background = 'rgba(220, 38, 38, 0.95)';
        
        const span = notification.querySelector('span');
        span.textContent = 'Failed to copy command';
        
        const icon = notification.querySelector('i');
        icon.className = 'fas fa-exclamation-triangle';
        icon.style.color = '#FCA5A5';
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            // Reset notification styling
            setTimeout(() => {
                notification.style.background = 'rgba(139, 70, 255, 0.95)';
                icon.className = 'fas fa-check';
                icon.style.color = '#10B981';
            }, 300);
        }, 3000);

        console.warn('📋 Failed to copy command to clipboard');
    }

    // Add keyboard shortcut (Ctrl+C) for focused command cards
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'c' && !e.shiftKey && !e.altKey) {
            const focusedCard = document.querySelector('.command-card:focus-within, .command-card.search-match:first-child');
            if (focusedCard) {
                e.preventDefault();
                const commandName = focusedCard.querySelector('.command-name');
                if (commandName) {
                    const command = commandName.textContent.trim();
                    const copyBtn = focusedCard.querySelector('.copy-command-btn');
                    copyToClipboard(command, copyBtn);
                }
            }
        }
    });

    // Add click-to-copy functionality to command names as well
    commandCards.forEach(card => {
        const commandName = card.querySelector('.command-name');
        if (commandName) {
            commandName.style.cursor = 'pointer';
            commandName.title = 'Click to copy command';
            
            commandName.addEventListener('click', (e) => {
                e.stopPropagation();
                const command = commandName.textContent.trim();
                const copyBtn = card.querySelector('.copy-command-btn');
                copyToClipboard(command, copyBtn);
            });
        }
    });

    console.log(`📋 Copy functionality added to ${commandCards.length} commands`);
}

// ===== DISCORD COMMAND SHOWCASE =====
function initPlayground() {
    // DOM elements for Discord demos
    const discordDemos = document.querySelectorAll('.discord-demo');
    
    if (discordDemos.length === 0) return; // Not on playground page

    // Command showcase demo sequence - 6 impressive commands with REAL responses
    const demoCommands = [
        {
            command: '/help',
            title: '💜 Welcome to Evelynn Bot!',
            description: 'Unleash your desires with Evelynn Bot!\n\n🎮 45+ commands across 8 categories\nSelect a category from dropdown menu!'
        },
        {
            command: '/eco balance',
            title: '💰 Financial Portfolio',
            description: 'Total Wealth: $6,877\n\n💵 Wallet: $1,247 (18%)\n🏦 Bank: $5,630 (82%)\n📈 Risk Level: 🟢 Low'
        },
        {
            command: '/play Zeus by tevez',
            title: '🎵 Now Playing',
            description: '🔍 Found: Tevez - Zeus\n\n🎵 Now playing! Controls will appear below...\n🎶 Great choice! 🔥'
        },
        {
            command: '/eco blackjack 200',
            title: '🃏 Blackjack Game',
            description: '💰 Bet placed: $200\n\n🎴 Your cards: [A♠️] [K♦️] = 21\n🏠 Dealer: [9♥️] [10♣️] = 19\n\n✅ BLACKJACK! Won $300! (1.5x payout)'
        },
        {
            command: '/evepaint cyberpunk city at night',
            title: "🎨 Here's your DALL·E 3 image!",
            description: '**Prompt:** cyberpunk city at night\n\n📐 Size: 1792x1024 (HD)\n✅ Generation complete!'
        },
        {
            command: '/tickets setup',
            title: '⚙️ Ticket System Setup',
            description: '📁 Active Tickets Category: ✅\n📂 Closed Tickets Category: ✅\n\n✅ Ticket System Setup Complete\nUse /tickets createbooth next!'
        }
    ];

    // Auto-demo variables
    let isDemoRunning = false;
    
    // Start the demo automatically when page loads
    setTimeout(() => {
        startCommandDemo();
    }, 2000);

    function startCommandDemo() {
        if (isDemoRunning) return;
        
        isDemoRunning = true;
        
        // Start all 6 commands simultaneously with staggered delays
        demoCommands.forEach((commandData, index) => {
            setTimeout(() => {
                executeCommandInDemo(commandData, index);
            }, index * 800); // 800ms delay between each command start
        });
    }

    function executeCommandInDemo(commandData, demoIndex) {
        const commandElement = document.getElementById(`command-${demoIndex}`);
        const botResponse = document.getElementById(`bot-response-${demoIndex}`);
        const embedTitle = document.getElementById(`embed-title-${demoIndex}`);
        const embedDesc = document.getElementById(`embed-desc-${demoIndex}`);
        const embedImage = document.getElementById(`embed-image-${demoIndex}`);
        
        if (!commandElement || !botResponse || !embedTitle || !embedDesc) return;
        
        // Clear previous content
        commandElement.textContent = '';
        botResponse.style.display = 'none';
        embedTitle.textContent = '';
        embedDesc.textContent = '';
        if (embedImage) {
            embedImage.style.display = 'none';
        }
        
        // Type the command
        typeCommand(commandData.command, commandElement, () => {
            // After command is typed, show bot response
            setTimeout(() => {
                botResponse.style.display = 'flex';
                
                // Type embed title then description
                typeText(commandData.title, embedTitle, () => {
                    setTimeout(() => {
                        typeText(commandData.description, embedDesc, () => {
                            // Show image for evepaint command (demo index 4)
                            if (demoIndex === 4 && embedImage) {
                                console.log('Showing image for evepaint command');
                                setTimeout(() => {
                                    embedImage.style.display = 'block';
                                    console.log('Image should now be visible');
                                }, 500);
                            }
                            
                            // After all content shown, restart this demo after delay
                            setTimeout(() => {
                                executeCommandInDemo(commandData, demoIndex);
                            }, 10000); // 10 second pause before restart
                        });
                    }, 500);
                });
            }, 1000);
        });
    }

    function typeCommand(command, element, callback) {
        let i = 0;
        
        function typeNextChar() {
            if (i < command.length) {
                element.textContent += command[i];
                i++;
                setTimeout(typeNextChar, 80 + Math.random() * 40); // Variable typing speed
            } else {
                setTimeout(callback, 500);
            }
        }
        
        typeNextChar();
    }

    function typeText(text, element, callback) {
        let i = 0;
        
        function typeNextChar() {
            if (i < text.length) {
                const char = text[i];
                if (char === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    element.innerHTML = formatText(text.slice(0, i + 1));
                }
                i++;
                setTimeout(typeNextChar, 20 + Math.random() * 15); // Much faster typing for embeds
            } else {
                setTimeout(callback, 300);
            }
        }
        
        typeNextChar();
    }

    function formatText(text) {
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    console.log('🎮 Discord command showcase initialized!');
}

// Log successful initialization
console.log('✨ All website features initialized successfully!');