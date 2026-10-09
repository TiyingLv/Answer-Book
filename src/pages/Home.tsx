import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookButton from "../components/BookButton";
import { useAnswerBook } from "../context/AnswerBookContext";
import { openingHints, pickHint } from "../data/hints";

export default function Home() {
  const navigate = useNavigate();
  const { drawQuote } = useAnswerBook();
  const [turning, setTurning] = useState(false);

  const hint = useMemo(() => pickHint(openingHints), []);

  useEffect(() => {
    if (turning) {
      const t = setTimeout(() => {
        drawQuote();
        navigate("/answer");
      }, 820);
      return () => clearTimeout(t);
    }
  }, [turning, drawQuote, navigate]);

  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <div className="animate-fadeIn w-full max-w-xl text-center">
        {/* 书页般的轻盈框 */}
        <div className="relative mx-auto rounded-sm px-6 py-14 shadow-page md:px-12 md:py-16">
          {/* 双线书页边框 */}
          <div className="pointer-events-none absolute inset-3 rounded-[2px] border border-line/70" />
          <div className="pointer-events-none absolute inset-[13px] rounded-[2px] border border-line/40" />

          <div className="relative">
            <p className="font-serifEn text-xs tracking-[0.45em] text-ink-faint">
              ANSWER&nbsp;BOOK
            </p>

            <h1 className="mt-6 text-2xl tracking-[0.5em] text-ink md:text-3xl">
              默念一个问题
            </h1>

            <p className="mt-5 text-base tracking-[0.25em] text-ink-soft">
              不必告诉我
            </p>

            <div className="mx-auto mt-12 flex justify-center">
              {turning ? (
                <div className="flex h-[52px] items-center justify-center">
                  <span className="animate-breathe text-base tracking-[0.4em] text-accent">
                    正在翻开……
                  </span>
                </div>
              ) : (
                <BookButton onClick={() => setTurning(true)}>
                  <span>翻开答案</span>
                </BookButton>
              )}
            </div>

            <p className="mt-12 min-h-[1.25rem] text-xs leading-relaxed tracking-[0.12em] text-ink-faint">
              {hint}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
