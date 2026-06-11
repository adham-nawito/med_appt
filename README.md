# grihf-frontend_capstone_starter_code

# Medical Appointment Booking

Welcome to the Medical Appointment Booking website project!

## Project Overview
This project is a web application designed to help users book medical appointments online. It provides a user-friendly interface for patients to schedule appointments with healthcare providers, view available time slots, and manage their bookings.

## Features
- Browse and search for healthcare providers
- View available appointment slots
- Book, reschedule, or cancel appointments
- User authentication and profile management
- Responsive design for desktop and mobile devices

## Getting Started
1. Clone the repository:
   ```
   git clone https://github.com/adham-nawito/med_appt.git
   ```
2. Navigate to the project directory:
   ```
   cd grihf-frontend_capstone_starter_code
   ```
3. Install frontend dependencies:
   ```
   pnpm install
   ```
4. Install backend dependencies:
   ```
   cd server && npm install
   ```
5. Start the development server:
   ```
   pnpm run dev
   ```

## Folder Structure
- `src/` — React frontend source code
  - `Components/` — Reusable components (DoctorCard, AppointmentForm, ProfileCard, ReportsLayout, etc.)
  - `Navbar/` — Navigation bar component
  - `Landing_Page/` — Landing page component
  - `Login/` — Login page component
  - `Sign_Up/` — Sign up page component
  - `Notification/` — Appointment notification and context
- `server/` — Express.js backend
  - `routes/` — API routes (auth)
  - `models/` — Mongoose models
  - `db.js` — MongoDB connection
  - `index.js` — Server entry point
- `public/` — Static assets

## Notes
- Ensure MongoDB is running locally before starting the server.
- The backend runs on `http://localhost:8181`.
- Refer to `src/config.js` to configure the API URL for different environments.

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License
This project is for educational purposes.