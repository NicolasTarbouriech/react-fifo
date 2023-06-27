import { Dispatch, SetStateAction } from "react";

export interface ContextValue {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  onLogin: (email: string) => Promise<void>;
  onLogout: () => void;
}

export interface IAuth {
  accessToken: string;
}
