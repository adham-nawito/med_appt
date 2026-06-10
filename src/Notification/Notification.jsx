import { useState } from 'react'
import './Notification.css'

function Notification({ children }) {
  const [appointment, setAppointment] = useState(null)

  const bookAppointment = (details) => {
    setAppointment(details)
  }

  const cancelAppointment = () => {
    setAppointment(null)
  }

  return (
    <>
      {appointment && (
        <div className="notification-bar">
          <span>
            Appointment booked with <strong>{appointment.doctor}</strong> on <strong>{appointment.date}</strong> at <strong>{appointment.time}</strong>
          </span>
          <button className="notification-cancel" onClick={cancelAppointment}>Cancel Appointment</button>
        </div>
      )}
      {/* Pass booking controls down via a render-prop style context if needed */}
      {children}
    </>
  )
}

export default Notification
