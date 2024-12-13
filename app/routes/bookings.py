from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user
from app import db
from app.models.booking import Booking
from app.models.temple import Temple
from datetime import datetime

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/book/<int:temple_id>', methods=['GET', 'POST'])
@login_required
def book_temple(temple_id):
    temple = Temple.query.get_or_404(temple_id)
    
    if request.method == 'POST':
        try:
            booking_date = datetime.strptime(request.form.get('booking_date'), '%Y-%m-%d').date()
            num_tickets = int(request.form.get('num_tickets', 1))
            
            if num_tickets < 1 or num_tickets > 10:
                flash('Number of tickets must be between 1 and 10', 'error')
                return redirect(url_for('bookings.book_temple', temple_id=temple_id))
            
            if booking_date < datetime.now().date():
                flash('Booking date must be in the future', 'error')
                return redirect(url_for('bookings.book_temple', temple_id=temple_id))
            
            booking = Booking(
                user_id=current_user.id,
                temple_id=temple_id,
                booking_date=booking_date,
                num_tickets=num_tickets
            )
            
            booking.calculate_total_price()
            
            db.session.add(booking)
            db.session.commit()
            
            flash('Booking successful!', 'success')
            return redirect(url_for('bookings.my_bookings'))
            
        except ValueError as e:
            flash('Invalid input data. Please check your entries.', 'error')
            return redirect(url_for('bookings.book_temple', temple_id=temple_id))
    
    return render_template('book_temple.html', temple=temple)

@bookings_bp.route('/my-bookings')
@login_required
def my_bookings():
    bookings = Booking.query.filter_by(user_id=current_user.id).all()
    return render_template('my_bookings.html', bookings=bookings)

@bookings_bp.route('/cancel-booking/<int:booking_id>', methods=['POST'])
@login_required
def cancel_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    
    # Ensure user can only cancel their own bookings
    if booking.user_id != current_user.id:
        flash('Unauthorized to cancel this booking', 'error')
        return redirect(url_for('bookings.my_bookings'))
    
    booking.status = 'Cancelled'
    db.session.commit()
    
    flash('Booking cancelled successfully', 'info')
    return redirect(url_for('bookings.my_bookings'))
