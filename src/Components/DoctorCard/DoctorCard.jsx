import React, { useState } from 'react';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { useAppointment } from '../../Notification/AppointmentContext';

const DoctorCard = ({ name, speciality, experience, ratings }) => {
  const stars = Math.round(Number(ratings));
  const [showForm, setShowForm] = useState(false);
  const [booked, setBooked] = useState(null);
  const { bookAppointment, cancelAppointment } = useAppointment();

  const handleSubmit = (data) => {
    setBooked(data);
    setShowForm(false);
    bookAppointment({ doctor: data.doctorName, date: data.date, time: data.slot });
  };

  const handleCancel = () => {
    setBooked(null);
    cancelAppointment();
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#aaa" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {[1, 2, 3, 4, 5].map(s => (
              <span key={s} className={`card-star ${s <= stars ? 'filled' : ''}`}>★</span>
            ))}
          </div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        {booked ? (
          <div className="booked-info">
            <p>✓ Appointment booked for <strong>{booked.date}</strong> at <strong>{booked.slot}</strong></p>
            <button className="cancel-booking-btn" onClick={handleCancel}>Cancel Appointment</button>
          </div>
        ) : (
          <button className="book-appointment-btn" onClick={() => setShowForm(true)}>
            <div>Book Appointment</div>
            <div>No Booking Fee</div>
          </button>
        )}
      </div>

      {showForm && (
        <AppointmentForm
          doctorName={name}
          doctorSpeciality={speciality}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default DoctorCard;
