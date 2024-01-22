import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const login = (email, password) => {
      axios.post("http://localhost:3000/login", { email, password })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);

        // Set a default header for all requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.authToken}`;
        setIsUserLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
        toast.error(error.response.data.message);
      });
  
  };

  const logout = () => {
    delete axios.defaults.headers.common['Authorization'];
    setIsUserLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};