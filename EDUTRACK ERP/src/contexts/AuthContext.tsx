import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: User['role']) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: User['role']) => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      name: role === 'admin' ? 'Admin User' : role === 'staff' ? 'Staff Member' : 'John Student',
      email,
      role,
      avatar: `https://images.pexels.com/photos/${role === 'admin' ? '1239291' : role === 'staff' ? '733872' : '1858175'}/pexels-photo-${role === 'admin' ? '1239291' : role === 'staff' ? '733872' : '1858175'}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2`
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};