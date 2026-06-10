import { useState } from 'react'
import { Link } from 'react-router-dom'
import findLogo from '../assets/find.png'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <nav className="navbar">
      <Link to="/" className="title" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        StayHealthy <img style={{ width: '30px' }} src={findLogo} alt="Logo" />
      </Link>
      <button className="hamburger" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>&#9776;</button>
      <div className={`navbar-items${menuOpen ? ' open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/reviews">Reviews</Link>
        <a href="#Appointments">Appointments</a>
        <Link to="/signup"><button className="btn-secondary" type="button">Sign Up</button></Link>
        <Link to="/login"><button className="btn-primary" type="button">Login</button></Link>

        <div className="profile-dropdown">
          <button
            className="profile-dropdown-trigger"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            ▾
          </button>
          {profileOpen && (
            <div className="profile-dropdown-menu">
              <Link to="/profile" onClick={() => setProfileOpen(false)}>My Profile</Link>
              <Link to="/reports" onClick={() => setProfileOpen(false)}>Your Reports</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar