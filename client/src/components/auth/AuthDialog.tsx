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
import ForgotPasswordPage from "./ForgotPassword";

function AuthDialog() {
  const { showAuthDialog, setAuthDialog } = useAppStore();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [verifying, setVerifying] = useState(false);
  const [resettingPassword, setResettingPassword] = useState<boolean>(false);
  return (
    <Dialog
      open={showAuthDialog}
      onOpenChange={(value) => {
        setAuthDialog(value);
        setResettingPassword(false);
        setVerifying(false);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {resettingPassword ? "Reset Password" : "Authentication"}
          </DialogTitle>
        </DialogHeader>

        {resettingPassword ? (
          <ForgotPasswordPage />
        ) : (
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
              <LoginForm onForgotPassword={setResettingPassword} />
            </TabsContent>

            <TabsContent value="signup">
              <SignupForm setVerifying={setVerifying} verifying={verifying} />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
