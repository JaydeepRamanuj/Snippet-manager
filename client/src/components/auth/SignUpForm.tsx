import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import OTPInput from "./OTPInput";
import { useAppStore } from "@/store/appStore";
import showToast from "../common/Toast";

function SignupForm({
  setVerifying,
  verifying,
}: {
  setVerifying: (status: boolean) => void;
  verifying: boolean;
}) {
  const { signUp, isLoaded, setActive } = useSignUp();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState<boolean>(false);
  // const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const { setAuthDialog } = useAppStore();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isLoaded) return;
    try {
      setLoading(true);

      // Start the sign-up process using the email and password provided
      const result = await signUp.create({
        emailAddress: email,
        password,
        username,
      });

      // Send the user an email with the verification code
      // await signUp.prepareEmailAddressVerification({
      //   strategy: "email_code",
      // });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      // setVerifying(true);
      console.log("result =>", result);

      if (result.status == "complete") {
        showToast({ msg: "Signup successful.", type: "success" });
        await setActive({ session: result.createdSessionId });
        setAuthDialog(false);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Signup failed.");
      showToast({ msg: "Error creating user. Try again", type: "error" });
      // setVerifying(false);
    } finally {
      // setVerifying(false);
      setLoading(false);
      // setAuthDialog(false);
    }
  };

  const handleVerify = async () => {
    if (!signUp || !setActive) return;
    console.log("Inside handleVerify");
    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        console.log("Complete");
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerifying(false);
        setAuthDialog(false);
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error) {
      console.log("Error verifying user", error);
    } finally {
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <>
        <h1>Enter OTP sent to your provided Email Id</h1>
        <OTPInput
          handleSubmit={(val) => {
            setCode(val);
            console.log("Calling handleVerify");
            handleVerify();
          }}
        />
      </>
    );
  }
  return (
    <div>
      <form onSubmit={handleSignup} className="flex flex-col gap-3">
        <Input
          type="test"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex gap-3">
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              setShowPass((prev) => !prev);
            }}
          >
            {showPass ? <EyeClosed /> : <Eye />}
          </Button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div id="clerk-captcha" />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign up
        </Button>
      </form>
      {/* <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm font-medium text-gray-500">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div> */}

      {/* <OAuthButtons /> */}
    </div>
  );
}

export default SignupForm;
