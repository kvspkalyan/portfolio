// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when a nav item is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for nav height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting based on scroll position
    function updateActiveLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Initial call to set active link
    updateActiveLink();

    // Form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required');
                return;
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email is required');
                return;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                return;
            }
            
            if (!subjectInput.value.trim()) {
                showError(subjectInput, 'Subject is required');
                return;
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required');
                return;
            }
            
            // If validation passes, you would normally send the form data
            // For demo purposes, just show a success message
            alert('Message sent successfully! (This is a demo, no actual message was sent)');
            contactForm.reset();
        });
    }
    
    // Helper function to display form errors
    function showError(input, message) {
        // Get the parent element
        const formGroup = input.parentElement.parentElement;
        
        // Create error message element
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ff003c';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '5px';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        
        // Highlight the input
        input.style.borderColor = '#ff003c';
        
        // Remove error after 3 seconds
        setTimeout(() => {
            if (errorElement) {
                errorElement.textContent = '';
                input.style.borderColor = '';
            }
        }, 3000);
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Terminal typing effect for homepage
    function initTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-text');
        
        typingElements.forEach((element, index) => {
            // Set initial state - hidden
            element.style.width = '0';
            
            // Set animation with delay based on index
            setTimeout(() => {
                element.style.animation = `typing 2s steps(40, end) forwards`;
            }, index * 1000); // Delay each line
        });
    }
    
    // Initialize typing effect
    initTypingEffect();

    // Add cyberpunk glitch effect on hover for certain elements
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseover', function() {
            this.classList.add('hover-glitch');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hover-glitch');
        });
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.querySelector('.project-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-overlay').style.opacity = '0';
        });
    });

    // Parallax effect for background grids
    window.addEventListener('scroll', function() {
        const cyberGrids = document.querySelectorAll('.cyber-grid');
        const scrollPosition = window.pageYOffset;
        
        cyberGrids.forEach(grid => {
            const section = grid.closest('.section');
            const sectionTop = section.offsetTop;
            const distance = scrollPosition - sectionTop;
            
            if (distance > -window.innerHeight && distance < window.innerHeight) {
                grid.style.transform = `perspective(500px) rotateX(60deg) translateY(${distance * 0.05}px)`;
            }
        });
    });

    // Add 'shine' effect to buttons on hover
    const buttons = document.querySelectorAll('.cyber-button, .submit-btn, .resume-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.classList.add('shine');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('shine');
        });
    });
});