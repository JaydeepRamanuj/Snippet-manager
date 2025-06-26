import { createContext, useContext, useState, type ReactNode } from "react";

type alertConfigType = {
  alertTitle: string;
  description?: string;
  falsyButton?: string;
  truthyButton?: string;
};

type AlertProviderState = {
  alertConfig: alertConfigType;
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
  resolver: ((result: boolean) => void) | null;
};

type ShowAlertWithPromise = (config: alertConfigType) => Promise<boolean>;

const initialState: AlertProviderState & {
  showAlertWithPromise: ShowAlertWithPromise;
} = {
  alertConfig: {
    alertTitle: "",
    description: "",
    falsyButton: "",
    truthyButton: "",
  },
  resolver: () => null,
  showAlertWithPromise: () => new Promise(() => {}),
  showAlert: false,
  setShowAlert: () => null,
};
const AlertContext = createContext<
  AlertProviderState & { showAlertWithPromise: ShowAlertWithPromise }
>(initialState);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alertConfig, setAlertConfig] = useState<alertConfigType>({
    alertTitle: "",
    description: "",
    falsyButton: "",
    truthyButton: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  // This resolver will store promise's resolve function so we call from anywhere, use setResolver from Dialog button to set value accordingly
  const [resolver, setResolver] = useState<((result: boolean) => void) | null>(
    null
  );

  // We will only this function to call this dialog

  // This function will set config and will return a promise whose resolve will be stored in resolver state
  const showAlertWithPromise = (config: alertConfigType) => {
    setAlertConfig({
      alertTitle: config.alertTitle,
      description: config.description || "",
      falsyButton: config.falsyButton || "Cancel",
      truthyButton: config.truthyButton || "Continue",
    });
    setShowAlert(true);

    return new Promise<boolean>((resolve) => {
      // storing the resolve to resolver state
      setResolver(() => resolve);
    });
  };

  const value = {
    alertConfig,
    showAlertWithPromise,
    showAlert,
    setShowAlert: (value: boolean) => {
      setShowAlert(value);
    },
    resolver,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}

// Exporting these values using hook for easier access

function useAlert() {
  const {
    alertConfig,
    showAlertWithPromise,
    showAlert,
    setShowAlert,
    resolver,
  } = useContext(AlertContext);
  return {
    alertConfig,
    showAlertWithPromise,
    showAlert,
    setShowAlert,
    resolver,
  };
}

export default useAlert;
