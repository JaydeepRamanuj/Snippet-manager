import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogIn, LogOut, Settings, User } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useClerk, useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

function UserDropdown() {
  const { setAuthDialog, setSettingsDialog } = useAppStore();
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();

  const handleSignOut = () => {
    const signOutPromise = signOut();
    toast.promise(signOutPromise, {
      loading: "Signing out...",
      success: `Signed out successfully`,
      error: (err) => `Error signing out: ${err.message}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-gray-600">
          {/* <AvatarImage src="/your-avatar.jpg" alt="@you" /> */}
          <AvatarFallback>
            {user?.username ? user.username[0].toUpperCase() : "?"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => setSettingsDialog(true)}>
          <User className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSettingsDialog(true)}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {isSignedIn ? (
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => setAuthDialog(true)}>
            <LogIn className="w-4 h-4 mr-2" />
            Sign in
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
