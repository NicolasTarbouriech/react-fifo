import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { removeJwt } from '../service/jwt.service';

export function useJwtInterceptor() {
  const navigate = useNavigate();
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error)
      if (error.response.status === 401) {
        removeJwt();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );
}
