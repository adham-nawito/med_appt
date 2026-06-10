import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';
import findIcon from '../../assets/find.png';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

const FindDoctorSearch = ({ onSearch }) => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        if (onSearch) {
            onSearch(speciality);
        } else {
            navigate(`/doctors?speciality=${speciality}`);
        }
    }

    return (
        <div className="fds-container">
            <div className="fds-box">
                <input
                    type="text"
                    className="fds-input"
                    placeholder="Search doctors by specialty"
                    onFocus={() => setDoctorResultHidden(false)}
                    onBlur={() => setDoctorResultHidden(true)}
                    value={searchDoctor}
                    onChange={(e) => setSearchDoctor(e.target.value)}
                />
                <div className="fds-icon">
                    <img src={findIcon} alt="search" />
                </div>
                <div className="fds-results" hidden={doctorResultHidden}>
                    {initSpeciality.map(speciality => (
                        <button
                            className="fds-result-item"
                            key={speciality}
                            onMouseDown={() => handleDoctorSelect(speciality)}
                        >
                            <span><img src={findIcon} alt="" style={{ height: '10px', width: '10px' }} /></span>
                            <span>{speciality}</span>
                            <span>SPECIALITY</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FindDoctorSearch
