import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  wash = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  wash?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 sm:py-28",
        wash && "studio-wash",
        className
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  copy,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  copy?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="type-display max-w-3xl text-balance text-4xl leading-[1.08] text-text-primary sm:text-5xl md:text-[3.5rem]">
        {title}
      </h2>
      {copy ? (
        <p className="max-w-prose text-pretty text-base leading-relaxed text-text-secondary sm:text-lg">
          {copy}
        </p>
      ) : null}
    </div>
  );
}
