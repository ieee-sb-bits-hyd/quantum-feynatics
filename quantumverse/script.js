document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Header Offset for Announcement Bar ---
    const announcementBar = document.getElementById('announcement-bar');
    if (announcementBar) {
        const barHeight = announcementBar.offsetHeight;
        document.body.style.paddingTop = `${barHeight}px`;
    }

    // --- Custom Paint Blob Cursor ---
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        // We only run this on devices that can hover (non-touch)
        const isHoverDevice = window.matchMedia("(hover: hover)").matches;

        if (isHoverDevice) {
            let currentX = window.innerWidth / 2;
            let currentY = window.innerHeight / 2;
            let lagX = currentX;
            let lagY = currentY;
            let lastX = lagX;
            let lastY = lagY;
            let velX = 0;
            let velY = 0;
            let speed = 0;
            let angle = 0;
            let scale = 1;
            let moveTimer = null;

            // 1. Update target position on mousemove
            window.addEventListener('mousemove', (e) => {
                currentX = e.clientX;
                currentY = e.clientY;

                // Set a timer to detect when the mouse stops
                clearTimeout(moveTimer);
                moveTimer = setTimeout(() => {
                    speed = 0; // Force speed to 0 when mouse stops
                }, 100);
            });

            // 2. Render loop for smooth animation
            function renderLoop() {
                // Calculate lag position (this creates the tracking)
                // The 0.2 is the "lag" factor. Smaller = more lag.
                lagX += (currentX - lagX) * 0.2;
                lagY += (currentY - lagY) * 0.2;

                // Calculate velocity (difference from last frame's lag position)
                velX = lagX - lastX;
                velY = lagY - lastY;

                // Calculate speed and angle
                speed = Math.sqrt(velX ** 2 + velY ** 2);
                angle = Math.atan2(velY, velX) * (180 / Math.PI);

                // Calculate scale based on speed
                // It will stretch from 1x up to a max of 2.5x
                let targetScale = 1 + Math.min(speed / 15, 1.5);

                // Smoothly transition the scale
                scale += (targetScale - scale) * 0.3;

                // Squash the Y scale as X scale grows, but not fully
                let scaleY = 1 / (scale * 0.5 + 0.5);

                // Apply all styles
                cursor.style.left = `${lagX}px`;
                cursor.style.top = `${lagY}px`;
                cursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scaleX(${scale}) scaleY(${scaleY})`;

                // Manage animation: Stop morphing when streaking
                if (speed > 1) {
                    cursor.style.animation = 'none';
                    cursor.style.borderRadius = '50px'; // Force capsule shape
                } else {
                    cursor.style.animation = 'morph-blob 8s ease-in-out infinite';
                    cursor.style.borderRadius = ''; // Let animation control radius
                }

                // Store last position for next frame's velocity calculation
                lastX = lagX;
                lastY = lagY;

                requestAnimationFrame(renderLoop);
            }

            renderLoop();

        } else {
            // On touch devices, hide the custom cursor
            if (cursor) {
                cursor.style.display = 'none';
            }
        }
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