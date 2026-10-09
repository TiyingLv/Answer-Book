import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuoteCard from "../components/QuoteCard";
import DeepDiveButton from "../components/DeepDiveButton";
import FavoriteButton from "../components/FavoriteButton";
import { useAnswerBook } from "../context/AnswerBookContext";
import { answerHints, pickHint } from "../data/hints";

export default function Answer() {
  const navigate = useNavigate();
  const { currentQuote, drawQuote } = useAnswerBook();
  const [turning, setTurning] = useState(false);
  const [nonce, setNonce] = useState(0);

  const hint = useMemo(() => pickHint(answerHints), [nonce]);

  useEffect(() => {
    if (!currentQuote && !turning) {
      navigate("/", { replace: true });
    }
  }, [currentQuote, turning, navigate]);

  const drawAgain = () => {
    setTurning(true);
    window.setTimeout(() => {
      drawQuote();
      setNonce((n) => n + 1);
      setTurning(false);
    }, 680);
  };

  if (!currentQuote) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
      <div className="animate-fadeIn w-full max-w-xl">
        <p className="font-serifEn text-center text-xs tracking-[0.45em] text-ink-faint">
          YOUR&nbsp;ANSWER
        </p>

        <div className="mt-10">
          {turning ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <span className="animate-breathe text-base tracking-[0.4em] text-accent">
                正在翻开……
              </span>
            </div>
          ) : (
            <div key={nonce} className="animate-turn">
              <QuoteCard quote={currentQuote} animate />
            </div>
          )}
        </div>

        <p className="mt-12 text-center text-sm leading-relaxed tracking-[0.12em] text-ink-soft">
          {hint}
        </p>

        <div className="mt-12 flex flex-col items-center gap-3">
          <DeepDiveButton />

          <div className="flex items-center gap-2">
            <button onClick={drawAgain} className="btn-ghost">
              再抽一次
            </button>
            <FavoriteButton quote={currentQuote} className="btn-ghost" />
          </div>
        </div>
      </div>
    </div>
  );
}
