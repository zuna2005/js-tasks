import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.ts";

const apiUrl = import.meta.env.VITE_API_URL;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/auth/check`, { withCredentials: true })
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
