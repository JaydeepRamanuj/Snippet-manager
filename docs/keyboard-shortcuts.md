# keyboard-Shortcuts

#### I want to make shortcuts scoped so they don't pollute global scope

`hotKey.ts` manages register and unregister of those keyBinds and also calls the callback we've set when that specific hotkey is triggered on document (by handleGlobalKeydown fn).

`useHotKey.ts` provide abstract to register and unregister those keyBinds from any components

`app.tsx` has main keyboard listener which triggers handleGlobalKeydown function.

---

## Flow

1. Component mounts → registers shortcut
2. Global listener (App.tsx) captures key
3. handleGlobalKeydown() checks registered keys
4. If match → triggers the component’s callback
5. On unmount → shortcut is removed
