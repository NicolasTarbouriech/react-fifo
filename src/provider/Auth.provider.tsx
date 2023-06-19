import { useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { getJwt, removeJwt, setJwt } from '../service/jwt.service';
import axios from 'axios';
import { PropsChildren } from '../type/props.type';
import { ContextValue, IAuth } from "../interface/authContext.interface";

function updateJwt(token: string | null) {
  if (token) {
    setJwt(token);
  } else {
    removeJwt();
  }
}

export default function AuthProvider({children}: PropsChildren) {
  const jsonToken = getJwt();
  updateJwt(jsonToken);
  const [token, setToken] = useState<string | null>(jsonToken);

  useEffect(() => {
    updateJwt(token);
  }, [token]);

  const navigate = useNavigate();
  const handleLogin = async (email: string) => {
    axios.post<IAuth>('/auth/sign-in',
      {
        email: email
      }
    )
      .then(response => {
        setToken(response.data.accessToken);

        if (typeof token === 'string') {
          sessionStorage.setItem('jwt', token);
          // decode token
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload && 'user' in payload) {
            const userId = payload.user._id;
            sessionStorage.setItem('userId', userId)
            navigate('/action')
          } else {
            navigate('/login');
          }
        } else {
          navigate('/login');
        }
      })
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem('jwt');
    navigate('/login');
  };

  const value: ContextValue = {
    token,
    setToken,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>;
}
