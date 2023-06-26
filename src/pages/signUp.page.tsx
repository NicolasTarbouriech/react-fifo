import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import SideBarComponent from "../component/sideBar.component";
import { useAuthRequest } from "../hook/useAuthManager.hook";
import { AlertComponent } from "../component/alert.component";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { schema } from "../util/validation.util";

export default function SignUpPage() {
  const {onSubmit, showAlert, showErrorAlert, handleAlertClose} = useAuthRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

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
            <form onSubmit={handleSubmit((data) => onSubmit(data.email))} noValidate>
              <TextField
                type="input"
                label="Email"
                margin="normal"
                fullWidth
                {...register('email')}
                autoFocus={ true }
                error={!!errors.email}
                helperText={!!errors.email && "wrong email format"}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Container>
      </Grid>
    </Grid>
  )
}
