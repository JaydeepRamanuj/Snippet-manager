### Sidebar resize

Shadcn's sidebar don't provide any option to change the width of the sidebar.

They use `--sidebar-width` to set width and its managed by their `sidebarProvider`.

To add resize feature I had to add my own logic, which manually tracks mouse movement and appenda my own value as `--sidebar-width`.

Following code has been added in shadcn's sidebar component

```js
// Adding my own logic to make sidebar resizable
const isResizing = React.useRef(false);
const sidebarRef = React.useRef < HTMLDivElement > null;

// These two will start and stop resizing process
const startResizing = () => (isResizing.current = true);
const stopResizing = () => (isResizing.current = false);

// Updating `--sidebar-width` for sidebarRef (which is our sidebar) when mouse moves
const handleMouseMove = (e: MouseEvent) => {
  if (!isResizing.current) return;
  const newWidth = Math.max(180, Math.min(1000, e.clientX));
  {
    sidebarRef.current &&
      sidebarRef.current.style.setProperty("--sidebar-width", `${newWidth}px`);
  }
};

React.useEffect(() => {
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", stopResizing);
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopResizing);
  };
}, []);
```

Add `ref={sidebarRef}` to sidebar div which has these classes as of now `group peer text-sidebar-foreground hidden md:block`. It may change in future.

And to finally trigger that resizing process and to show resize cursor I added another div beside that sidebar div.

```js
{
  /* This div is to show resizing cursor and to call resizing process */
}
<div
  onMouseDown={startResizing}
  className="w-1 h-full cursor-col-resize hover:bg-white/30"
></div>;
```

If we want, we can store value of sidebar in state for future usage
