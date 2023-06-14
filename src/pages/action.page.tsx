import { Box, Button, Grid, TextField } from "@mui/material";
import IconMenu from "../component/sideBar.component";
import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { ActionTypeList } from "../component/type.list";

export default function ActionPage() {
  const [creditA, setCreditA] = React.useState(0);
  const [creditB, setCreditB] = React.useState(0);
  const [creditC, setCreditC] = React.useState(0);
  const [type, setType] = React.useState('');
  const [actions, setActions] = useState([]);

  React.useEffect(() => {
    axios.get("/user/64888f96313b0d1f7ff2015b")
      .then((res) => res.data)
      .then((user) => {
        setCreditA(user.credits.A)
        setCreditB(user.credits.B)
        setCreditC(user.credits.C)
        return user;
      })
      .then((user) => {
          axios.get("/action/" + user._id)
            .then((response) => {
              setActions(response.data);
      })
    })
  }, []);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const data = {
      type: type
    };

    axios.post("/user/64888f96313b0d1f7ff2015b/actions", data)
      .then(response => {
        setActions(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <Grid container spacing={ 2 } sx={ {height: '100%'} }>
      <Grid item xs={ 12 } sm={ 2 }>
        <IconMenu/>
      </Grid>
      <Grid item xs={ 12 } sm={ 10 }
            sx={ {display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'} }>
        <div style={ {fontSize: '30px'} }>Your credits :</div>
        <div style={ {display: 'flex', flexDirection: 'row', alignItems: 'center'} }>
          <div style={ {margin: '5px'} }>A : { creditA }</div>
          <div style={ {margin: '5px'} }>B : { creditB }</div>
          <div style={ {margin: '5px'} }>C : { creditC }</div>
        </div>
        {actions.length > 0 ? (
          <ActionTypeList actions={actions} />
        ) : (
          <p>There is no action in the queue</p>
        )}
        <Button sx={ {marginTop: '20px'} } variant={ "contained" }>Add an action to the queue</Button>
        <Box component="form" onSubmit={ handleSubmit }>
          <TextField
            type="type"
            label="Type"
            value={ type }
            onChange={ (e) => setType(e.target.value) }
            margin="normal"
            required
            fullWidth
          />
          <Button
            type="submit"
            disabled={ !type }
            fullWidth
            variant="contained"
          >
            Add action
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
