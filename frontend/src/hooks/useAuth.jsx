import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import routes from '../routes/routes';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenInStorage = !!localStorage.getItem('userToken');
  const [isAuth, setIsAuth] = useState(tokenInStorage);

  const getAuthHeader = () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    return userToken && userToken.token ? { Authorization: `Bearer ${userToken.token}` } : {};
  };

  const getToken = () => localStorage.getItem('userToken');

  const setToken = (token) => {
    localStorage.setItem('userToken', JSON.stringify(token));
    setIsAuth(true);
  };

  const logIn = async (values) => {
    try {
      const { data } = await axios.post(routes.login(), values);
      setToken(data);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const signUp = async (values) => {
    try {
      const { username, password } = values;
      const { data } = await axios.post(routes.signup(), { username, password });
      setToken(data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const removeToken = () => {
    localStorage.removeItem('userToken');
    setIsAuth(false);
  };

  useEffect(() => {
    if (!isAuth && tokenInStorage) {
      setIsAuth(true);
    }
  }, [isAuth, tokenInStorage]);

  const value = useMemo(() => (
    {
      isAuth,
      setToken,
      logIn,
      removeToken,
      getAuthHeader,
      getToken,
      signUp,
    }
  ), [isAuth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
