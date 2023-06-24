import { Alert } from "@mui/material";

export function AlertComponent(props: { showErrorAlert: string, showAlert: string, handleAlertClose: any}) {
  return (<>
      { props.showAlert.length > 0 && (
        <Alert sx={ {position: "absolute", bottom: "30px"} } variant="outlined" severity="success"
               onClose={ props.handleAlertClose }>
          { props.showAlert }
        </Alert>
      ) }
      { props.showErrorAlert.length > 0 && (
        <Alert severity="error" variant="outlined" onClose={ props.handleAlertClose }>{props.showErrorAlert}</Alert>
      ) }
    </>
  );
}
