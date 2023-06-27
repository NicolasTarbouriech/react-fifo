import { useContext } from 'react';
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../util/validation.util";

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
  const auth: ContextValue | null = useContext(AuthContext);
  const {handleAlertClose, showAlert, showErrorAlert} = useAlertHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(e: string) {
      // ! to say onLogin exist
      await auth!
        .onLogin(e)
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
            <AlertComponent
              showErrorAlert={ showErrorAlert }
              showAlert={ showAlert }
              handleAlertClose={ handleAlertClose }
            />
            <form onSubmit={ handleSubmit((data) => onSubmit(data.email)) } noValidate>
              <TextField
                type="input"
                label="Email"
                margin="normal"
                fullWidth
                {...register('email')}
                autoFocus={ true }
                error={!!errors.email}
                helperText={(!!errors.email && "wrong email format or email dont exist in base")}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={ sx.buttonSubmit }
              >
                Sign in
              </Button>
            </form>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
