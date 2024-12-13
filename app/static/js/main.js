document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchForm = document.querySelector('form[action*="search"]');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[name="query"]');
            if (searchInput.value.trim() === '') {
                e.preventDefault();
                alert('Please enter a search term');
            }
        });
    }

    // Dynamic temple card hover effects
    const templeCards = document.querySelectorAll('.card');
    templeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('shadow-lg');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('shadow-lg');
        });
    });

    // Booking date validation
    const bookingForm = document.querySelector('form[action*="book"]');
    if (bookingForm) {
        const bookingDateInput = bookingForm.querySelector('input[name="booking_date"]');
        const today = new Date().toISOString().split('T')[0];
        
        bookingDateInput.setAttribute('min', today);
        
        bookingForm.addEventListener('submit', function(e) {
            const selectedDate = new Date(bookingDateInput.value);
            const currentDate = new Date();
            
            if (selectedDate < currentDate) {
                e.preventDefault();
                alert('Please select a future date for booking');
            }
        });
    }

    // Ticket number validation
    const ticketInput = document.querySelector('input[name="num_tickets"]');
    if (ticketInput) {
        ticketInput.addEventListener('input', function() {
            if (this.value < 1) {
                this.value = 1;
            }
            if (this.value > 10) {
                this.value = 10;
                alert('Maximum 10 tickets can be booked at once');
            }
        });
    }
});
