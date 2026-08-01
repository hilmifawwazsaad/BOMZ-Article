import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeProviderContext } from "@/contexts/themeContext";

export default function Navigation() {
  const { theme, setTheme } = useContext(ThemeProviderContext);

  function cycleTheme() {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  }

  const themeIcon =
    theme === "light" ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Mode terang">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ) : theme === "dark" ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Mode gelap">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Mode sistem">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    );

  return (
    <header className="flex items-center justify-between px-8 py-4 sticky top-0 bg-(--bg) z-10 max-lg:px-5 max-lg:py-3">
      <Link to="/" className="no-underline flex items-baseline gap-2">
        <span className="text-xl font-bold text-(--text-h) tracking-tight">BOMZ</span>
        <span className="text-base font-normal text-(--text)">Article</span>
      </Link>
      <button
        type="button"
        onClick={cycleTheme}
        className="flex items-center justify-center text-(--text) bg-transparent rounded-sm p-2 cursor-pointer leading-none hover:text-(--text-h)"
      >
        {themeIcon}
      </button>
    </header>
  );
}
