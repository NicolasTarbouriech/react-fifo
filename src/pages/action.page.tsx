import { Button, Grid } from "@mui/material";
import SideBarComponent from "../component/sideBar.component";
import { useEffect, useState } from "react";
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
import { useAlertHook } from "../hook/useAlert.hook";
import { AlertComponent } from "../component/alert.component";

export default function ActionPage() {
  const [type, setType] = useState<string>('');
  const userId = getUserLoggedIn();
  const { socket, actions, setActions, credits, setCredits } = useSocketAction(userId);
  const { handleAlertClose, showAlert, setShowAlert, showErrorAlert, setShowErrorAlert } = useAlertHook();

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
        setShowErrorAlert('');
        axios.get<IAction[]>("/action/" + userId)
          .then(response => {
            setActions(response.data);
            setShowAlert('Action added !')
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch(error => {
        setShowErrorAlert('Failed to add action !');
        console.error(error);
      });
  }

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
        <AlertComponent showErrorAlert={showErrorAlert} showAlert={showAlert} handleAlertClose={handleAlertClose}/>
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
