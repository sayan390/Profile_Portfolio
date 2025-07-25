// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
});

// Initialize Typed.js
const typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    backDelay: 2000
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

// Function to update navbar visibility
function updateNavbarVisibility() {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
}

// Initial check
updateNavbarVisibility();

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Handle smooth scrolling for anchor links
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
        
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Update navbar visibility on window resize
window.addEventListener('resize', updateNavbarVisibility);

// Update navbar visibility when page loads
window.addEventListener('load', updateNavbarVisibility);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const submitBtnText = submitBtn.querySelector('span');
        const submitBtnIcon = submitBtn.querySelector('i');
        
        // Get form data
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Simple validation
        if (!formValues.name || !formValues.email || !formValues.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValues.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        try {
            // Update button state
            submitBtn.disabled = true;
            submitBtnText.textContent = 'Sending...';
            submitBtnIcon.className = 'fas fa-spinner fa-spin';
            
            // Simulate form submission (replace with actual fetch/axios call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button state
            submitBtnText.textContent = 'Send Message';
            submitBtnIcon.className = 'fas fa-paper-plane';
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showNotification('Failed to send message. Please try again.', 'error');
            
            // Reset button state on error
            submitBtn.disabled = false;
            submitBtnText.textContent = 'Send Message';
            submitBtnIcon.className = 'fas fa-paper-plane';
        } finally {
            submitBtn.disabled = false;
        }
    });
}

// Show notification function
function showNotification(message, type = 'success') {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.form-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        document.body.appendChild(notification);
        
        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    } else {
        notification.className = `form-notification ${type} show`;
        clearTimeout(notification.timeout);
        
        // Auto-remove notification after 5 seconds
        notification.timeout = setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip if the anchor is already handled by the mobile menu
    if (anchor.closest('.nav-links')) return;
    
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
