document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Header Offset for Announcement Bar ---
    const announcementBar = document.getElementById('announcement-bar');
    if (announcementBar) {
        const barHeight = announcementBar.offsetHeight;
        document.body.style.paddingTop = `${barHeight}px`;
    }

    // --- Custom Holo Cursor ---
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        window.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    }

    // --- Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when a link is clicked
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = menuButton.contains(event.target);
            if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    }


    // --- Interactive Timeline (Accordion) ---
    const timelineButtons = document.querySelectorAll('.timeline-button');

    timelineButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contentWrapper = button.nextElementSibling;
            const isOpening = !button.hasAttribute('aria-expanded') || button.getAttribute('aria-expanded') === 'false';

            // Close all other accordions
            timelineButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.removeAttribute('aria-expanded');
                    otherButton.nextElementSibling.style.maxHeight = null;
                }
            });

            // Open or close the clicked accordion
            if (isOpening) {
                button.setAttribute('aria-expanded', 'true');
                contentWrapper.style.maxHeight = contentWrapper.scrollHeight + 'px';
            } else {
                button.removeAttribute('aria-expanded');
                contentWrapper.style.maxHeight = null;
            }
        });
    });

    // --- Scroll Fade-in Animations using Intersection Observer ---
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

});