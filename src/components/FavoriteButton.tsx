import { Heart } from "lucide-react";
import type { Quote } from "../data/quotes";
import { useAnswerBook } from "../context/AnswerBookContext";

interface FavoriteButtonProps {
  quote: Quote;
  className?: string;
}

/**
 * 收藏按钮：切换收藏状态，带微妙反馈。
 */
export default function FavoriteButton({
  quote,
  className = "",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useAnswerBook();
  const fav = isFavorite(quote.id);

  return (
    <button
      onClick={() => toggleFavorite(quote)}
      className={`btn-ghost-plain ${className}`}
      aria-pressed={fav}
      aria-label={fav ? "取消收藏" : "收藏"}
    >
      <Heart
        className={`h-4 w-4 transition-all duration-300 ${
          fav ? "fill-accent text-accent" : "text-ink-soft"
        }`}
        strokeWidth={1.5}
      />
      <span>{fav ? "已收藏" : "收藏"}</span>
    </button>
  );
}
