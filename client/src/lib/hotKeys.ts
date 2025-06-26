type HotkeyCallback = () => void;

const hotkeyMap = new Map<string, HotkeyCallback>();

// register hotKey
export const registerHotkey = (key: string, callback: HotkeyCallback) => {
  hotkeyMap.set(key, callback);
};

// remove hotKey
export const unregisterHotkey = (key: string) => {
  hotkeyMap.delete(key);
};

// This will handle keyboard event by getting function mapped to that specific hotKey
export const handleGlobalKeydown = (e: KeyboardEvent) => {
  let key = "";
  if (e.ctrlKey && e.shiftKey) {
    key = `Ctrl+Shift+${e.key.toLowerCase()}`;
  } else if (e.ctrlKey && !e.shiftKey) {
    key = `Ctrl+${e.key.toLowerCase()}`;
  } else {
    key = "";
  }
  // getting mapped callback from hotKeyMap
  const action = hotkeyMap.get(key);
  if (action) {
    // preventing it so it don't trigger browser shortcuts
    e.preventDefault();
    action();
  }
};
