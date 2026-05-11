import React from "react";
import { Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className }) => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "group relative inline-flex h-9 w-[68px] items-center rounded-full border border-border bg-surface-muted p-1 transition-colors duration-300 hover:bg-secondary",
        className
      )}
    >
      <span
        className={cn(
          "absolute top-1 left-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-card shadow-sm transition-transform duration-300 ease-out",
          isDark ? "translate-x-[32px]" : "translate-x-0"
        )}
      >
        {isDark ? (
          <Moon size={15} weight="fill" className="text-primary" />
        ) : (
          <Sun size={15} weight="fill" className="text-primary" />
        )}
      </span>
      <span className="ml-1.5 inline-flex h-7 w-7 items-center justify-center text-muted-foreground">
        <Sun size={14} weight={isDark ? "regular" : "duotone"} />
      </span>
      <span className="ml-1.5 inline-flex h-7 w-7 items-center justify-center text-muted-foreground">
        <Moon size={14} weight={isDark ? "duotone" : "regular"} />
      </span>
    </button>
  );
};
