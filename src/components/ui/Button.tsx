"use client";

import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  withArrow?: boolean;
};

/** The real Apple (company) logo — not the lucide apple-fruit glyph. */
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z" />
    </svg>
  );
}

export const DownloadButton = forwardRef<HTMLAnchorElement, ButtonProps>(
  function DownloadButton(
    { className, size = "md", children, ...props },
    ref
  ) {
    return (
      <a
        ref={ref}
        download
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full bg-text-primary font-medium text-background transition-transform duration-200 ease-out-quint hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
          size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm",
          className
        )}
        {...props}
      >
        <AppleLogo
          className={cn(
            "-mt-0.5 transition-transform duration-300 group-hover:translate-y-0.5",
            size === "lg" ? "h-[18px] w-[18px]" : "h-4 w-4"
          )}
        />
        {children ?? "Download for Mac"}
      </a>
    );
  }
);

export const SecondaryButton = forwardRef<HTMLAnchorElement, ButtonProps>(
  function SecondaryButton(
    { className, size = "md", withArrow, children, ...props },
    ref
  ) {
    return (
      <a
        ref={ref}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full border border-strong bg-surface-2/60 font-medium text-text-primary transition-colors duration-200 hover:bg-surface-3",
          size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm",
          className
        )}
        {...props}
      >
        {children}
        {withArrow ? (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        ) : null}
      </a>
    );
  }
);
