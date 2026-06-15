import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            try {
                const res = await fetch ('/api/auth/status', {
                    method:'GET',
                    credentials: 'include'
                });
                if(res.ok){
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error('Session verification error:', err);
                setIsAuthenticated(false);
            } finally {
                setIsloading(false);
            }
        };
        verifySession();
    }, []);

    const login = async (username, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                credentials: "include",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({username, password})
            });

            if(!res.ok){
                const errorData = await res.json();
                return {success: false, error: errorData.message};
            }
            setIsAuthenticated(true);
            return {success:true};
        } catch (err) {
            console.error('Session failure:', err);
            return {success: false, error: 'Network error'};
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setIsAuthenticated(false);
        }
    };

    return(
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);