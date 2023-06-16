import { Button, Grid } from "@mui/material";
import IconMenu from "../component/sideBar.component";
import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { ActionTypeList } from "../component/type.list";
import { io, Socket } from "socket.io-client";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function ActionPage() {
  const [credits, setCredits] = React.useState([0, 0, 0]);
  const [type, setType] = React.useState('');
  const [actions, setActions] = useState([]);

  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    axios.get("/user/" + userId)
      .then((res) => {
        setCredits([res.data.credits.A, res.data.credits.B, res.data.credits.C])
      })
      .then(() => {
        axios.get("/action/" + userId)
          .then((response) => {
            setActions(response.data);
          })
      })
  }, [userId]);

  const handleSelectChange = (event: any) => {
    setType(event.target.value);
  };

  async function handleAddAction(e: SyntheticEvent) {
    const data = {
      type: type
    };
    axios.post("/user/" + userId + "/actions", data)
      .then(() => {
        axios.get("/action/" + userId)
          .then(async (response) => {
            setActions(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io();

    newSocket.on("actionDeleted", () => {
      axios.get("/action/" + userId)
        .then(async (response) => {
          setActions(response.data);
          axios.get("/user/" + userId)
            .then((res) => {
              setCredits([res.data.credits.A, res.data.credits.B, res.data.credits.C])
            })
        })
        .catch((error) => {
          console.error(error);
        });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return (
    <Grid container spacing={ 2 } sx={ {height: '100%'} }>
      <Grid item xs={ 12 } sm={ 2 }>
        <IconMenu/>
      </Grid>
      <Grid item xs={ 12 } sm={ 10 }
            sx={ {display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'} }>
        <div style={ {fontSize: '30px'} }>Your credits :</div>
        <div style={ {display: 'flex', flexDirection: 'row', alignItems: 'center'} }>
          <div style={ {margin: '5px'} }>A : { credits[0] }</div>
          <div style={ {margin: '5px'} }>B : { credits[1] }</div>
          <div style={ {margin: '5px'} }>C : { credits[2] }</div>
        </div>
        { actions.length > 0 ? (
          <ActionTypeList actions={ actions }/>
        ) : (
          <p>There is no action in the queue</p>
        ) }
        <FormControl sx={ {m: 1, width: 300, mt: 3} }>
          <InputLabel id="demo-simple-select-label">Action</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ type }
            label="Type"
            onChange={ handleSelectChange }
          >
            <MenuItem value={ 'A' }>A</MenuItem>
            <MenuItem value={ 'B' }>B</MenuItem>
            <MenuItem value={ 'C' }>C</MenuItem>
          </Select>
        </FormControl>
        <Button sx={ {marginTop: '20px'} } variant={ "contained" } onClick={ handleAddAction }>
          Add an action to the queue
        </Button>
      </Grid>
    </Grid>
  )
}
