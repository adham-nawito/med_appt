import React, { useState } from 'react';
import './AppointmentForm.css';

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    date: '',
    slot: '',
  });
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required.';
    else if (!/^\d{7,15}$/.test(formData.phoneNumber.trim())) newErrors.phoneNumber = 'Enter a valid phone number.';
    if (!formData.date) newErrors.date = 'Please select a date.';
    if (!formData.slot) newErrors.slot = 'Please select a time slot.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({ ...formData, doctorName, doctorSpeciality });
  };

  return (
    <div className="appt-modal-overlay">
      <div className="appt-modal">
        <h2>Book Appointment</h2>
        <p className="appt-doctor-info">{doctorName} — <span>{doctorSpeciality}</span></p>

        <form onSubmit={handleSubmit} className="appt-form">
          <div className="appt-form-group">
            <label htmlFor="name">Patient Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="appt-error">{errors.name}</span>}
          </div>

          <div className="appt-form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <span className="appt-error">{errors.phoneNumber}</span>}
          </div>

          <div className="appt-form-group">
            <label htmlFor="date">Appointment Date</label>
            <input
              type="date"
              id="date"
              name="date"
              min={today}
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <span className="appt-error">{errors.date}</span>}
          </div>

          <div className="appt-form-group">
            <label>Time Slot</label>
            <div className="appt-slots">
              {timeSlots.map(slot => (
                <button
                  type="button"
                  key={slot}
                  className={`appt-slot ${formData.slot === slot ? 'selected' : ''}`}
                  onClick={() => { setFormData({ ...formData, slot }); setErrors({ ...errors, slot: '' }); }}
                >
                  {slot}
                </button>
              ))}
            </div>
            {errors.slot && <span className="appt-error">{errors.slot}</span>}
          </div>

          <div className="appt-actions">
            <button type="submit" className="appt-submit-btn">Book Now</button>
            <button type="button" className="appt-cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
