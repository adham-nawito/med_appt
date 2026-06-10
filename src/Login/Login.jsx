import { useState } from 'react'
import { Link } from 'react-router-dom'
import hideIcon from '../assets/hide.png'
import './Login.css'

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="container">
      <h1>Login</h1>
      <p>
        Are you a new member?{' '}
        <Link to="/signup" style={{ color: 'var(--color-primary)' }}>Sign Up here</Link>
      </p>
      <form>
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
      <a style={{ marginTop: '10px', cursor: 'pointer' }}>Forgot Password?</a>
    </main>
  )
}

export default Login
