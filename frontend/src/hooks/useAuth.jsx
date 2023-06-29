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
    }
  ), [isAuth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
