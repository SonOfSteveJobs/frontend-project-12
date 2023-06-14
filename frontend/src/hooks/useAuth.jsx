import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    console.log(isLoading, '-IS LOADING')
    console.log('IS AUTH:', isAuth);

    const setToken = (token) => {
        localStorage.setItem('userToken', token);
        setIsAuth(true);
    }

    const removeToken = () => {
        localStorage.removeItem('userToken');
        setIsAuth(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setIsAuth(true);
        }
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, isLoading, setToken, removeToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};