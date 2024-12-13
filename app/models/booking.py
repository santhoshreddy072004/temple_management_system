from app import db
from sqlalchemy.sql import func

class Booking(db.Model):
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    temple_id = db.Column(db.Integer, db.ForeignKey('temples.id', ondelete='CASCADE'), nullable=False)
    booking_date = db.Column(db.Date, nullable=False)
    num_tickets = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    status = db.Column(db.String(20), default='Confirmed')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'temple_id': self.temple_id,
            'booking_date': self.booking_date.isoformat(),
            'num_tickets': self.num_tickets,
            'total_price': self.total_price,
            'status': self.status
        }
    
    def calculate_total_price(self):
        if self.temple and self.num_tickets:
            self.total_price = self.temple.ticket_price * self.num_tickets
