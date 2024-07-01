import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import useUserStore from "@store/userStore";
import { RegisterUserType } from "@customTypes/authTypes";
import { loginUser, registerUser } from "@services/authApi";

interface AuthContextData {
  isAuthenticated: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (user: RegisterUserType) => Promise<boolean>;
  signOut: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const userStore = useUserStore();

  const signIn = async (email: string, password: string) => {
    const res = await loginUser(email.toLowerCase(), password);
    if (res) {
      await AsyncStorage.setItem("userToken", res.token);
      userStore.setUser(res.user);
      setIsAuthenticated(true);
      router.replace("(app)/tabs");
      return true;
    } else {
      setError("Невірний email або пароль");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("userToken");
      console.log(token);
      setIsAuthenticated(!!token);
      if (token) {
        router.replace("(app)/tabs");
      } else {
        router.replace("(auth)/sign-in");
      }
    };

    checkAuth();
  }, []);

  const signUp = async (user: RegisterUserType): Promise<boolean> => {
    const res = await registerUser(user);
    if (res) {
      await AsyncStorage.setItem("userToken", res.token);
      userStore.setUser(res.user);
      setIsAuthenticated(true);
      router.replace("(app)/tabs");
      return true;
    } else {
      setError("Помилка реєстрації");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("userToken");
    setIsAuthenticated(false);
    console.log("Signed out");
  };

  const resetPassword = async (email: string) => {
    console.log(`Reset password for ${email}`);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        error,
        signIn,
        signOut,
        resetPassword,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
