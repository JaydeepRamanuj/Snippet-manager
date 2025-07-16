import { useEffect } from "react";
import "./App.css";
import { handleGlobalKeydown } from "./lib/hotKeys";
import { SidebarProvider } from "./components/ui/sidebar";

import { ThemeProvider } from "./providers/themeProvider";

import { TooltipProvider } from "./components/ui/tooltip";

import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-react";

import { AlertProvider } from "./providers/AlertProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SSOPage from "./pages/SSOPage";

function App() {
  const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  useEffect(() => {
    window.addEventListener("keydown", handleGlobalKeydown);
    return () => window.removeEventListener("keydown", handleGlobalKeydown);
  }, []);

  return (
    <>
      <ClerkProvider publishableKey={CLERK_KEY}>
        <ClerkLoaded>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <TooltipProvider>
              <SidebarProvider>
                <AlertProvider>
                  <Router>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/sso-callback" element={<SSOPage />} />
                    </Routes>
                  </Router>
                </AlertProvider>
              </SidebarProvider>
            </TooltipProvider>
          </ThemeProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </>
  );
}

export default App;
