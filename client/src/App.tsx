import { useEffect } from "react";
import "./App.css";
import { handleGlobalKeydown } from "./lib/hotKeys";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSideBar";
import { CommandMenu } from "./components/CommandMenu";
import { ThemeProvider } from "./providers/themeProvider";
import MainPage from "./pages/MainPage";

function App() {
  useEffect(() => {
    window.addEventListener("keydown", handleGlobalKeydown);
    return () => window.removeEventListener("keydown", handleGlobalKeydown);
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <AppSidebar />
          <main className="p-3 w-full flex gap-3">
            {/* <SidebarTrigger /> */}
            <MainPage />
            <CommandMenu />
            {/* <Shortcuts /> */}
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
