import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Compass, Loader2 } from "lucide-react";
import { useAnswerBook } from "../context/AnswerBookContext";
import { interpretQuote, type InterpretResult } from "../lib/ai";

export default function DeepDive() {
  const navigate = useNavigate();
  const { currentQuote } = useAnswerBook();

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InterpretResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentQuote) {
      navigate("/", { replace: true });
    }
  }, [currentQuote, navigate]);

  if (!currentQuote) {
    return null;
  }

  const canSubmit = question.trim().length > 0 && !loading;

  const submit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await interpretQuote(question.trim(), currentQuote);
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "解读失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-8">
      <div className="animate-fadeIn w-full max-w-xl">
        <Link
          to="/answer"
          className="inline-flex items-center gap-1.5 text-sm tracking-[0.15em] text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          返回答案
        </Link>

        {/* 抽到的答案 */}
        <div className="mt-8 rounded-sm border border-line bg-paper-2/50 px-6 py-8 text-center shadow-page-sm">
          <p className="text-base leading-[2] text-ink">{currentQuote.text}</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-soft">
            <span className="hidden w-8 sm:block hairline" />
            <span className="tracking-[0.1em]">
              —— {currentQuote.author} · {currentQuote.work}
            </span>
            <span className="hidden w-8 sm:block hairline" />
          </div>
        </div>

        <p className="mt-10 text-center text-base tracking-[0.2em] text-ink">
          现在，可以告诉我你刚才默念的问题
        </p>

        <div className="mt-6">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="把刚才默念的问题告诉我……"
            rows={3}
            className="w-full resize-none rounded-sm border border-line bg-paper/60 px-4 py-3 text-base leading-relaxed text-ink placeholder:text-ink-faint focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/10"
          />
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={submit}
            disabled={!canSubmit}
            className={`btn-primary ${
              canSubmit ? "" : "cursor-not-allowed opacity-45"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                <span>正在解读……</span>
              </>
            ) : (
              <>
                <Compass className="h-4 w-4" strokeWidth={1.5} />
                <span>解读这句话</span>
              </>
            )}
          </button>
        </div>

        {/* 结果 */}
        {error && !loading && (
          <div className="animate-fadeUp mt-10">
            <div className="hairline" />
            <p className="mt-8 rounded-sm border border-accent/30 bg-accent/5 px-4 py-3 text-sm leading-relaxed text-accent">
              {error}
            </p>
          </div>
        )}

        {result && !loading && (
          <div className="animate-fadeUp mt-10">
            <div className="hairline" />
            <div className="mt-8 whitespace-pre-line text-[1.05rem] leading-[2.05] text-ink-2">
              {result.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
