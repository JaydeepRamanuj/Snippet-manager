import { AppSidebar } from "@/components/AppSideBar";
import MainPage from "./MainPage";
import { CommandMenu } from "@/components/CommandMenu";
import { Shortcuts } from "@/components/Shortcut";
import Dialogs from "@/components/Dialogs";
import { Toaster } from "sonner";

function HomePage() {
  return (
    <div className="flex w-full h-screen">
      <AppSidebar />
      <main className="grow overflow-auto ">
        <MainPage />
        <CommandMenu />
        <Shortcuts />
        <Dialogs />
        <Toaster position="top-center" />
      </main>
    </div>
  );
}

export default HomePage;
