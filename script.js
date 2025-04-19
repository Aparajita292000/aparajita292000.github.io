document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
    }

    // Feature slider improvement
    const featureSlides = document.querySelectorAll('.feature-slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const sliderDots = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    function updateSlider() {
        featureSlides.forEach(slide => slide.classList.remove('active'));
        featureSlides[currentSlide].classList.add('active');
        sliderDots.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    if (featureSlides.length > 0 && nextBtn && prevBtn && sliderDots) {
        featureSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % featureSlides.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + featureSlides.length) % featureSlides.length;
            updateSlider();
        });

        const featureSlider = document.querySelector('.feature-slider');
        if (featureSlider) {
            featureSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            featureSlider.addEventListener('mouseleave', startAutoAdvance);
            featureSlider.addEventListener('touchstart', () => clearInterval(slideInterval));
            document.addEventListener('touchend', startAutoAdvance);
        }

        function startAutoAdvance() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % featureSlides.length;
                updateSlider();
            }, 5000);
        }

        startAutoAdvance();

        let touchStartX = 0;
        let touchEndX = 0;

        featureSlider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        featureSlider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) {
                currentSlide = (currentSlide + 1) % featureSlides.length;
                updateSlider();
            } else if (touchEndX > touchStartX + 50) {
                currentSlide = (currentSlide - 1 + featureSlides.length) % featureSlides.length;
                updateSlider();
            }
        });
    }

    // Tab system improvement
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(btn.getAttribute('data-tab')).classList.add('active');

                if (window.innerWidth <= 768) {
                    const tabNav = document.querySelector('.tab-nav');
                    const btnLeft = btn.offsetLeft;
                    const btnWidth = btn.offsetWidth;
                    const navWidth = tabNav.offsetWidth;
                    const scrollLeft = btnLeft - (navWidth / 2) + (btnWidth / 2);
                    tabNav.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                }
            });
        });
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('pointerdown', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all items first
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            // If the clicked item was not open, open it
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });

    // Popup functionality improvement
    const popupBtns = document.querySelectorAll('.open-popup');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupClose = document.querySelector('.popup-close');
    const popupContainer = document.querySelector('.popup-container');

    if (popupBtns.length > 0 && popupOverlay && popupClose && popupContainer) {
        popupBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                popupOverlay.classList.add('active');
                body.style.overflow = 'hidden';
            });
        });

        popupClose.addEventListener('click', function() {
            popupOverlay.classList.remove('active');
            body.style.overflow = '';
        });

        popupOverlay.addEventListener('click', function(event) {
            if (!popupContainer.contains(event.target) && popupOverlay.classList.contains('active')) {
                popupOverlay.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Privacy policy popup enhancement
    const privacyPolicyBtn = document.getElementById('openPrivacyPolicy');
    const privacyPolicyPopup = document.getElementById('privacyPolicyPopup');
    const closePrivacyBtn = document.getElementById('closePrivacyBtn');

    if (privacyPolicyBtn && privacyPolicyPopup && closePrivacyBtn) {
        privacyPolicyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            privacyPolicyPopup.style.display = 'block';
            body.style.overflow = 'hidden';
        });

        closePrivacyBtn.addEventListener('click', function() {
            privacyPolicyPopup.style.display = 'none';
            body.style.overflow = '';
        });
    }

    // Form validation and UX improvements
    const forms = [document.getElementById('contact-form'), document.getElementById('popup-form')];

    forms.forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
    
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
    
                const emailField = form.querySelector('input[type="email"]');
                if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
    
                const phoneField = form.querySelector('input[type="tel"]');
                if (phoneField && phoneField.value && !/^\d{10,15}$/.test(phoneField.value.replace(/\D/g, ''))) {
                    isValid = false;
                    phoneField.classList.add('error');
                }
    
                if (isValid) {
                    // Display success message
                    const successMsg = document.createElement('div');
                    successMsg.classList.add('success-message');
                    successMsg.textContent = 'Thank you! We will contact you soon.';
    
                    // Clear form fields
                    form.reset();
    
                    // Append success message to the form
                    form.appendChild(successMsg);
    
                    // Fade out and remove success message after 3 seconds
                    setTimeout(() => {
                        successMsg.classList.add('fade-out');
                        setTimeout(() => {
                            successMsg.remove();
                        }, 300);
                    }, 3000);
    
                    // Close popup if it's the popup form
                    if (form.id === 'popup-form') {
                        setTimeout(() => {
                            popupOverlay.classList.remove('active');
                            body.style.overflow = '';
                        }, 3000);
                    }
                }
            });
    
            form.querySelectorAll('input, textarea').forEach(field => {
                field.addEventListener('input', function() {
                    this.classList.remove('error');
                });
            });
        }
    });

    // Enhance scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        if (!link.classList.contains('open-popup')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        if (navMenu && navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            body.style.overflow = '';
                        }
                        const headerHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    }
                }
            });
        }
    });

    // Sticky header with animation
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            if (window.innerWidth <= 768) {
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.style.transform = '';
            }
            lastScrollTop = scrollTop;
        });
    }

    // Add lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    // Adjust video background on mobile for better performance
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        function adjustVideoForMobile() {
            if (window.innerWidth <= 768) {
                heroVideo.play().catch(err => {
                    console.warn("Autoplay is restricted by the browser. Video will not play automatically.");
                });
                document.querySelector('.hero').style.backgroundImage = 'url("images/Gallery3.jpg")';
            } else {
                heroVideo.play();
                document.querySelector('.hero').style.backgroundImage = 'none';
            }
        }
        adjustVideoForMobile();
        window.addEventListener('resize', adjustVideoForMobile);
    }

    // Add CSS class to body when page is fully loaded
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
    });
});