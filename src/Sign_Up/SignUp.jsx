import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hideIcon from '../assets/hide.png'
import { API_URL } from '../config'
import './Sign_Up.css'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ role: 'patient', name: '', phone: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (response.ok) {
        sessionStorage.setItem('auth-token', data.authtoken)
        sessionStorage.setItem('email', form.email)
        sessionStorage.setItem('name', form.name)
        navigate('/')
      } else {
        setError(data.error || data.errors?.[0]?.msg || 'Registration failed')
      }
    } catch (err) {
      setError('Unable to connect to server')
    }
  }

  return (
    <main className="container">
      <h1>Sign Up</h1>
      <p>
        Already a member?{' '}
        <Link to="/login" style={{ color: 'var(--color-primary)' }}>Login</Link>
      </p>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-item-container">
          <label htmlFor="role">Role *</label>
          <select id="role" name="role" value={form.role} onChange={handleChange} required>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>

        <div className="form-item-container">
          <label htmlFor="name">Name *</label>
          <input type="text" id="name" name="name" placeholder="Enter your name (min 4 chars)" value={form.name} onChange={handleChange} required />
        </div>

        <div className="form-item-container">
          <label htmlFor="phone">Phone *</label>
          <input type="text" id="phone" name="phone" placeholder="Enter your phone number (min 10 digits)" value={form.phone} onChange={handleChange} required />
        </div>

        <div className="form-item-container">
          <label htmlFor="email">Email *</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="form-item-container">
          <label htmlFor="password">Password *</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password (min 8 chars)"
              value={form.password}
              onChange={handleChange}
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