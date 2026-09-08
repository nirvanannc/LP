import React, { createContext, useContext, useState } from "react";

const PrefillContext = createContext({ prefill: null, setPrefill: () => {} });

export const PrefillProvider = ({ children }) => {
  const [prefill, setPrefill] = useState(null);
  return (
    <PrefillContext.Provider value={{ prefill, setPrefill }}>{children}</PrefillContext.Provider>
  );
};

export const useBookingPrefill = () => useContext(PrefillContext);
