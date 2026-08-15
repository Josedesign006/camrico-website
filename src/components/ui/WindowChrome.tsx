import { cn } from "@/lib/utils";

type WindowChromeProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Right-aligned controls rendered in the title bar. */
  trailing?: React.ReactNode;
  tone?: "editor" | "panel";
};

/**
 * An authentic-feeling macOS window: traffic lights, a centered title,
 * restrained shadow and corner radius. Rebuilt in HTML so it stays crisp
 * and responsive rather than being a pasted screenshot.
 */
export function WindowChrome({
  title,
  children,
  className,
  bodyClassName,
  trailing,
  tone = "editor",
}: WindowChromeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-subtle bg-surface-1 shadow-window",
        className
      )}
    >
      <div
        className={cn(
          "relative flex h-9 items-center gap-2 border-b border-subtle px-3.5",
          tone === "editor" ? "bg-surface-2" : "bg-surface-2/80"
        )}
      >
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        {title ? (
          <span className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 font-mono text-[11px] text-text-muted sm:block">
            {title}
          </span>
        ) : null}
        <div className="ml-auto flex items-center gap-2">{trailing}</div>
      </div>
      <div className={cn("relative", bodyClassName)}>{children}</div>
    </div>
  );
}
