import AuthDialog from "./auth/AuthDialog";
import CustomAlertDialog from "./CustomAlertDialog";
import { NewFileDialog } from "./NewFileDialog";
import { NewFolderDialog } from "./NewFolderDialog";

function Dialogs() {
  return (
    <div>
      <NewFileDialog onCreate={() => {}} />
      <NewFolderDialog onCreate={() => {}} />
      <AuthDialog />
      <CustomAlertDialog />
    </div>
  );
}

export default Dialogs;
