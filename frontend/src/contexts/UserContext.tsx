import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Read user data from local storage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user)); // Save user to local storage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from local storage
  };

  useEffect(() => {
    // Sync user data with local storage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
