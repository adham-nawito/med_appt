import { useState } from 'react';
import './ReportsLayout.css';

const initialReports = [
  { id: 1, doctor: 'Dr. John Doe', speciality: 'Cardiology', reportFile: '/patient_report.pdf' },
  { id: 2, doctor: 'Dr. Jane Smith', speciality: 'Dermatology', reportFile: '/patient_report.pdf' },
];

function ReportsLayout() {
  const [reports] = useState(initialReports);
  const [error] = useState(null);

  if (error) {
    return (
      <div className="reports-layout">
        <h1>Reports</h1>
        <div className="reports-error">
          <p>Failed to load reports. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-layout">
      <h1>Reports</h1>

      {reports.length === 0 ? (
        <div className="reports-empty">
          <p>You have no reports available at the moment.</p>
        </div>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report.id}>
                <td>{index + 1}</td>
                <td>{report.doctor}</td>
                <td>{report.speciality}</td>
                <td>
                  <a
                    href={report.reportFile}
                    target="_blank"
                    rel="noreferrer"
                    className="report-btn"
                  >
                    View Report
                  </a>
                </td>
                <td>
                  <a
                    href={report.reportFile}
                    download={`patient_report_${report.doctor.replace(/\s+/g, '_').toLowerCase()}.pdf`}
                    className="report-btn"
                  >
                    Download Report
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReportsLayout;