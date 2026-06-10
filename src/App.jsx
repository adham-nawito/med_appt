import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import LandingPage from './Landing_Page/LandingPage'
import Login from './Login/Login'
import SignUp from './Sign_Up/SignUp'
import Notification from './Notification/Notification'
import { AppointmentProvider } from './Notification/AppointmentContext'
import ReviewForm from './Components/ReviewForm/ReviewForm'
import BookingConsultation from './Components/BookingConsultation'
import ProfileCard from './Components/ProfileCard/ProfileCard'
import ReportsLayout from './Components/ReportsLayout/ReportsLayout'
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
              <Route path="/reviews" element={<ReviewForm />} />
              <Route path="/appointments" element={<BookingConsultation />} />
              <Route path="/profile" element={<ProfileCard />} />
              <Route path="/reports" element={<ReportsLayout />} />
            </Routes>
          </Notification>
        </AppointmentProvider>
      </BrowserRouter>
    </div>
  )
}

export default App