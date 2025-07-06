import { CircleAlert, CircleCheckBig, Info } from "lucide-react";
import { toast } from "sonner";

type ToastProps = {
  msg: string;
  type?: "success" | "error" | "info" | "default";
};
function showToast({ msg, type = "default" }: ToastProps) {
  toast.custom(() => {
    let classes;
    let icon;
    switch (type) {
      case "success":
        classes =
          "bg-green-950/70 text-green-400 flex gap-2 p-2 rounded-md border border-green-700 shadow-xl backdrop-blur-lg";
        icon = <CircleCheckBig />;
        break;
      case "error":
        classes =
          "bg-orange-950/70 text-orange-400 flex gap-2 p-2 rounded-md border border-orange-400 shadow-xl backdrop-blur-lg";
        icon = <CircleAlert />;
        break;
      case "info":
        classes =
          "bg-blue-950/70 text-blue-400 flex gap-2 p-2 rounded-md border border-blue-700 shadow-xl backdrop-blur-lg";
        icon = <Info />;
        break;
      default:
        classes =
          "bg-neutral-800 text-white flex gap-2 p-2 rounded-md border border-neutral-600 shadow-xl backdrop-blur-lg";
        icon = <Info />;
    }
    return (
      <div className={classes}>
        <strong className="block">{icon}</strong>
        <span>{msg}</span>
      </div>
    );
  });
  //   return (
  //     <div className={classes}>
  //       <strong className="block">{icon}</strong>
  //       <span>{msg}</span>
  //     </div>
  //   );

  return null;
}

export default showToast;
