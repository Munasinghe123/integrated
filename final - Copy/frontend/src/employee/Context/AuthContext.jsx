// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/check-session')
    .then(response => {
      setUser(response.data.user);
    })
    .catch(() => setUser(null))
    .finally(() => setLoading(false)); 
  }, []);

  const login = async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = () => {
    return axios.post('http://localhost:5000/api/auth/logout')
      .then(() => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };