import React, { createContext, FC, PropsWithChildren, useContext } from "react";
import { usePersistState } from "../utils/use-persist-state";

interface ISessionContext {
  sessionToken: string | undefined;
  setSessionToken: (st: string | undefined) => void;
  clearSessionToken: () => void;
}

export const SessionContext = createContext<ISessionContext>({} as ISessionContext);

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sessionToken, setSessionToken] = usePersistState<string | undefined>("sessionToken");

  const clearSessionToken = () => setSessionToken(undefined);

  const value = { sessionToken, setSessionToken, clearSessionToken };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => useContext(SessionContext);
