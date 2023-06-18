import { Alert, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import SideBarComponent from "../component/sideBar.component";
import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUserPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    axios.post('/user/create', {
        email: email
      }
    )
      .then(() => {
        navigate('/login');
      })
      .catch((e) => {
        setError(e);
      })
  }

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
              Create user
            </Typography>
            { error && <Alert severity="error">{ error }</Alert> }
            <Box component="form" onSubmit={ handleSubmit } noValidate>
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
