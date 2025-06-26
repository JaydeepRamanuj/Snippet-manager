import { Github, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/clerk-react";

function OAuthButtons() {
  const { openSignIn } = useClerk();

  return (
    <div className="flex flex-col gap-2 mt-2">
      <Button
        variant="outline"
        // onClick={() => openSignIn({ strategy: "oauth_google" })}
        // onClick={() => {}}
      >
        <Mail className="w-4 h-4 mr-2" />
        Continue with Google
      </Button>
      <Button
        variant="outline"
        // onClick={() => openSignIn({ strategy: "oauth_github" })}
        // onClick={() => {}}
      >
        <Github className="w-4 h-4 mr-2" />
        Continue with GitHub
      </Button>
    </div>
  );
}

export default OAuthButtons;
