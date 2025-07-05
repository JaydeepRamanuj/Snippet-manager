import AuthDialog from "./auth/AuthDialog";
import CustomAlertDialog from "./CustomAlertDialog";
import { NewSnippetDialog } from "./NewSnippetDialog";
import { NewFolderDialog } from "./NewFolderDialog";

function Dialogs() {
  return (
    <div>
      <NewSnippetDialog onCreate={() => {}} />
      <NewFolderDialog onCreate={() => {}} />
      <AuthDialog />
      <CustomAlertDialog />
    </div>
  );
}

export default Dialogs;
