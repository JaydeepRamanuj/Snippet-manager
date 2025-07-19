"use client";
import { useAuth, useSignIn } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useAppStore } from "@/store/appStore";

// type ForgotPasswordPageProps = {
//   onLeave: (value: boolean) => void;
// };

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [processStage, setProcessStage] = useState<
    "getEmailAndSendOTP" | "verifyOTP" | "getNewPasswordAndReset"
  >("getEmailAndSendOTP");
  const [error, setError] = useState("");
  const { setAuthDialog } = useAppStore();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  useEffect(() => {
    if (isSignedIn) {
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return null;
  }

  // Send the password reset code to the user's email
  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setProcessStage("verifyOTP");
      setError("");
    } catch (error: any) {
      console.log("Error getting email", error.errors[0].longMessage);
      setError(error.errors[0].longMessage);
    }
  };

  //   This is just filler function
  const getOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length == 6) {
      setProcessStage("getNewPasswordAndReset");
    }
  };

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password != confPassword) {
      setError("Both password should be same");
      return;
    }
    try {
      setIsLoading(true);
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result.status === "complete") {
        // Set the active session to
        // the newly created session (user is now signed in)
        setIsLoading(false);
        setActive({ session: result.createdSessionId });
        setError("");
        setAuthDialog(false);
      } else {
        console.log(result);
      }
    } catch (error: any) {
      console.error("error", error.errors[0].longMessage);
      setError(error.errors[0].longMessage);
    }
  };

  return (
    <div>
      <h1 className="mb-6">
        {processStage == "getEmailAndSendOTP"
          ? "Forgot Password?"
          : processStage == "verifyOTP"
            ? "Verify OTP"
            : "Set new Password"}
      </h1>
      <form
        onSubmit={
          processStage == "getEmailAndSendOTP"
            ? sendOTP
            : processStage == "verifyOTP"
              ? getOTP
              : resetPassword
        }
      >
        {processStage == "getEmailAndSendOTP" && (
          <div className="space-y-2">
            <Label htmlFor="email">Provide your email address</Label>
            <Input
              type="email"
              placeholder="e.g example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button variant="default" className="mt-4">
              Send password reset code
            </Button>
            {error && <p>{error}</p>}
          </div>
        )}

        {processStage == "verifyOTP" && (
          <div className="space-y-2">
            <Label>One-Time Password </Label>
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <span className="text-muted-foreground text-sm">
              Please enter the one-time password sent to your email id.
            </span>
            <Button className="mt-4">Verify</Button>
          </div>
        )}

        {processStage == "getNewPasswordAndReset" && (
          <div className="space-y-2">
            <div className="flex items-end gap-3">
              <div className="grow space-y-2">
                <Label htmlFor="password">Enter new password</Label>
                <Input
                  type={showPass ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? <EyeClosed /> : <Eye />}
              </Button>
            </div>
            <Label htmlFor="password" className="mt-4">
              Re-Enter password
            </Label>
            <Input
              type={showPass ? "text" : "password"}
              value={confPassword}
              required
              onChange={(e) => setConfPassword(e.target.value)}
            />

            {/* <Label htmlFor="password">
              Enter the password reset code that was sent to your email
            </Label>
            <Input
              type="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            /> */}
            {error && <p className="text-orange-400">{error}</p>}

            <Button className="mt-4" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isLoading ? "Resetting" : "Reset"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
