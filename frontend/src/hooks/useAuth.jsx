import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setToken = (token) => {
    localStorage.setItem('userToken', token);
    setIsAuth(true);
  };

  const removeToken = () => {
    localStorage.removeItem('userToken');
    setIsAuth(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  const value = useMemo(() => (
    {
      isAuth,
      isLoading,
      setToken,
      removeToken,
    }
  ), [isAuth, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
