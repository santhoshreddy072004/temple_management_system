document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation for booking
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const temple = this.querySelector('select').value;
            const date = this.querySelector('input[type="date"]').value;
            const visitors = this.querySelector('input[type="number"]').value;

            // Basic validation
            if (!temple || !date || !visitors) {
                alert('Please fill in all fields');
                return;
            }

            // Show success message
            alert('Booking successful! We will send you a confirmation email shortly.');
            this.reset();
        });
    }

    // Form validation for login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;

            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }

            // Show success message
            alert('Login successful!');
            this.reset();
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        });
    }

    // Form validation for registration
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const passwords = this.querySelectorAll('input[type="password"]');

            // Basic validation
            if (!name || !email || !passwords[0].value || !passwords[1].value) {
                alert('Please fill in all fields');
                return;
            }

            if (passwords[0].value !== passwords[1].value) {
                alert('Passwords do not match');
                return;
            }

            // Show success message
            alert('Registration successful! Please check your email for verification.');
            this.reset();
            bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
        });
    }

    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');
    
    if (searchBox && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchBox.value.trim();
            if (query) {
                alert('Searching for: ' + query);
                // Here you would typically make an API call to search for temples
            }
        });

        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark');
            navbar.classList.remove('bg-primary');
        } else {
            navbar.classList.add('bg-primary');
            navbar.classList.remove('bg-dark');
        }
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add animation classes to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.temple-card, .about-section h3, .booking-section .card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate-fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Booking modal functionality
    function openBookingModal(templeName) {
        const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
        document.getElementById('selectedTemple').value = templeName;
        document.getElementById('displayTemple').value = templeName;
        modal.show();
    }

    // Temple booking form handling
    const templeBookingForm = document.getElementById('templeBookingForm');
    if (templeBookingForm) {
        templeBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const temple = document.getElementById('selectedTemple').value;
            const date = this.querySelector('input[name="date"]').value;
            const time = this.querySelector('select[name="time"]').value;
            const visitors = this.querySelector('input[name="visitors"]').value;
            const requirements = this.querySelector('textarea[name="requirements"]').value;

            // Basic validation
            if (!temple || !date || !time || !visitors) {
                alert('Please fill in all required fields');
                return;
            }

            // Validate date
            const selectedDate = new Date(date);
            const today = new Date();
            if (selectedDate < today) {
                alert('Please select a future date');
                return;
            }

            // Show success message
            alert('Booking successful! You will receive a confirmation email shortly.');
            
            // Redirect to my bookings page
            window.location.href = 'my-bookings.html';
        });
    }

    // Set minimum date for booking to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        const today = new Date().toISOString().split('T')[0];
        input.setAttribute('min', today);
    });
});
