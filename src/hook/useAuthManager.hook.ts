import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IUser } from "../interface/user.interface";

export function useAuthRequest() {
  const navigate = useNavigate();
  const [state, setState] = useState<any>(null);

  const handleSubmit = async (email: string) => {
    try {
      await axios.post<IUser>('/auth/sign-up', {
          email
        }
      )
      navigate('/login');
   } catch (error) {
      setState(error)
    }
  };

  return { handleSubmit, state };
}
