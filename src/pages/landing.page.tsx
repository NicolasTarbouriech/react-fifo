import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import IconMenu, { isUserLoggedIn } from "../component/sideBar.component";

export default function LandingPage() {
  const getJwt = isUserLoggedIn();
  return (
    <Grid container spacing={ 2 } sx={ {height: '100%'} }>
      <Grid item xs={ 12 } sm={ 2 }>
        <IconMenu/>
      </Grid>
      <Grid item xs={ 12 } sm={ 10 }
            sx={ {display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'} }>
        <div style={ {fontSize: '30px'} }>Welcome on FIFO app</div>
        { !getJwt ? (<
            Link style={ {textDecoration: 'unset'} } to={ '/login' }>
            <Button sx={ {marginTop: '20px'} } variant={ "contained" }>Login</Button>
          </Link>)
          :
          (<Link style={ {textDecoration: 'unset'} } to={ '/action' }>
            <Button sx={ {marginTop: '20px'} } variant={ "contained" }>Go to queue </Button>
          </Link>)
        }
      </Grid>
    </Grid>
  )
}
