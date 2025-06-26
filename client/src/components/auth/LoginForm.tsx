import { Separator } from "@radix-ui/react-separator";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useSignIn } from "@clerk/clerk-react";
import { useAppStore } from "@/store/appStore";
import { toast } from "sonner";

function LoginForm() {
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
        toast.success("Sign in successful.");
      } else {
        console.log("Error signing in user", error);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Login failed.");
      toast.error("Error signing in. Try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <Input
        type="text"
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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Log in
      </Button>

      <Separator />
      {/* <OAuthButtons /> */}
    </form>
  );
}

export default LoginForm;
