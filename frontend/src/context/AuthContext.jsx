import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch('/api/auth/status', {
          method: 'GET',
          credentials: 'include'
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data.authenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error('Session verification error:', err);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);  
      }
    };

    verifySession();
  }, []);

  const handleAuthResponse = async (res) => {
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        error: data.message || 'Request failed.'
      };
    }

    setIsAuthenticated(true);
    setUser(data.user);
    return { success: true, user: data.user };
  };

  const login = async (username, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      return handleAuthResponse(res);
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Network error' };
    }
  };

  const register = async (username, password, email) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({ username, password, email })
      });

      return handleAuthResponse(res);
    } catch (err) {   
      console.error('Register error:', err);
      return { success: false, error: 'Network error. Try again.' };
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
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be inside AuthProvider');
  }

  return ctx;
}