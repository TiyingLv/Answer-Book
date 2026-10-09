import { Link, useNavigate } from "react-router-dom";
import { Compass, Trash2 } from "lucide-react";
import { useAnswerBook } from "../context/AnswerBookContext";
import type { StoredFavorite } from "../lib/storage";

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
      d.getHours(),
    )}:${pad(d.getMinutes())}`;
  } catch {
    return "";
  }
}

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, setQuote } = useAnswerBook();

  const goDeepDive = (f: StoredFavorite) => {
    setQuote(f.quote);
    navigate("/deepdive");
  };

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-8">
      <div className="animate-fadeIn w-full max-w-xl">
        <h1 className="text-center text-xl tracking-[0.4em] text-ink">
          我的答案
        </h1>
        <p className="mt-3 text-center text-sm tracking-[0.2em] text-ink-soft">
          {favorites.length > 0
            ? `已收藏 ${favorites.length} 句`
            : "收藏你喜欢的句子"}
        </p>

        {favorites.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-sm leading-relaxed tracking-[0.12em] text-ink-faint">
              还没有收藏任何句子。
              <br />
              回到答案之书，随手翻开一页吧。
            </p>
            <Link to="/" className="btn-primary mt-8">
              去翻开答案
            </Link>
          </div>
        ) : (
          <ul className="mt-10 space-y-4">
            {favorites.map((f) => (
              <li
                key={f.quote.id}
                className="group rounded-sm border border-line bg-paper-2/40 px-6 py-6 shadow-page-sm transition-shadow hover:shadow-page"
              >
                <button
                  onClick={() => goDeepDive(f)}
                  className="block w-full text-left"
                >
                  <p className="text-base leading-[2] text-ink">
                    {f.quote.text}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
                    <span>—— {f.quote.author}</span>
                    <span className="text-ink-faint">·</span>
                    <span>{f.quote.work}</span>
                  </div>
                </button>

                <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-3">
                  <span className="text-xs tracking-[0.1em] text-ink-faint">
                    收藏于 {formatTime(f.savedAt)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => goDeepDive(f)}
                      className="btn-ghost-plain"
                      aria-label="再次解读"
                    >
                      <Compass className="h-4 w-4" strokeWidth={1.5} />
                      <span>再次解读</span>
                    </button>
                    <button
                      onClick={() => toggleFavorite(f.quote)}
                      className="btn-ghost-plain"
                      aria-label="取消收藏"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      <span>取消</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
