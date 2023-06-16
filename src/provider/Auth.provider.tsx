import { useEffect, useState } from 'react';
import { AuthContext, ContextValue } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { getJwt, removeJwt, setJwt } from '../service/jwt.service';
import axios from 'axios';
import { PropsChildren } from '../type/props.type';

function updateJwt(token: string | null) {
  if (token) {
    setJwt(token);
  } else {
    removeJwt();
  }
}

export default function AuthProvider({children}: PropsChildren) {
  const jwt = getJwt();
  updateJwt(jwt);
  const [token, setToken] = useState<string | null>(jwt);

  useEffect(() => {
    updateJwt(token);
  }, [token]);

  const navigate = useNavigate();
  const handleLogin = async (email: string) => {
    axios.post('/auth/sign-in',
      {
        email: email
      }
    )
      .then(response => {
        setToken(response.data.accessToken)
      })

    if (typeof token === "string") {
      sessionStorage.setItem('jwt', token);
      navigate('/action')
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem('jwt');
  };

  const value: ContextValue = {
    token,
    setToken,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>;
}
