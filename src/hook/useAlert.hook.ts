import { useState } from "react";

export function useAlertHook() {
  const [showAlert, setShowAlert] = useState<string>('');
  const [showErrorAlert, setShowErrorAlert] = useState<string>('');

   const handleAlertClose = () => {
    setShowAlert('');
    setShowErrorAlert('')
  };

   return { handleAlertClose, showAlert, setShowAlert, showErrorAlert, setShowErrorAlert }
}
