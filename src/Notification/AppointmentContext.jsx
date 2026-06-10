import { createContext, useContext, useState } from 'react'

const AppointmentContext = createContext(null)

export function AppointmentProvider({ children }) {
  const [appointment, setAppointment] = useState(null)

  const bookAppointment = (details) => setAppointment(details)
  const cancelAppointment = () => setAppointment(null)

  return (
    <AppointmentContext.Provider value={{ appointment, bookAppointment, cancelAppointment }}>
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointment() {
  return useContext(AppointmentContext)
}
