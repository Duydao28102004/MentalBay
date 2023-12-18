// SessionContext.js
import { createContext, useEffect, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [authenticated, setAuthenticated] = useState(() => {
    // Set the initial state based on local storage
    const storedAuthenticated = localStorage.getItem('authenticated');
    return storedAuthenticated ? JSON.parse(storedAuthenticated) : false;
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const updateUserData = (newData) => {
    setUserData({ ...userData, ...newData });
    localStorage.setItem('userData', JSON.stringify(newData));
    setAuthenticated(true);
    localStorage.setItem('authenticated', JSON.stringify(true));
  };

  const deleteUserData = () => {
    setUserData({});
    localStorage.removeItem('userData');
    setAuthenticated(false);
    localStorage.removeItem('authenticated');
  };

  return (
    <SessionContext.Provider value={{ authenticated, userData, updateUserData, deleteUserData }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
