// SessionContext.js
import { createContext, useEffect, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const updateUserData = (newData) => {
    setUserData({ ...userData, ...newData });
    localStorage.setItem('userData', JSON.stringify(newData));
  };

  const deleteUserData = () => {
    setUserData({});
    localStorage.removeItem('userData');
  };

  return (
    <SessionContext.Provider value={{ userData, updateUserData, deleteUserData }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
