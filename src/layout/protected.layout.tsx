import React from 'react';
import { Outlet } from 'react-router-dom';
import { useJwtInterceptor } from '../hook/jwtInterceptor.hook';


export default function ProtectedLayout() {
  useJwtInterceptor();

  return (
      <Outlet />
  );
}
