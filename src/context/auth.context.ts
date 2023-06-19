import { createContext } from "react";
import { ContextValue } from "../interface/authContext.interface";

export const AuthContext = createContext<ContextValue>({
  token: null,
  setToken: () => {},
  onLogin: async () => {},
  onLogout: () => {}
});
