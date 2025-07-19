import { Github, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { useSignIn, useUser } from "@clerk/clerk-react";
import showToast from "../common/Toast";
import type { OAuthStrategy } from "@clerk/types";

function OAuthButtons() {
  const { signIn } = useSignIn();
  const { isSignedIn, user } = useUser();

  if (!signIn) return;

  console.log("isSignedIn =>", isSignedIn);
  console.log("userId =>", user?.id);

  const handleSignIn = async (strategy: OAuthStrategy) => {
    try {
      const response = await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
      console.log(response);
      // showToast({
      //   msg: `Signed in with ${
      //     strategy == "oauth_google" ? "Google" : "Github"
      //   } account`,
      //   type: "success",
      // });
    } catch (error) {
      // console.log("Error signing in", error);
      showToast({
        msg: `Error signing in`,
        type: "error",
      });
    }
  };

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Button
        variant="outline"
        onClick={async () => {
          handleSignIn("oauth_google");
        }}
      >
        <Mail className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          handleSignIn("oauth_github");
        }}
      >
        <Github className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
    </div>
  );
}

export default OAuthButtons;
