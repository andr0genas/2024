import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Use named export
import { apiClient } from "./api"; // Make sure apiClient is properly set up for your API requests

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        setToken(storedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  const loginUser = async (data) => {
    try {
      const response = await apiClient.post("/users/login", {
        login: data.login,
        password: data.password,
      });

      if (response.data && response.data.token) {
        const responseToken = response.data.token;
        const decodedUser = jwtDecode(responseToken); // Correct usage

        localStorage.setItem("token", responseToken);
        setToken(responseToken);
        setUser(decodedUser);

        return { token: responseToken, user: decodedUser };
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Failed to log in:", error);
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated: !!token,
        isAdmin: user?.role === "admin",
        token,
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};