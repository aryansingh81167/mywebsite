document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Navbar Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Run immediately on load in case page is already scrolled
    }

    // Product Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                // Close others
                document.querySelectorAll('.faq-answer').forEach(a => {
                    if (a !== answer) {
                        a.style.display = 'none';
                    }
                });
                document.querySelectorAll('.faq-question i').forEach(i => {
                    if (i !== icon) {
                        i.classList.remove('fa-chevron-up');
                        i.classList.add('fa-chevron-down');
                    }
                });

                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    answer.style.display = 'block';
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            });
        });
    }

    // Touch support for hover tiles on mobile
    const hoverTiles = document.querySelectorAll('.product-card.has-hover-tile');
    if (hoverTiles.length > 0) {
        hoverTiles.forEach(card => {
            const trigger = card.querySelector('.btn-details-trigger');
            const overlay = card.querySelector('.product-hover-tile');

            // 1. Only clicking the "View Details" button opens the overlay
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    e.stopPropagation(); // prevent bubbling up
                    // Close all other hover tiles first
                    hoverTiles.forEach(c => {
                        if (c !== card) c.classList.remove('touch-active');
                    });
                    card.classList.add('touch-active');
                });
            }

            // 2. Tapping on the active overlay closes it (unless clicking links/buttons inside)
            if (overlay) {
                overlay.addEventListener('click', function(e) {
                    if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a') || e.target.tagName.toLowerCase() === 'button' || e.target.closest('button')) {
                        return;
                    }
                    e.stopPropagation();
                    card.classList.remove('touch-active');
                });
            }
        });

        // 3. Close overlays if clicking outside of any product card
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.product-card.has-hover-tile')) {
                hoverTiles.forEach(c => c.classList.remove('touch-active'));
            }
        });
    }

    // Enable animations fail-safe class
    document.body.classList.add('js-enabled');

    // Scroll Animation Observer (Fade In / Slide Up)
    const fadeSections = document.querySelectorAll('.fade-in-section');
    if (fadeSections.length > 0) {
        if (!('IntersectionObserver' in window)) {
            fadeSections.forEach(section => section.classList.add('is-visible'));
        } else {
            const observerOptions = {
                threshold: 0.01, // Highly mobile friendly: trigger as soon as 1% of section enters viewport
                rootMargin: '0px 0px -30px 0px'
            };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Trigger once for cleaner visual experience
                    }
                });
            }, observerOptions);
            fadeSections.forEach(section => {
                observer.observe(section);
            });
        }
    }

    // Stripe-Style Sliding Navigation Underline
    const navLinksList = document.querySelector('.nav-links');
    if (navLinksList) {
        const links = navLinksList.querySelectorAll('a');
        const activeLink = navLinksList.querySelector('a.active');
        
        // Create absolute underline element
        const underline = document.createElement('div');
        underline.className = 'nav-underline';
        navLinksList.appendChild(underline);
        
        // Position function
        function positionUnderline(link) {
            if (!link) {
                underline.style.width = '0px';
                return;
            }
            const rect = link.getBoundingClientRect();
            const parentRect = navLinksList.getBoundingClientRect();
            underline.style.left = `${rect.left - parentRect.left}px`;
            underline.style.width = `${rect.width}px`;
        }
        
        // Initial positioning
        if (activeLink) {
            setTimeout(() => positionUnderline(activeLink), 150); // slight delay for layout stability
        }
        
        // Hover listeners
        links.forEach(link => {
            link.addEventListener('mouseenter', () => positionUnderline(link));
        });
        
        // Mouse leave listeners (return to active tab)
        navLinksList.addEventListener('mouseleave', () => {
            if (activeLink) {
                positionUnderline(activeLink);
            } else {
                positionUnderline(null);
            }
        });
        
        // Resize listener
        window.addEventListener('resize', () => {
            const currentActive = navLinksList.querySelector('a.active');
            if (currentActive) positionUnderline(currentActive);
        });
    }
});
