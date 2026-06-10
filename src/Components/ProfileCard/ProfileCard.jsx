import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './ProfileCard.css';

function ProfileCard() {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem('auth-token');
    if (!authtoken) {
      navigate('/login');
    } else {
      fetchUserProfile();
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
      console.error(error);
    }
  };

  const handleEdit = () => {
    setUpdatedDetails(userDetails);
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        alert('Profile Updated Successfully!');
        navigate('/');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
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

        {editMode ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <div className="profile-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userDetails.email || ''}
                disabled
              />
            </div>
            <div className="profile-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={updatedDetails.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="profile-field">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={updatedDetails.phone || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="profile-actions">
              <button type="submit" className="profile-save-btn">Save</button>
              <button type="button" className="profile-cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
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
                <span className="detail-value">{userDetails.createdAt ? new Date(userDetails.createdAt).toLocaleDateString() : ''}</span>
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