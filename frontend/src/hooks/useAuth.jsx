import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
    localStorage.setItem('userToken', token);
    setIsAuth(true);
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
      removeToken,
      getAuthHeader,
      getToken,
    }
  ), [isAuth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
