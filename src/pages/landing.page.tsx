import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import SideBarComponent from "../component/sideBar.component";
import { isUserLogged } from "../service/jwt.service";

export default function LandingPage() {
  const userLogged = isUserLogged();

  return (
    <Grid container spacing={ 2 } sx={ {height: '100%'} }>
      <Grid item xs={ 12 } sm={ 2 }>
        <SideBarComponent/>
      </Grid>
      <Grid item xs={ 12 } sm={ 10 }
            sx={ {display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'} }>
        <div style={ {fontSize: '30px'} }>Welcome on FIFO app</div>
        { userLogged ?
          (<Link style={ {textDecoration: 'unset'} } to={ '/action' }>
          <Button sx={ {marginTop: '20px'} } variant={ "contained" }>Go to queue </Button>
          </Link>)
          :
          <Link style={ {textDecoration: 'unset'} } to={ '/login' }>
          <Button sx={ {marginTop: '20px'} } variant={ "contained" }>Login</Button>
          </Link>
        }
      </Grid>
    </Grid>
  )
}
