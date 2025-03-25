import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Read authentication state from local storage
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Save to local storage
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Remove from local storage
    localStorage.removeItem('user'); // Remove user data from local storage
  };

  useEffect(() => {
    // Sync state with local storage on app reload
    const storedAuthState = localStorage.getItem('isAuthenticated') === 'true';
    if (storedAuthState !== isAuthenticated) {
      setIsAuthenticated(storedAuthState);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
