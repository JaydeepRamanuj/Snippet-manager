"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";
import { useAppStore } from "@/store/appStore";

function AuthDialog() {
  const { showAuthDialog, setAuthDialog } = useAppStore();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [verifying, setVerifying] = useState(false);
  return (
    <Dialog open={showAuthDialog} onOpenChange={setAuthDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "login" ? "Login" : "Sign Up"}</DialogTitle>
        </DialogHeader>

        <Tabs
          value={mode}
          onValueChange={(v) => setMode(v as any)}
          className="w-full"
        >
          {!verifying && (
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="signup">
            <SignupForm setVerifying={setVerifying} verifying={verifying} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
