import React, {
  useState, useEffect, useContext, createContext,
} from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { firebaseClient } from './firebaseClient';
import 'firebase/auth';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    return firebase.auth().onIdTokenChanged(async (authUser) => {
      if (!authUser) {
        setUser(null);
        return;
      }
      setUser(authUser);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node,
};

AuthProvider.defaultProps = {
  children: {},
};

export default AuthProvider;
