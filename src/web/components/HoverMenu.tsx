import classNames from "classnames";
import {
  type PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "hono/jsx";

type HoverMenuProps = PropsWithChildren<{
  trigger: Required<PropsWithChildren["children"]>;
}>;

export function HoverMenu({ trigger, children }: HoverMenuProps) {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(null);
  const [extended, setExtended] = useState(false);

  const onMouseEnter = useCallback(() => {
    timeoutId.current = null;
    setExtended(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    timeoutId.current = setTimeout(() => {
      setExtended(false);
    }, 1000);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={classNames({
          "bg-slate-100 z-50": extended,
          "p-2 -m-2 rounded": true,
        })}
      >
        {trigger}
      </div>
      {extended && (
        <div className="absolute right-0 bg-slate-100 p-4 m-1 -mx-2 shadow-2xl z-40">
          {children}
        </div>
      )}
    </div>
  );
}
