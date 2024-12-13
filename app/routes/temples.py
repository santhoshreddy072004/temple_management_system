from flask import Blueprint, render_template, request, jsonify
from app.models.temple import Temple
from app import db

temples_bp = Blueprint('temples', __name__)

@temples_bp.route('/temples')
def list_temples():
    # Fetch all temples with pagination
    page = request.args.get('page', 1, type=int)
    per_page = 12
    temples = Temple.query.paginate(page=page, per_page=per_page, error_out=False)
    
    return render_template('temples.html', temples=temples)

@temples_bp.route('/temple/<int:temple_id>')
def temple_details(temple_id):
    temple = Temple.query.get_or_404(temple_id)
    return render_template('temple_details.html', temple=temple)

@temples_bp.route('/search')
def search_temples():
    query = request.args.get('query', '')
    temples = Temple.query.filter(
        db.or_(
            Temple.name.ilike(f'%{query}%'), 
            Temple.location.ilike(f'%{query}%'), 
            Temple.description.ilike(f'%{query}%')
        )
    ).all()
    
    return render_template('search_results.html', temples=temples, query=query)
