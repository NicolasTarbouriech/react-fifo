import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IUser } from "../interface/user.interface";
import { useAlertHook } from "./useAlert.hook";

export function useAuthRequest() {
  const navigate = useNavigate();
  const { showAlert, showErrorAlert, setShowAlert, setShowErrorAlert, handleAlertClose } = useAlertHook();

  const handleSubmit = async (email: string) => {
    try {
      await axios.post<IUser>("/auth/sign-up", {
        email,
      });
      setShowAlert('User successfull create !')
      navigate("/login");
    } catch (error){
      setShowErrorAlert('Failed to create user');
    }
  };

  return { handleSubmit, setShowAlert, setShowErrorAlert, showAlert, showErrorAlert, handleAlertClose };
}
