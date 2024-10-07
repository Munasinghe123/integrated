// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/check-session')
      .then(response => setUser(response.data.user))
      .catch(() => setUser(null));
  }, []);

  const login = async (credentials) => {
    const response = await axios.post('http://localhost:3001/api/auth/login', credentials);
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = () => {
    return axios.post('http://localhost:3001/api/auth/logout')
      .then(() => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };