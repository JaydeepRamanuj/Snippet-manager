import { toast } from "sonner";
import { Button } from "../ui/button";
import { useClerk, useUser } from "@clerk/clerk-react";

function AccountTab() {
  const { signOut } = useClerk();
  const { user } = useUser();

  // const handleChangePassword = () => {};

  const handleLogout = () => {
    const signOutPromise = signOut();
    toast.promise(signOutPromise, {
      loading: "Signing out...",
      success: `Signed out successfully`,
      error: (err) => `Error signing out: ${err.message}`,
    });
  };

  return (
    <div className="space-y-6 p-3">
      <h2 className="text-lg font-semibold">Account Settings</h2>

      <div className="space-y-2">
        <div>
          <label className="text-muted-foreground text-sm">Username</label>
          <div className="mt-1 text-base">{user?.username}</div>
        </div>
        <div>
          <label className="text-muted-foreground text-sm">Email</label>
          <div className="mt-1 text-base">
            {user?.emailAddresses[0]?.emailAddress}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        {/* <Button variant="secondary" onClick={handleChangePassword}>
          Change Password
        </Button> */}
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default AccountTab;
