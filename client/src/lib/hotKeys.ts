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
  const key = `${e.ctrlKey ? "Ctrl+" : ""}${e.key.toLowerCase()}`;
  const action = hotkeyMap.get(key);
  if (action) {
    e.preventDefault();
    action();
  }
};
