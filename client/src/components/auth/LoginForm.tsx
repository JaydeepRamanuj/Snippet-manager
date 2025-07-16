import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useSignIn } from "@clerk/clerk-react";
import { useAppStore } from "@/store/appStore";
import showToast from "../common/Toast";

type LoginFormProps = {
  onForgotPassword: (value: boolean) => void;
};

function LoginForm({ onForgotPassword }: LoginFormProps) {
  const { signIn, isLoaded, setActive } = useSignIn();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const { setAuthDialog } = useAppStore();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isLoaded) return;
    try {
      setLoading(true);
      const result = await signIn.create({
        identifier: emailOrUsername,
        password,
      });
      if (result.status == "complete") {
        await setActive({ session: result.createdSessionId });
        setAuthDialog(false);
        showToast({ msg: "Sign in successful.", type: "success" });
      } else {
        console.log("Error signing in user", error);
        showToast({ msg: "Error signing in. Try again", type: "error" });
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Login failed.");
      showToast({ msg: "Error signing in. Try again", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="space-y-3">
        <Input
          type="text"
          autoFocus={true}
          placeholder="Email or username"
          required
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
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
            type="button"
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
        <span
          className="text-muted-foreground block cursor-pointer text-end text-sm transition duration-300 hover:text-white hover:underline"
          onClick={() => {
            onForgotPassword(true);
          }}
        >
          Forgot password ?
        </span>
        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Log in
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

export default LoginForm;
