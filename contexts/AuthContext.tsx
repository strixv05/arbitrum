"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { useLoginContext } from "./LoginContext";

interface IAuthState {}

const AuthContext = createContext<IAuthState>({} as IAuthState);

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathName = usePathname();
  const { address } = useLoginContext();

  useEffect(() => {
    // If not login, should redirect to login
    if (!address && pathName !== "/") router.push("/");
  }, [address, pathName, router]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
