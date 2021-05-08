import React, { useState, useEffect, useContext, createContext } from 'react';
import { firebaseClient } from './firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  firebaseClient();
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    setLoading(false)
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        return;
      }
      setUser(user);
    })
  },[]);

  return <AuthContext.Provider value={{user}}>
    {!loading && children}
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;