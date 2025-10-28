document.addEventListener('DOMContentLoaded', () => {

    // --- OPTIMIZATION: Removed sticky header offset. ---
    // This is now handled by CSS variables (var(--announcement-bar-height))
    // which prevents a flash of layout recalculation (layout shift) on page load.
    // const announcementBar = document.getElementById('announcement-bar');
    // if (announcementBar) {
    //     const barHeight = announcementBar.offsetHeight;
    //     document.body.style.paddingTop = `${barHeight}px`;
    // }

    // --- Custom Paint Blob Cursor (Heavily Optimized) ---
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
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

            // --- OPTIMIZATION: State variable to avoid thrashing CSS classes ---
            let isStreaking = false;

            window.addEventListener('mousemove', (e) => {
                currentX = e.clientX;
                currentY = e.clientY;

                clearTimeout(moveTimer);
                moveTimer = setTimeout(() => {
                    speed = 0;
                }, 100);
            });

            function renderLoop() {
                // Calculate lag position
                lagX += (currentX - lagX) * 0.2;
                lagY += (currentY - lagY) * 0.2;

                // Calculate velocity
                velX = lagX - lastX;
                velY = lagY - lastY;

                // Calculate speed and angle
                speed = Math.sqrt(velX ** 2 + velY ** 2);
                angle = Math.atan2(velY, velX) * (180 / Math.PI);

                // Calculate scale
                let targetScale = 1 + Math.min(speed / 15, 1.5);
                scale += (targetScale - scale) * 0.3;
                let scaleY = 1 / (scale * 0.5 + 0.5);

                // --- OPTIMIZATION: ONLY update transform. This is very fast. ---
                cursor.style.transform = `translate(${lagX}px, ${lagY}px) translate(-50%, -50%) rotate(${angle}deg) scaleX(${scale}) scaleY(${scaleY})`;

                // --- OPTIMIZATION: Toggle class ONLY when state changes. ---
                // This stops changing styles/animations on every single frame.
                if (speed > 1 && !isStreaking) {
                    cursor.classList.add('streaking');
                    isStreaking = true;
                } else if (speed <= 1 && isStreaking) {
                    cursor.classList.remove('streaking');
                    isStreaking = false;
                }

                // Store last position
                lastX = lagX;
                lastY = lagY;

                requestAnimationFrame(renderLoop);
            }

            renderLoop();

        } else {
            if (cursor) {
                cursor.style.display = 'none';
            }
        }
    }


    // --- Mobile Menu Toggle ---
    // This code is already efficient. No changes needed.
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        document.addEventListener('click', (event) => {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = menuButton.contains(event.target);
            if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    }


    // --- Interactive Timeline (Accordion) (Optimized) ---
    const timelineButtons = document.querySelectorAll('.timeline-button');

    timelineButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contentWrapper = button.nextElementSibling;
            const isOpening = !button.hasAttribute('aria-expanded') || button.getAttribute('aria-expanded') === 'false';

            // Close all other accordions
            timelineButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.removeAttribute('aria-expanded');
                    // --- OPTIMIZATION: Use grid-template-rows ---
                    otherButton.nextElementSibling.style.gridTemplateRows = '0fr';
                }
            });

            // Open or close the clicked accordion
            if (isOpening) {
                button.setAttribute('aria-expanded', 'true');
                // --- OPTIMIZATION: Use grid-template-rows ---
                contentWrapper.style.gridTemplateRows = '1fr';
            } else {
                button.removeAttribute('aria-expanded');
                // --- OPTIMIZATION: Use grid-template-rows ---
                contentWrapper.style.gridTemplateRows = '0fr';
            }
        });
    });

    // --- Scroll Fade-in Animations using Intersection Observer ---
    // This is already the most performant way to handle scroll animations. No changes.
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