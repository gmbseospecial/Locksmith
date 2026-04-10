document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Disable scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = content.style.maxHeight;

            // Close all other accordions
            document.querySelectorAll('.accordion-content').forEach(c => {
                c.style.maxHeight = null;
            });

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));

    // Form Validation (if contact form exists)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const firstNameEl = document.getElementById('firstname');
            const lastNameEl = document.getElementById('lastname');
            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const messageEl = document.getElementById('message');

            const firstName = firstNameEl ? firstNameEl.value.trim() : '';
            const lastName = lastNameEl ? lastNameEl.value.trim() : '';
            const name = nameEl ? nameEl.value.trim() : (firstName + ' ' + lastName).trim();
            const email = emailEl ? emailEl.value.trim() : '';
            const message = messageEl ? messageEl.value.trim() : '';
            
            let isValid = true;

            if (name === '' && firstName === '') {
                isValid = false;
                alert('Bitte geben Sie Ihren Namen ein.');
            } else if (email === '' || !email.includes('@')) {
                isValid = false;
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            } else if (message === '') {
                isValid = false;
                alert('Bitte geben Sie Ihre Nachricht ein.');
            }

            if (isValid) {
                const successOverlay = document.getElementById('form-success');
                if (successOverlay) {
                    successOverlay.classList.add('active');
                    contactForm.reset();
                } else {
                    alert('Vielen Dank! Ihre Nachricht wurde gesendet.');
                    contactForm.reset();
                }
            }
        });
    }

    // Handle "Send new message" button in success overlay
    const resetFormBtn = document.getElementById('reset-form-btn');
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            const successOverlay = document.getElementById('form-success');
            if (successOverlay) {
                successOverlay.classList.remove('active');
            }
        });
    }
});
