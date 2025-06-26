import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useAlert from "@/providers/AlertProvider";

function CustomAlertDialog() {
  const { resolver, alertConfig, setShowAlert, showAlert } = useAlert();

  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertConfig.alertTitle}</AlertDialogTitle>
          {alertConfig.description && (
            <AlertDialogDescription>
              {alertConfig.description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              resolver?.(false);
            }}
          >
            {alertConfig.falsyButton}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              resolver?.(true);
            }}
          >
            {alertConfig.truthyButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomAlertDialog;
