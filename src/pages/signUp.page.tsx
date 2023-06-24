import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import SideBarComponent from "../component/sideBar.component";
import React, { useState } from "react";
import { useAuthRequest } from "../hook/useAuthManager.hook";
import { AlertComponent } from "../component/alert.component";

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const { handleSubmit, showAlert, showErrorAlert, handleAlertClose } = useAuthRequest();

  return (
    <Grid container spacing={ 2 } sx={ {height: '100%'} }>
      <Grid item xs={ 12 } sm={ 2 }>
        <SideBarComponent/>
      </Grid>
      <Grid item xs={ 12 } sm={ 10 }
            sx={ {display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'} }>
        <Container className="login" component="main" maxWidth="xs">
          <Box sx={ {display: 'flex', flexDirection: 'column', alignItems: 'center'} }>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <AlertComponent showErrorAlert={showErrorAlert} showAlert={showAlert} handleAlertClose={handleAlertClose}/>
            <Box component="form" onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(email)
            }} noValidate>
              <TextField
                type="email"
                label="Email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                margin="normal"
                required
                fullWidth
                autoFocus={ true }
              />
              <Button
                type="submit"
                disabled={ !email }
                fullWidth
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  )
}
