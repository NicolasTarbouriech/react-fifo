import React, { SyntheticEvent, useContext, useState } from 'react';
import {
  Box,
  Button,
  Container, Grid,
  TextField,
  Typography,
} from '@mui/material';
import SideBarComponent from "../component/sideBar.component";
import { AuthContext } from "../context/auth.context";
import { ContextValue } from "../interface/authContext.interface";
import { useAlertHook } from "../hook/useAlert.hook";
import { AlertComponent } from "../component/alert.component";

const sx = {
  box: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    m: 1,
    bgcolor: 'secondary.main',
  },
  form: {
    mt: 1,
  },
  buttonSubmit: {
    mt: 3,
    mb: 2,
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState('');const auth: ContextValue | null = useContext(AuthContext);
  const { handleAlertClose, showAlert, showErrorAlert } = useAlertHook();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    // ! to say onLogin exist
    await auth!
      .onLogin(email)
  }

  return (
    <Grid container spacing={ 2 } sx={ {height: '100%', width: '100%'} }>
      <Grid item xs={ 12 } sm={ 2 }>
        <SideBarComponent/>
      </Grid>
      <Grid item xs={ 12 } sm={ 10 }
            sx={ {display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'} }>
        <Container className="login" component="main" maxWidth="xs">
          <Box sx={ {display: 'flex', flexDirection: 'column', alignItems: 'center'} }>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <AlertComponent showErrorAlert={showErrorAlert} showAlert={showAlert} handleAlertClose={handleAlertClose}/>
            <Box component="form" onSubmit={ handleSubmit } noValidate>
              <TextField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                autoFocus={true}
              />
              <Button
                type="submit"
                disabled={!email}
                fullWidth
                variant="contained"
                sx={sx.buttonSubmit}
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
