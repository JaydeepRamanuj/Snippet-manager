import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Keyboard,
  LogIn,
  LogOut,
  Megaphone,
  Settings,
  User,
  Wrench,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useClerk, useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

function UserDropdown() {
  const { setAuthDialog, setSettingsDialog, setCurrentSettingsTab } =
    useAppStore();
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
        <DropdownMenuItem
          onClick={() => {
            setCurrentSettingsTab("account");
            setSettingsDialog(true);
          }}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentSettingsTab("preferences");
            setSettingsDialog(true);
          }}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentSettingsTab("shortcuts");
            setSettingsDialog(true);
          }}
        >
          <Keyboard className="mr-2 h-4 w-4" />
          Shortcuts
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentSettingsTab("changelogs");
            setSettingsDialog(true);
          }}
        >
          <Wrench className="mr-2 h-4 w-4" />
          Change Logs
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setCurrentSettingsTab("whats-new");
            setSettingsDialog(true);
          }}
        >
          <Megaphone className="mr-2 h-4 w-4" />
          What's new
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {isSignedIn ? (
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => setAuthDialog(true)}>
            <LogIn className="mr-2 h-4 w-4" />
            Sign in
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
