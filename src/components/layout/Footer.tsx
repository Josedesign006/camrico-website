import { Wordmark } from "@/components/navigation/Wordmark";
import { navItems, site } from "@/data/site";

export function Footer() {
  const year = 2026; // static to avoid hydration mismatch; update as needed

  return (
    <footer className="border-t border-subtle py-12">
      <div className="shell">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-xs text-sm text-text-muted">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-subtle pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. A concept marketing site — not affiliated with Apple.</p>
          <p className="font-mono">Built for macOS · {site.download.macOS}</p>
        </div>
      </div>
    </footer>
  );
}
