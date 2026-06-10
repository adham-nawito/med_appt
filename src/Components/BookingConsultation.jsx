import { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard/DoctorCard';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';

function BookingConsultation() {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (speciality) => {
    const results = doctors.filter(d =>
      d.speciality.toLowerCase().includes(speciality.toLowerCase())
    );
    setFiltered(results);
    setIsSearched(true);
  };

  const displayed = isSearched ? filtered : doctors;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <FindDoctorSearch onSearch={handleSearch} />
      <h2>{displayed.length} doctors available</h2>
      <h3 style={{ fontWeight: 'normal', marginBottom: '1.5rem' }}>
        Book appointments with minimum wait-time &amp; verified doctor details
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {displayed.map((doc) => (
          <DoctorCard key={doc.name} {...doc} />
        ))}
      </div>
    </div>
  );
}

export default BookingConsultation;