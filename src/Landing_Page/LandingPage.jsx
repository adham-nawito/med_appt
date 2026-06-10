import { useAppointment } from '../Notification/AppointmentContext'
import './LandingPage.css'

function LandingPage() {
  const { bookAppointment } = useAppointment()

  const handleBook = () => {
    bookAppointment({ doctor: 'Dr. Smith', date: '2026-06-15', time: '10:00 AM' })
  }

  return (
    <section className="hero-section">
      <div>
        <div className="flex-hero">
          <h1>
            Your Health<br />
            <span className="text-gradient">Our Responsibility</span>
          </h1>
          <div className="blob-cont">
            <div className="blue blob"></div>
          </div>
          <div className="blob-cont">
            <div className="blue1 blob"></div>
          </div>
          <h4>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque at quae ducimus. Suscipit omnis quibusdam non cum rem voluptatem!
          </h4>
          <a href="#services">
            <button className="button">Get Started</button>
          </a>
          <a href="#book-appointment">
            <button className="button" onClick={handleBook}>Book Appointment</button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default LandingPage
