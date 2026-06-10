import { useState } from 'react'
import { Link } from 'react-router-dom'
import findLogo from '../assets/find.png'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <Link to="/" className="title" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        StayHealthy <img style={{ width: '30px' }} src={findLogo} alt="Logo" />
      </Link>
      <button className="hamburger" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>&#9776;</button>
      <div className={`navbar-items${menuOpen ? ' open' : ''}`}>
        <Link to="/">Home</Link>
        <a href="#Appointments">Appointments</a>
        <Link to="/signup"><button className="btn-secondary" type="button">Sign Up</button></Link>
        <Link to="/login"><button className="btn-primary" type="button">Login</button></Link>
      </div>
    </nav>
  )
}

export default Navbar
