document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        // Set initial background image from CSS
        hero.style.backgroundImage = getComputedStyle(hero).backgroundImage;
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Video fallback if video doesn't load
    const videoBackground = document.querySelector('.video-background video');
    if (videoBackground) {
        videoBackground.addEventListener('error', function() {
            const videoContainer = document.querySelector('.video-background');
            videoContainer.style.backgroundImage = 'url("assets/images/hero-bg.jpg")';
            videoContainer.innerHTML = ''; // Remove video element completely
        });
        
        // Optional: Check if mobile device and don't load video
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            videoBackground.remove();
            document.querySelector('.video-background').style.backgroundImage = 'url("assets/images/hero-bg-mobile.jpg")';
        }
    }
    
    // Form submission with improved validation
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                alert('Por favor complete todos los campos del formulario.');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                alert('Por favor ingrese un email válido.');
                return;
            }
            
            // Get form values
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Simulate form submission (in a real project, you would use fetch() here)
            console.log('Form submitted:', data);
            
            // Show success message with timeout
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = '¡Mensaje Enviado!';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1000);
        });
    }
    
    // Improved animate on scroll with Intersection Observer
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.grid-item, .card, form');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });
    };
    
    // Run animation on load
    animateOnScroll();
    
    // Apple-style navbar effect on scroll with throttling
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollTop = 0;
        let isScrolling;
        
        window.addEventListener('scroll', function() {
            // Clear the timeout if it's already set
            window.clearTimeout(isScrolling);
            
            // Set a timeout to run after scrolling stops
            isScrolling = setTimeout(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    navbar.style.transform = 'translateY(0)';
                }
                
                // Change navbar style when not at top
                if (scrollTop > 50) {
                    navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                } else {
                    navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                }
                
                lastScrollTop = scrollTop;
            }, 66); // Run every 66ms for smoother performance
        }, false);
    }
    
    // Improved hover effect to buttons with transition
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        // Ensure smooth transition
        button.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Add active/click effect
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
        });
    });
    
    // Additional: Lazy load images if needed
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});