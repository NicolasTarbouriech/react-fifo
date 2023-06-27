import { useAlertHook } from "../hook/useAlert.hook";
import { AlertComponent } from "../component/alert.component";

export const AlertContainer = () => {
  const { handleAlertClose, showAlert, showErrorAlert } = useAlertHook();

  return (
    <AlertComponent
      showAlert={showAlert}
      showErrorAlert={showErrorAlert}
      handleAlertClose={handleAlertClose}
    />
  );
};
