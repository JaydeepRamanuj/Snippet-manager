import { registerHotkey, unregisterHotkey } from "@/lib/hotKeys";
import { useEffect } from "react";

export const useHotkey = (keyCombination: string, callback: () => void) => {
  // This will register and unregister provided shortcut when that component is mounted and unmounted
  useEffect(() => {
    registerHotkey(keyCombination, callback);
    return () => unregisterHotkey(keyCombination);
  }, [keyCombination, callback]);
};
