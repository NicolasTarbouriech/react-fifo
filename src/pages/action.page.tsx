import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import IconMenu from "../component/sideBar.component";
import React from "react";

export default function ActionPage() {
  const [creditA, setCreditA] = React.useState(0);
  const [creditB, setCreditB] = React.useState(0);
  const [creditC, setCreditC] = React.useState(0);

  React.useEffect(() => {
    fetch("/user/64888f96313b0d1f7ff2015b")
      .then((res) => res.json())
      .then((user) => (
        setCreditA(user.credits.A),
        setCreditB(user.credits.B),
        setCreditC(user.credits.C)
      ));
  }, []);


  return (
    <Grid container spacing={ 2 } sx={ {height: '100%'} }>
      <Grid item xs={12} sm={2}>
        <IconMenu/>
      </Grid>
      <Grid item xs={12} sm={10} sx={ {display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'} }>
        <div style={ {fontSize: '30px'} }>Your credits :</div>
        <div style={ {display: 'flex', flexDirection: 'row', alignItems: 'center'} }>
          <div style={ {margin: '5px'}}>A : {creditA}</div>
          <div style={ {margin: '5px'}}>B : {creditB}</div>
          <div style={ {margin: '5px'}}>C : {creditC}</div>
        </div>
        <Link style={ {textDecoration: 'unset'} } to={ '/login' }>
          <Button sx={ {marginTop: '20px'} } variant={ "contained" }>Add an action to the queue</Button>
        </Link>
      </Grid>
    </Grid>
  )
}
