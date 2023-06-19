import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getJwt, removeJwt } from "../service/jwt.service";

export function useJwtInterceptor() {
  const navigate = useNavigate();

  axios.interceptors.request.use((config) => {
    const token = getJwt();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        removeJwt();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
}
