import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';
import findIcon from '../../assets/find.png';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/instant-consultation?speciality=${speciality}`);
    }

    return (
        <div className='finddoctor'>
            <div className="home-search-container">
                <div className="doctor-search-box">
                    <input
                        type="text"
                        className="search-doctor-input-box"
                        placeholder="Search doctors, clinics, hospitals, etc."
                        onFocus={() => setDoctorResultHidden(false)}
                        onBlur={() => setDoctorResultHidden(true)}
                        value={searchDoctor}
                        onChange={(e) => setSearchDoctor(e.target.value)}
                    />
                    <div className="findiconimg">
                        <img className='findIcon' src={findIcon} alt="search" />
                    </div>
                    <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                        {initSpeciality.map(speciality => (
                            <button
                                className="search-doctor-result-item"
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
        </div>
    )
}

export default FindDoctorSearch
