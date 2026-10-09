import type { Quote } from "../data/quotes";

interface QuoteCardProps {
  quote: Quote;
  /** 是否让正文逐行淡入（用于"翻开"后的过渡） */
  animate?: boolean;
  className?: string;
}

/**
 * 答案卡片：正文 + 作者 + 作品来源。
 * 像书页上一段被抄录下来的文字。
 */
export default function QuoteCard({
  quote,
  animate = false,
  className = "",
}: QuoteCardProps) {
  const lines = quote.text.split("\n");

  return (
    <figure className={`text-center ${className}`}>
      <blockquote className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-2 -top-8 select-none text-7xl leading-none text-accent/15 md:-left-10 md:text-8xl"
        >
          “
        </span>
        <p
          className={`px-2 text-[1.45rem] leading-[2.15] text-ink md:text-[1.7rem] md:leading-[2.25] ${
            animate ? "" : ""
          }`}
        >
          {lines.map((line, i) => (
            <span
              key={i}
              className={`block ${animate ? "reveal-line" : ""}`}
              style={animate ? { animationDelay: `${0.35 + i * 0.45}s` } : undefined}
            >
              {line}
            </span>
          ))}
        </p>
      </blockquote>

      <figcaption className="mt-10 flex flex-col items-center gap-2">
        <span className="hairline w-12" />
        <span className="mt-3 text-sm tracking-[0.15em] text-ink-2">
          —— {quote.author}
        </span>
        <span className="text-xs tracking-[0.08em] text-ink-soft">
          {quote.work}
        </span>
      </figcaption>
    </figure>
  );
}
