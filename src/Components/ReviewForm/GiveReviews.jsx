import React, { useState } from 'react';
import './ReviewForm.css';

function GiveReviews({ doctor, onSubmit, onClose }) {
  const [formData, setFormData] = useState({ name: '', review: '', rating: 0 });
  const [showWarning, setShowWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.review || formData.rating === 0) {
      setShowWarning(true);
      return;
    }
    setSubmitted(true);
    onSubmit({ ...formData, doctor });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Give Your Review</h2>
        {showWarning && <p className="warning">Please fill out all fields.</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={submitted}
            />
          </div>
          <div className="form-group">
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              rows={4}
              disabled={submitted}
            />
          </div>
          <div className="form-group">
            <label>Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${formData.rating >= star ? 'filled' : ''}`}
                  onClick={() => !submitted && handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button type="submit" className="submit-btn" disabled={submitted}>
              {submitted ? 'Review Given' : 'Submit'}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GiveReviews;
