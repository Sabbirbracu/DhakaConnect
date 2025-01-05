
import React, { createContext, useState } from 'react';

export const TripContext = createContext();

const TripProvider = ({ children }) => {
  const [trip, setTrip] = useState(null);

  return (
    <TripContext.Provider value={{ trip, setTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export default TripProvider;
