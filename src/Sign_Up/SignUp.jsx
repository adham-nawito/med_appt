import { useState } from 'react'
import { Link } from 'react-router-dom'
import hideIcon from '../assets/hide.png'
import './Sign_Up.css'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="container">
      <h1>Sign Up</h1>
      <p>
        Already a member?{' '}
        <Link to="/login" style={{ color: 'var(--color-primary)' }}>Login</Link>
      </p>
      <form>
        <div className="form-item-container">
          <label htmlFor="role">Role *</label>
          <select id="role" name="role" required>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>

        <div className="form-item-container">
          <label htmlFor="name">Name *</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" required />
        </div>

        <div className="form-item-container">
          <label htmlFor="phone">Phone *</label>
          <input type="text" id="phone" name="phone" placeholder="Enter your phone number" required />
        </div>

        <div className="form-item-container">
          <label htmlFor="email">Email *</label>
          <input type="text" id="email" name="email" placeholder="Enter your email" required />
        </div>

        <div className="form-item-container">
          <label htmlFor="password">Password *</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              <img src={hideIcon} alt="Toggle password" width="18" />
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          <button type="submit" className="btn-primary">Submit</button>
          <input type="reset" className="btn-alert" />
        </div>
      </form>
    </main>
  )
}

export default SignUp
