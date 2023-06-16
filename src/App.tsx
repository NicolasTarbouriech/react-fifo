import React from 'react';
import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login.page";
import LandingPage from "./pages/landing.page";
import ActionPage from "./pages/action.page";
import ProtectedLayout from "./layout/protected.layout";
import AuthProvider from "./provider/Auth.provider";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={ darkTheme }>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={ <Login/> }/>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/action" element={<ActionPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
