import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './ProfileCard.css';

function ProfileCard() {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem('auth-token');
    if (authtoken) {
      fetchUserProfile();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem('auth-token');
      const email = sessionStorage.getItem('email');

      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          Email: email,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
        setUpdatedDetails(user);
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      setApiError(error.message || 'Could not load profile. Please try again.');
    }
  };

  const handleEdit = () => {
    setUpdatedDetails(userDetails);
    setFieldErrors({});
    setApiError('');
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const validate = () => {
    const errors = {};
    if (!updatedDetails.name || updatedDetails.name.trim().length < 4) {
      errors.name = 'Name must be at least 4 characters.';
    }
    if (!updatedDetails.phone || updatedDetails.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Phone must be at least 10 digits.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const authtoken = sessionStorage.getItem('auth-token');
      const email = sessionStorage.getItem('email');

      if (!authtoken || !email) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authtoken}`,
          'Content-Type': 'application/json',
          Email: email,
        },
        body: JSON.stringify({ name: updatedDetails.name, phone: updatedDetails.phone }),
      });

      if (response.ok) {
        sessionStorage.setItem('name', updatedDetails.name);
        sessionStorage.setItem('phone', updatedDetails.phone);
        setUserDetails(updatedDetails);
        setEditMode(false);
        navigate('/profile');
      } else {
        const data = await response.json().catch(() => ({}));
        setApiError(data.message || 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      setApiError(error.message || 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#aaa" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>

        {apiError && !editMode && (
          <div className="profile-api-error">{apiError}</div>
        )}

        {editMode ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>

            {apiError && (
              <div className="profile-api-error">{apiError}</div>
            )}

            <div className="profile-field">
              <label htmlFor="profile-email">Email</label>
              <input
                id="profile-email"
                type="email"
                name="email"
                value={userDetails.email || ''}
                disabled
              />
            </div>
            <div className="profile-field">
              <label htmlFor="profile-name">Name</label>
              <input
                id="profile-name"
                type="text"
                name="name"
                value={updatedDetails.name || ''}
                onChange={handleInputChange}
              />
              {fieldErrors.name && (
                <span className="profile-error">{fieldErrors.name}</span>
              )}
            </div>
            <div className="profile-field">
              <label htmlFor="profile-phone">Phone</label>
              <input
                id="profile-phone"
                type="tel"
                name="phone"
                value={updatedDetails.phone || ''}
                onChange={handleInputChange}
              />
              {fieldErrors.phone && (
                <span className="profile-error">{fieldErrors.phone}</span>
              )}
            </div>
            <div className="profile-actions">
              <button type="submit" className="profile-save-btn" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                className="profile-cancel-btn"
                onClick={() => { setEditMode(false); setApiError(''); setFieldErrors({}); }}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <h2>Welcome, {userDetails.name}</h2>
            <p className="profile-email">{userDetails.email}</p>
            <div className="profile-details">
              <div className="profile-detail-item">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{userDetails.phone}</span>
              </div>
              <div className="profile-detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{userDetails.email}</span>
              </div>
              <div className="profile-detail-item">
                <span className="detail-label">Role</span>
                <span className="detail-value">{userDetails.role}</span>
              </div>
              <div className="profile-detail-item">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">
                  {userDetails.createdAt ? new Date(userDetails.createdAt).toLocaleDateString() : ''}
                </span>
              </div>
            </div>
            <button className="profile-edit-btn" onClick={handleEdit}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;