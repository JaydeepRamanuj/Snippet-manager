import { AppSidebar } from "@/components/AppSideBar";
import MainPage from "./MainPage";
import { Shortcuts } from "@/components/Shortcut";
import Dialogs from "@/dialogs/Dialogs";
import { Toaster } from "sonner";

function HomePage() {
  return (
    <div className="flex h-screen w-full">
      <AppSidebar />
      <main className="grow overflow-auto">
        <MainPage />
        <Shortcuts />
        <Dialogs />
        <Toaster position="top-center" />
      </main>
    </div>
  );
}

export default HomePage;
