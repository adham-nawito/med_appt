import React, { useState } from 'react';
import './ReviewForm.css';
import GiveReviews from './GiveReviews';

const doctors = [
  { id: 1, name: 'Dr. John Doe', speciality: 'Cardiology' },
  { id: 2, name: 'Dr. Jane Smith', speciality: 'Dermatology' },
];

function ReviewForm() {
  const [activeForm, setActiveForm] = useState(null);
  const [submitted, setSubmitted] = useState({});

  const handleSubmit = (reviewData) => {
    setSubmitted({ ...submitted, [reviewData.doctor.id]: reviewData });
    setActiveForm(null);
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
                  onClick={() => setActiveForm(doctor.id)}
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
        <GiveReviews
          doctor={doctors.find(d => d.id === activeForm)}
          onSubmit={handleSubmit}
          onClose={() => setActiveForm(null)}
        />
      )}
    </div>
  );
}

export default ReviewForm;
