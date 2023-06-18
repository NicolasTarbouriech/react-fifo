import { createContext, Dispatch, SetStateAction } from "react";

export interface ContextValue {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  onLogin: (email: string) => Promise<void>;
  onLogout: () => void;
}

export const AuthContext = createContext<ContextValue>({
  token: null,
  setToken: () => {},
  onLogin: async () => {},
  onLogout: () => {}
});
