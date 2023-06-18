const JWT_NAME = 'jwt';

export function getJwt() {
  return sessionStorage.getItem(JWT_NAME);
}

export function setJwt(jwt: string) {
  sessionStorage.setItem(JWT_NAME, jwt);
}

export function removeJwt() {
  sessionStorage.removeItem(JWT_NAME);
}

export function isUserLogged() {
  const jwt = sessionStorage.getItem('jwt');
  return !!jwt;
}
