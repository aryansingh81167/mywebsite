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

    // Scroll Animation Observer (Fade In / Slide Up)
    // js-enabled is applied in <head> so sections start hidden from first paint
    const fadeSections = document.querySelectorAll('.fade-in-section');
    if (fadeSections.length > 0) {
        if (!('IntersectionObserver' in window)) {
            fadeSections.forEach(section => section.classList.add('is-visible'));
        } else {
            const observerOptions = {
                threshold: 0.01,
                rootMargin: '0px 0px -30px 0px'
            };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
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

    // Hero Canvas Animation
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let mouse = {
            x: null,
            y: null,
            radius: 150
        };

        window.addEventListener('mousemove', function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener('mouseout', function() {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('resize', () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                init();
            }
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                
                // Interactive mouse push effect
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = forceDirectionX * force * 5;
                        const directionY = forceDirectionY * force * 5;
                        
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
                
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 10000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.8) - 0.4;
                let directionY = (Math.random() * 0.8) - 0.4;
                let color = 'rgba(0, 242, 254, 0.4)';

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = dx * dx + dy * dy;
                    
                    if (distance < 15000) {
                        opacityValue = 1 - (distance / 15000);
                        ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
                
                // Connect to mouse
                if (mouse.x != null && mouse.y != null) {
                    let dx = particlesArray[a].x - mouse.x;
                    let dy = particlesArray[a].y - mouse.y;
                    let mouseDistance = dx * dx + dy * dy;
                    
                    if (mouseDistance < 25000) {
                        opacityValue = 1 - (mouseDistance / 25000);
                        ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue * 0.4})`;
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        init();
        animate();
    }
});
