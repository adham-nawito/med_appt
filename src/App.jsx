import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import LandingPage from './Landing_Page/LandingPage'
import Login from './Login/Login'
import SignUp from './Sign_Up/SignUp'
import Notification from './Notification/Notification'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Notification>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  )
}

export default App
