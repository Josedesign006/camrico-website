"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, site, spySections } from "@/data/site";
import { useScrollState } from "@/hooks/useScrollState";
import { useActiveSection } from "@/hooks/useActiveSection";
import { DownloadButton } from "@/components/ui/Button";
import { Wordmark } from "@/components/navigation/Wordmark";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrollState(24);
  const active = useActiveSection(spySections);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "relative transition-all duration-300 ease-out-quint",
          scrolled
            ? "border-b border-subtle bg-background/72 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* Scroll progress line */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={cn(
            "absolute bottom-0 left-0 right-0 h-px origin-left bg-accent-record transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0"
          )}
        />
        <div className="shell">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-300 ease-out-quint",
              scrolled ? "h-14" : "h-[72px]"
            )}
          >
            <a href="#top" className="flex items-center gap-2.5" aria-label={site.name}>
              <Wordmark />
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = active === id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200",
                      isActive
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3.5 -bottom-0.5 h-px bg-text-primary"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ) : null}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <DownloadButton
                href={site.download.href}
                className={cn(
                  "hidden transition-all duration-300 sm:inline-flex",
                  scrolled ? "opacity-100" : "opacity-90"
                )}
              />
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full text-text-primary md:hidden"
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="shell flex h-[72px] items-center justify-between">
              <Wordmark />
              <div className="flex items-center gap-1.5">
                <ThemeToggle />
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full text-text-primary"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <nav
              className="shell flex flex-col gap-1 pt-8"
              aria-label="Mobile"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  className="border-b border-subtle py-4 text-2xl font-medium text-text-primary"
                >
                  {item.label}
                </motion.a>
              ))}
              <DownloadButton
                href={site.download.href}
                size="lg"
                className="mt-8 w-full"
                onClick={() => setOpen(false)}
              />
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
