import React, { useState } from 'react';
import './ReviewForm.css';

const doctors = [
  { id: 1, name: 'Dr. John Doe', speciality: 'Cardiology' },
  { id: 2, name: 'Dr. Jane Smith', speciality: 'Dermatology' },
];

function ReviewForm() {
  const [activeForm, setActiveForm] = useState(null);
  const [submitted, setSubmitted] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({ name: '', review: '', rating: 0 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleOpen = (doctorId) => {
    setActiveForm(doctorId);
    setShowWarning(false);
    setFormData({ name: '', review: '', rating: 0 });
  };

  const handleSubmit = (e, doctor) => {
    e.preventDefault();
    if (!formData.name || !formData.review || formData.rating === 0) {
      setShowWarning(true);
      return;
    }
    setSubmitted({ ...submitted, [doctor.id]: { ...formData, doctor } });
    setActiveForm(null);
    setShowWarning(false);
  };

  return (
    <div className="reviews-container">
      <h2>Reviews</h2>
      <table className="reviews-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor.id}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>
                <button
                  className="feedback-btn"
                  onClick={() => handleOpen(doctor.id)}
                  disabled={!!submitted[doctor.id]}
                >
                  Click Here
                </button>
              </td>
              <td>
                {submitted[doctor.id] && (
                  <div className="review-given">
                    <p><strong>{submitted[doctor.id].name}</strong></p>
                    <p>{submitted[doctor.id].review}</p>
                    <p>{'⭐'.repeat(submitted[doctor.id].rating)}</p>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {activeForm !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Give Your Review</h2>
            {showWarning && <p className="warning">Please fill out all fields.</p>}
            <form onSubmit={(e) => handleSubmit(e, doctors.find(d => d.id === activeForm))}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                />
              </div>
              <div className="form-group">
                <label>Rating:</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${formData.rating >= star ? 'filled' : ''}`}
                      onClick={() => handleRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" className="cancel-btn" onClick={() => setActiveForm(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
