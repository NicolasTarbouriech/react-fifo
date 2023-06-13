import React from 'react';
import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login.page";
import LandingPage from "./pages/landing.page";
import ActionPage from "./pages/action.page";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  // const [data, setData] = React.useState(null);
  //
  // React.useEffect(() => {
  //   fetch("/ping")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  return (
    <ThemeProvider theme={ darkTheme }>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/" element={<LandingPage />} />
        <Route path="/action" element={<ActionPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
