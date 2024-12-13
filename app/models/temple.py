from app import db
from sqlalchemy.sql import func

class Temple(db.Model):
    __tablename__ = 'temples'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    
    # Relationship with bookings
    bookings = db.relationship('Booking', backref='temple', lazy='dynamic', cascade='all, delete-orphan')
    
    # Additional temple details
    historical_significance = db.Column(db.Text)
    architectural_style = db.Column(db.String(100))
    best_time_to_visit = db.Column(db.String(100))
    visiting_hours = db.Column(db.String(100))
    ticket_price = db.Column(db.Float, nullable=False, default=100.0)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'description': self.description,
            'image_url': self.image_url,
            'historical_significance': self.historical_significance,
            'architectural_style': self.architectural_style,
            'best_time_to_visit': self.best_time_to_visit,
            'visiting_hours': self.visiting_hours,
            'ticket_price': self.ticket_price
        }
