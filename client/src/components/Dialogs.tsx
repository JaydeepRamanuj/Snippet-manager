import AuthDialog from "./auth/AuthDialog";
import CustomAlertDialog from "./CustomAlertDialog";
import { NewSnippetDialog } from "./NewSnippetDialog";
import { NewFolderDialog } from "./NewFolderDialog";
import NewChangeLogDialog from "./ChangeLogForm";

function Dialogs() {
  return (
    <div>
      <NewSnippetDialog />
      <NewFolderDialog />
      <AuthDialog />
      <CustomAlertDialog />
      <NewChangeLogDialog />
    </div>
  );
}

export default Dialogs;
