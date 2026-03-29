// ===== SMOOTH NAVIGATION & ACTIVE STATES =====
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});

// ===== CONTACT FORM HANDLING =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Validate form
            if (name && email && subject && message) {
                // Create mailto link
                const mailtoLink = `mailto:tejarayudu0@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                window.location.href = mailtoLink;
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    showNotification('Thank you! Your message will be sent.', 'success');
                }, 500);
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#50fa7b' : type === 'error' ? '#ff5555' : '#8be9fd'};
        color: #282a36;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.project-card, .skill-card, .achievement-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;
    const heroCode = document.querySelector('.hero-code');
    
    if (heroCode) {
        heroCode.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

// ===== INTERACTIVE SKILL TAGS =====
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 0.6s ease-out';
            }, 10);
        });
    });
});

// ===== STAT CARDS COUNTER ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card');
    const animationTriggered = new Set();

    window.addEventListener('scroll', function() {
        statCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenBottom = window.innerHeight;

            if (cardPosition < screenBottom && !animationTriggered.has(card)) {
                animationTriggered.add(card);
                animateCounter(card);
            }
        });
    });
});

function animateCounter(card) {
    const numberElement = card.querySelector('.stat-number');
    const finalNumber = numberElement.textContent;
    let currentNumber = 0;
    
    // Handle different number formats
    let target;
    if (finalNumber.includes('+')) {
        target = parseInt(finalNumber) || 0;
    } else if (finalNumber.includes('.')) {
        target = parseFloat(finalNumber);
    } else {
        target = parseInt(finalNumber);
    }

    const increment = target / 30;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= target) {
            numberElement.textContent = finalNumber;
            clearInterval(timer);
        } else {
            if (finalNumber.includes('.')) {
                numberElement.textContent = currentNumber.toFixed(2);
            } else {
                numberElement.textContent = Math.floor(currentNumber) + (finalNumber.includes('+') ? '+' : '');
            }
        }
    }, 30);
}

// ===== GITHUB & LEETCODE DYNAMIC STATUS (Optional Enhancement) =====
// Note: Requires CORS-enabled API or server proxy
document.addEventListener('DOMContentLoaded', function() {
    // You can enhance this with actual API calls if needed
    function updateGitHubStatus() {
        // Example: Fetch GitHub data
        // const github_username = 'Teja-Rayudu';
        // fetch(`https://api.github.com/users/${github_username}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('GitHub Data:', data);
        //     })
        //     .catch(error => console.log('GitHub API Error:', error));
    }

    function updateLeetCodeStatus() {
        // Example: LeetCode doesn't have a public API, but you can display static data
        // or integrate with a custom backend service
    }

    // Initialize status updates
    // updateGitHubStatus();
    // updateLeetCodeStatus();
});

// ===== SMOOTH TRANSITIONS ON PAGE LOAD =====
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Tab navigation for sections
    if (e.key === 'ArrowDown') {
        const navLinks = document.querySelectorAll('.nav-link');
        const activeLink = document.querySelector('.nav-link.active');
        const activeIndex = Array.from(navLinks).indexOf(activeLink);
        
        if (activeIndex < navLinks.length - 1) {
            navLinks[activeIndex + 1].click();
        }
    }

    if (e.key === 'ArrowUp') {
        const navLinks = document.querySelectorAll('.nav-link');
        const activeLink = document.querySelector('.nav-link.active');
        const activeIndex = Array.from(navLinks).indexOf(activeLink);
        
        if (activeIndex > 0) {
            navLinks[activeIndex - 1].click();
        }
    }
});

// ===== THEME TOGGLE HELPER (Optional Future Enhancement) =====
function toggleTheme() {
    document.documentElement.style.colorScheme = 
        document.documentElement.style.colorScheme === 'dark' ? 'light' : 'dark';
}

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images if implementing image optimization
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window && 'requestIdleCallback' in window) {
        // Use Intersection Observer for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
});

// ===== MOBILE RESPONSIVE MENU STYLES =====
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 60px;
            flex-direction: column;
            background-color: #1e1f29;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            gap: 0;
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-link {
            padding: 1rem 0;
            width: 100%;
            display: table;
            border-bottom: 1px solid rgba(189, 147, 249, 0.1);
        }

        .nav-link::after {
            display: none;
        }

        .nav-link:hover {
            background-color: rgba(189, 147, 249, 0.1);
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-6px, -6px);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);

// ===== INITIALIZATION =====
console.log('Portfolio Website - Loaded Successfully ✓');
console.log('Open for roles: Software Engineer, Cloud Engineer, AI');
console.log('GitHub: https://github.com/Teja-Rayudu');
console.log('LeetCode: https://leetcode.com/Teja-Rayudu');
