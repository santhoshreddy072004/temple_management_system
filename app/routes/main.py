from flask import Blueprint, render_template
from app.models.temple import Temple

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    # Fetch popular temples
    popular_temples = Temple.query.limit(6).all()
    return render_template('index.html', popular_temples=popular_temples)

@main_bp.route('/about')
def about():
    return render_template('about.html')

@main_bp.route('/contact')
def contact():
    return render_template('contact.html')
