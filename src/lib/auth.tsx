import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterUserData) => Promise<void>;
  logout: () => void;
}

// Define user interface
interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  userType?: string;
}

// Define the register user data interface
interface RegisterUserData {
  username: string;
  password: string;
  email: string;
  fullName: string;
  userType: string;
  bio?: string;
  profileImage?: string;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// Create the auth provider
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // Replace with your actual auth check logic
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // If there's an error, make sure to clear user state
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Replace with your actual login logic
    setIsLoading(true);
    try {
      // Simulate API call
      const user = { 
        id: '1', 
        email, 
        name: email.split('@')[0] // Just using email as name for demonstration
      };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Add the register function
  const register = async (userData: RegisterUserData) => {
    setIsLoading(true);
    try {
      // Simulate API call for registration
      // In a real app, you would send this data to your backend
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        email: userData.email,
        name: userData.fullName,
        username: userData.username,
        userType: userData.userType
      };
      
      // Store user in local storage for this demo
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Create the useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}