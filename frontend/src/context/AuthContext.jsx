import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider ({ children }){
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));

    const login = (newToken) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
    };

    const value = {
        token,
        isAuthenticated: !!token,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used inside an AuthProvider');
    }
    return context;
}