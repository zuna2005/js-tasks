import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.ts";
import { checkAuth } from "../api/authApi.ts";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth()
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
