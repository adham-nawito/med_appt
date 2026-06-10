import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import LandingPage from './Landing_Page/LandingPage'
import Login from './Login/Login'
import SignUp from './Sign_Up/SignUp'
import Notification from './Notification/Notification'
import { AppointmentProvider } from './Notification/AppointmentContext'
import InstantConsultation from './InstantConsultationBooking/InstantConsultation'
import ReviewForm from './Components/ReviewForm/ReviewForm'
import DoctorCard from './Components/DoctorCard/DoctorCard'
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch'
import { useEffect, useState } from 'react'
import './App.css'

function DoctorsPage() {
  const [doctors, setDoctors] = useState([])
  const [filtered, setFiltered] = useState([])
  const [isSearched, setIsSearched] = useState(false)

  useEffect(() => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err))
  }, [])

  const handleSearch = (speciality) => {
    const results = doctors.filter(d =>
      d.speciality.toLowerCase().includes(speciality.toLowerCase())
    )
    setFiltered(results)
    setIsSearched(true)
  }

  const displayed = isSearched ? filtered : doctors

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <FindDoctorSearch onSearch={handleSearch} />
      <h2>{displayed.length} doctors available</h2>
      <h3 style={{ fontWeight: 'normal', marginBottom: '1.5rem' }}>
        Book appointments with minimum wait-time &amp; verified doctor details
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {displayed.map((doc) => (
          <DoctorCard key={doc.name} {...doc} />
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppointmentProvider>
          <Navbar />
          <Notification>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/instant-consultation" element={<InstantConsultation />} />
              <Route path="/reviews" element={<ReviewForm />} />
              <Route path="/doctors" element={<DoctorsPage />} />
            </Routes>
          </Notification>
        </AppointmentProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
