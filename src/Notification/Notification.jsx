import { useAppointment } from './AppointmentContext'
import './Notification.css'

function Notification({ children }) {
  const { appointment, cancelAppointment } = useAppointment()

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
      {children}
    </>
  )
}

export default Notification
