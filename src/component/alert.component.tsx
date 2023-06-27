import { Alert } from "@mui/material";
import { AlertProps } from "../interface/alert.interface";

export function AlertComponent(props: AlertProps) {
  return (<>
      { props.showAlert.length > 0 && (
         <Alert variant="outlined" severity="success"
                 onClose={ props.handleAlertClose }>
            { props.showAlert }
          </Alert>
      ) }
      { props.showErrorAlert.length > 0 && (
        <Alert severity="error" variant="outlined" onClose={ props.handleAlertClose }>{ props.showErrorAlert }</Alert>
      ) }
    </>
  );
}
