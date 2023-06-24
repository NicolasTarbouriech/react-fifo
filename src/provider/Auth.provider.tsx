import { useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { getJwt, removeJwt, setJwt } from '../service/jwt.service';
import axios from 'axios';
import { PropsChildren } from '../type/props.type';
import { ContextValue, IAuth } from "../interface/authContext.interface";
import { removeUser, setUser } from "../service/user.service";
import { useAlertHook } from "../hook/useAlert.hook";

export default function AuthProvider({children}: PropsChildren) {
  const jsonToken = getJwt();
  const [token, setToken] = useState<string | null>(jsonToken);
  const navigate = useNavigate();
  const { setShowAlert, setShowErrorAlert } = useAlertHook();

  const updateJwt = (token: string | null) => {
    if (token) {
      setToken(token);
      setJwt(token);
    } else {
      removeJwt();
    }
  }

  useEffect(() => {
    updateJwt(jsonToken);
  }, [jsonToken]);

  const handleLogin = async (email: string) => {
    axios.post<IAuth>('/auth/sign-in',
      {
        email
      }
    )
      .then(response => {
        const {accessToken} = response.data;
        updateJwt(accessToken);
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        if (payload && 'user' in payload) {
          setShowAlert('Successfull Login !');
          const userId = payload.user._id;
          setUser(userId);
          navigate('/action')
        } else {
          setShowErrorAlert('Failed to login');
          navigate('/login');
        }
      })
      .catch((err) => {
        setShowErrorAlert(err.message);
      })
  };

  const handleLogout = () => {
    setToken(null);
    removeJwt();
    removeUser();
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
