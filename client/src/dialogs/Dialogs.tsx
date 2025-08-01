import AuthDialog from "../components/auth/AuthDialog";
import CustomAlertDialog from "./CustomAlertDialog";
import { NewSnippetDialog } from "./NewSnippetDialog";
import { NewFolderDialog } from "./NewFolderDialog";
import NewChangeLogDialog from "../components/ChangeLogForm";
import DesktopOptimizedDialog from "./DesktopOptimizedDialog";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import SearchDialog from "./SearchDialog";
import SettingsDialog from "./SettingsDialog";

function Dialogs() {
  const breakpoints = useBreakpoint();

  return (
    <div>
      <NewSnippetDialog />
      <NewFolderDialog />
      <AuthDialog />
      <CustomAlertDialog />
      <NewChangeLogDialog />
      <SearchDialog />
      <SettingsDialog />
      {breakpoints && breakpoints < 600 && <DesktopOptimizedDialog />}
    </div>
  );
}

export default Dialogs;
