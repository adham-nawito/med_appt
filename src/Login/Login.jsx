import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hideIcon from '../assets/hide.png'
import { API_URL } from '../config'
import './Login.css'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (response.ok) {
        sessionStorage.setItem('auth-token', data.authtoken)
        sessionStorage.setItem('email', form.email)
        navigate('/')
      } else {
        setError(data.error || data.errors?.[0]?.msg || 'Login failed')
      }
    } catch (err) {
      setError('Unable to connect to server. Is the server running?')
      console.error(err)
    }
  }

  return (
    <main className="container">
      <h1>Login</h1>
      <p>
        Are you a new member?{' '}
        <Link to="/signup" style={{ color: 'var(--color-primary)' }}>Sign Up here</Link>
      </p>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              <img src={hideIcon} alt="Toggle password" width="18" />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          <button type="submit" className="btn-primary">Submit</button>
          <input type="reset" className="btn-alert" />
        </div>
      </form>
      <button type="button" style={{ marginTop: '10px', background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>Forgot Password?</button>
    </main>
  )
}

export default Login