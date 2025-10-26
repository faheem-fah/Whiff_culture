// ===================================
// WhiffCulture - Professional JS with Carousel & Fixed Hamburger
// ===================================

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;
let carouselInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function startCarousel() {
    carouselInterval = setInterval(nextSlide, 5000);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    if (slides.length > 0) {
        showSlide(currentSlide);
        startCarousel();
        
        const carouselContainer = document.querySelector('.hero-carousel');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopCarousel);
            carouselContainer.addEventListener('mouseleave', startCarousel);
        }
    }
});

// Carousel navigation buttons
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        stopCarousel();
        prevSlide();
        startCarousel();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        stopCarousel();
        nextSlide();
        startCarousel();
    });
}

// Carousel indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        stopCarousel();
        currentSlide = index;
        showSlide(currentSlide);
        startCarousel();
    });
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (slides.length > 0) {
        if (e.key === 'ArrowLeft') {
            stopCarousel();
            prevSlide();
            startCarousel();
        } else if (e.key === 'ArrowRight') {
            stopCarousel();
            nextSlide();
            startCarousel();
        }
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    
    if (window.scrollY > 100) {
        if (navbar) navbar.classList.add('scrolled');
        if (scrollTop) scrollTop.classList.add('visible');
    } else {
        if (navbar) navbar.classList.remove('scrolled');
        if (scrollTop) scrollTop.classList.remove('visible');
    }
});

// ===================================
// ENHANCED MOBILE HAMBURGER MENU - FIXED
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

if (hamburger && navMenu) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = navMenu.classList.contains('show');
        
        if (isOpen) {
            // Close menu
            navMenu.classList.remove('show');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        } else {
            // Open menu
            navMenu.classList.add('show');
            hamburger.classList.add('active');
            body.style.overflow = 'hidden';
        }
        
        console.log('Menu toggled:', !isOpen ? 'OPEN' : 'CLOSED');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show')) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
                hamburger.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Smooth scroll to top
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 90;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Quick view functionality
document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productBrand = productCard.querySelector('.product-brand').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        alert(`Quick View\n\nBrand: ${productBrand}\nProduct: ${productName}\nPrice: ${productPrice}\n\nFull product details modal can be implemented here.`);
    });
});

// Wishlist functionality
document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showNotification('Added to wishlist!');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showNotification('Removed from wishlist!');
        }
    });
});

// Add to cart functionality
let cartCount = 0;
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        
        // Update cart count
        cartCount++;
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
        
        // Visual feedback with luxury gold styling
        const originalText = btn.textContent;
        btn.textContent = 'ADDED!';
        btn.style.background = 'linear-gradient(135deg, var(--champagne), var(--luxury-gold))';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 1500);
        
        showNotification(`${productName} added to cart!`);
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you! Your message has been sent successfully.');
        contactForm.reset();
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Notification system with luxury styling
function showNotification(message) {
    const existingNotif = document.querySelector('.custom-notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: linear-gradient(135deg, #d4af37, #b8960f);
        color: #000000;
        padding: 16px 35px;
        border-radius: 0;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 1px;
        z-index: 10000;
        transition: transform 0.3s ease;
        box-shadow: 0 10px 40px rgba(212, 175, 55, 0.5);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Product card animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .brand-card').forEach(card => {
    observer.observe(card);
});

// Search functionality (placeholder)
const searchIcon = document.querySelector('.nav-icons .fa-search');
if (searchIcon) {
    searchIcon.addEventListener('click', () => {
        showNotification('Search functionality will be implemented here');
    });
}

// User account icon (placeholder)
const userIcon = document.querySelector('.nav-icons .fa-user');
if (userIcon) {
    userIcon.addEventListener('click', () => {
        showNotification('User account functionality will be implemented here');
    });
}

// Debug: Log when script loads
console.log('WhiffCulture - Professional perfume store with carousel initialized');
console.log('Hamburger element:', hamburger);
console.log('Nav menu element:', navMenu);
