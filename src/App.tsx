import React from 'react';
import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login.page";
import LandingPage from "./pages/landing.page";
import ActionPage from "./pages/action.page";
import ProtectedLayout from "./layout/protected.layout";
import AuthProvider from "./provider/Auth.provider";
import SignUpPage from "./pages/signUp.page";
import { getJwt } from "./service/jwt.service";
import { AlertContainer } from "./layout/alert.container";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const jwt = getJwt();

function App() {
  return (
    <ThemeProvider theme={ darkTheme }>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/login"
                 element={jwt ? <Navigate to="/" /> : <Login />}/>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/action" element={<ActionPage />} />
          </Route>
        </Routes>
        <AlertContainer/>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
