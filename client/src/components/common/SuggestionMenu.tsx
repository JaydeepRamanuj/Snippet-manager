import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type SuggestionMenuType = {
  items: string[];
  top: number;
  left: number;
  show: boolean;
  setShow: (value: boolean) => void;
};

const SuggestionMenu = forwardRef<HTMLDivElement, SuggestionMenuType>(
  ({ items, top, left, show }, forwardedRef) => {
    const [currentItem, setCurrentItem] = useState(0);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key == "ArrowDown") {
        console.log("ArrowDown");
        const nextIndex = Math.min(currentItem + 1, items.length - 1);
        setCurrentItem(nextIndex);
        itemRefs.current[nextIndex]?.focus();
      }
      if (e.key == "ArrowUp") {
        console.log("ArrowUp");
        const prevIndex = Math.max(currentItem - 1, 0);
        setCurrentItem(prevIndex);
        itemRefs.current[prevIndex]?.focus();
      }
    };
    useImperativeHandle(forwardedRef, () => containerRef.current!, []);

    useEffect(() => {
      if (
        !containerRef.current ||
        !itemRefs.current ||
        (itemRefs?.current && itemRefs?.current.length != 0)
      )
        return;

      containerRef.current.addEventListener("keydown", handleKeyDown);

      return () => {
        containerRef.current &&
          containerRef.current.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    return (
      <>
        {show && (
          <div
            ref={containerRef}
            tabIndex={0}
            className="fixed z-50 rounded-sm bg-neutral-700 p-2"
            style={{ top: top + "px", left: left + "px" }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                tabIndex={-1}
                ref={(ref) => {
                  if (!itemRefs.current) return;
                  itemRefs.current[i] = ref;
                }}
                className="focus:ring-1"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </>
    );
  },
);

export default SuggestionMenu;
