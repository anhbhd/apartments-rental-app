import React, { createContext } from "react";

export const userAuthContext = createContext<any>(null);

interface IUserAuthContextProviderProps {
  children: React.ReactNode;
}

const UserAuthContextProvider = ({
  children,
}: IUserAuthContextProviderProps) => {
  return (
    <userAuthContext.Provider value={2}>{children}</userAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
