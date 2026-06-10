import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import LandingPage from './Landing_Page/LandingPage'
import Login from './Login/Login'
import SignUp from './Sign_Up/SignUp'
import Notification from './Notification/Notification'
import { AppointmentProvider } from './Notification/AppointmentContext'
import InstantConsultation from './InstantConsultationBooking/InstantConsultation'
import ReviewForm from './Components/ReviewForm/ReviewForm'
import './App.css'

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
            </Routes>
          </Notification>
        </AppointmentProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
