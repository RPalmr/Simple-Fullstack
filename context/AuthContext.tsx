import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";

type authContext = {
    user : User | null, isAuthReady: boolean
}
export const AuthContext = createContext<authContext>(
    { user: null, isAuthReady: false }
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsAuthReady(true);
    });
    return () => { unsubsribe() };
  }, []);
  return (
    <AuthContext.Provider value={{ user, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};
