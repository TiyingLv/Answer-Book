import { Link, Outlet, useLocation } from "react-router-dom";
import { BookOpen, BookMarked } from "lucide-react";

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="relative z-10 flex min-h-full flex-col">
      <header className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-6">
        <Link
          to="/"
          className="group flex items-center gap-2 whitespace-nowrap text-ink-2 transition-colors hover:text-ink"
        >
          <BookOpen className="h-[18px] w-[18px] text-accent" strokeWidth={1.5} />
          <span className="font-serifEn text-sm tracking-[0.3em] text-ink">
            ANSWER&nbsp;BOOK
          </span>
          <span className="hidden items-center text-sm tracking-[0.4em] text-ink-soft sm:inline-flex">
            答案之书
          </span>
        </Link>

        <Link
          to="/favorites"
          className={`flex items-center gap-1.5 whitespace-nowrap text-sm tracking-[0.2em] transition-colors ${
            pathname === "/favorites"
              ? "text-accent"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          <BookMarked className="h-4 w-4" strokeWidth={1.5} />
          <span>我的答案</span>
        </Link>
      </header>

      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>

      <footer className="mx-auto w-full max-w-2xl px-6 pb-8 pt-16 text-center">
        <p className="text-xs tracking-[0.3em] text-ink-faint">
          默念一个问题 · 随手翻开一页
        </p>
      </footer>
    </div>
  );
}
