import { useEffect } from "react";
import "./App.css";
import { handleGlobalKeydown } from "./lib/hotKeys";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSideBar";
import { CommandMenu } from "./components/CommandMenu";
import { ThemeProvider } from "./providers/themeProvider";
import MainPage from "./pages/MainPage";
import { TooltipProvider } from "./components/ui/tooltip";
import Dialogs from "./components/Dialogs";
import { Shortcuts } from "./components/Shortcut";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/sonner";
import { AlertProvider } from "./providers/AlertProvider";

function App() {
  useEffect(() => {
    window.addEventListener("keydown", handleGlobalKeydown);
    return () => window.removeEventListener("keydown", handleGlobalKeydown);
  }, []);

  const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  return (
    <>
      <ClerkProvider publishableKey={CLERK_KEY}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <SidebarProvider>
              <AlertProvider>
                <div className="flex  w-full h-screen">
                  <AppSidebar />

                  <main className="grow p-2 overflow-auto ">
                    <MainPage />
                    <CommandMenu />
                    <Shortcuts />
                    <Dialogs />
                    <Toaster position="top-center" />
                  </main>
                </div>
              </AlertProvider>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
}

export default App;
