import { createContext, useState } from 'react';
import staffData from '../data/garcons_entregadores.json';

export const StaffContext = createContext();

export function StaffProvider({ children }) {
  const [staff] = useState(staffData);

  return (
    <StaffContext.Provider value={staff}>
      {children}
    </StaffContext.Provider>
  );
}