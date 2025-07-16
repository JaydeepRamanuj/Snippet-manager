import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAppStore } from "@/store/appStore";

function DesktopOptimizedDialog() {
  const { shownDesktopOptimizedDialog, setDesktopOptimizedDialog } =
    useAppStore();

  return (
    <Dialog
      open={shownDesktopOptimizedDialog}
      onOpenChange={setDesktopOptimizedDialog}
    >
      <DialogContent className="p-0 sm:w-fit">
        <DialogTitle className="flex items-center justify-between px-6 pt-4">
          <span> Optimized for Desktop 💻</span>
        </DialogTitle>
        <div className="text-muted-foreground px-6 pb-6 text-sm">
          <p className="mb-2">
            This application is best experienced on a desktop or laptop screen.
          </p>
          <p>
            Some features like keyboard shortcuts, code editor, and quick search
            may not function properly on mobile devices.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DesktopOptimizedDialog;
