import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Quote } from "../data/quotes";
import { getRandomQuote } from "../lib/randomQuote";
import {
  getCurrentQuote,
  setCurrentQuote,
  getFavorites,
  toggleFavorite,
  type StoredFavorite,
} from "../lib/storage";

interface AnswerBookContextValue {
  /** 当前抽到的答案（未抽取时为 null） */
  currentQuote: Quote | null;
  /** 收藏列表 */
  favorites: StoredFavorite[];
  /** 随机抽取一条并设为当前答案 */
  drawQuote: () => Quote;
  /** 手动设置当前答案（例如从收藏进入） */
  setQuote: (quote: Quote) => void;
  /** 收藏 / 取消收藏 */
  toggleFavorite: (quote: Quote) => void;
  /** 是否已收藏 */
  isFavorite: (id: string) => boolean;
}

const AnswerBookContext = createContext<AnswerBookContextValue | null>(null);

export function AnswerBookProvider({ children }: { children: ReactNode }) {
  const [currentQuote, setCurrent] = useState<Quote | null>(() =>
    getCurrentQuote(),
  );
  const [favorites, setFavorites] = useState<StoredFavorite[]>(() =>
    getFavorites(),
  );

  const drawQuote = useCallback((): Quote => {
    const quote = getRandomQuote();
    setCurrent(quote);
    setCurrentQuote(quote);
    return quote;
  }, []);

  const setQuote = useCallback((quote: Quote) => {
    setCurrent(quote);
    setCurrentQuote(quote);
  }, []);

  const toggle = useCallback((quote: Quote) => {
    const next = toggleFavorite(quote);
    setFavorites(next);
  }, []);

  const isFav = useCallback(
    (id: string) => favorites.some((f) => f.quote.id === id),
    [favorites],
  );

  const value = useMemo<AnswerBookContextValue>(
    () => ({
      currentQuote,
      favorites,
      drawQuote,
      setQuote,
      toggleFavorite: toggle,
      isFavorite: isFav,
    }),
    [currentQuote, favorites, drawQuote, setQuote, toggle, isFav],
  );

  return (
    <AnswerBookContext.Provider value={value}>
      {children}
    </AnswerBookContext.Provider>
  );
}

export function useAnswerBook(): AnswerBookContextValue {
  const ctx = useContext(AnswerBookContext);
  if (!ctx) {
    throw new Error("useAnswerBook 必须在 AnswerBookProvider 内使用");
  }
  return ctx;
}
