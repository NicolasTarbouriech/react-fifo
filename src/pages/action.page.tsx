import { Alert, Button, Grid } from "@mui/material";
import SideBarComponent from "../component/sideBar.component";
import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { IUser } from "../interface/user.interface";
import { IAction } from "../interface/action.interface";
import { ActionsList } from "../component/actionsList.component";
import { useSocketAction } from "../hook/useSocketAction.hook";
import { getUserLoggedIn } from "../service/user.service";

export default function ActionPage() {
  const [type, setType] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const userId = getUserLoggedIn();
  const { socket, actions, setActions, credits, setCredits } = useSocketAction(userId);

  useEffect(() => {
    const fetchUserAndActions = async () => {
      const [responseCredits, responseActions] = await Promise.all([
        axios.get<IUser>("/user/" + userId),
        axios.get<IAction[]>("/action/" + userId)
      ]);
      const {
        credits: {
        A,
        B,
        C
        }
      } = responseCredits.data;
      setCredits([A, B, C]);
      setActions(responseActions.data);
    };
    fetchUserAndActions();
  }, [userId]);

  const handleSelectChange = (event: any) => {
    setType(event.target.value);
  };

  async function handleAddAction() {
    const data = {
      type: type
    };
    axios.post("/user/" + userId + "/actions", data)
      .then(() => {
        axios.get<IAction[]>("/action/" + userId)
          .then(response => {
            setActions(response.data);
            setShowAlert(true)
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch(error => {
        setShowAlert(false);
        setShowErrorAlert(true);
        console.error(error);
      });
  }

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <Grid container spacing={ 2 } sx={ {height: '100%'} }>
      <Grid item xs={ 12 } sm={ 2 }>
        <SideBarComponent/>
      </Grid>
      <Grid item xs={ 12 } sm={ 10 }
            sx={ {display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'} }>
        <div style={ {fontSize: '30px'} }>Your credits :</div>
        <div style={ {display: 'flex', flexDirection: 'row', alignItems: 'center'} }>
          <div style={ {margin: '5px'} }>A : { credits[0] }</div>
          <div style={ {margin: '5px'} }>B : { credits[1] }</div>
          <div style={ {margin: '5px'} }>C : { credits[2] }</div>
        </div>
        {showAlert && (
          <Alert severity="success" onClose={handleAlertClose}>
            This is a success alert — action added!
          </Alert>
        )}
        {showErrorAlert && (
          <Alert severity="error">Failed to add action</Alert>
        )}
        { actions.length > 0 ? (
          <ActionsList actions={ actions }/>
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
