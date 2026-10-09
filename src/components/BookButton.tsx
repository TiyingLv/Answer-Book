import { type ButtonHTMLAttributes } from "react";

interface BookButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** 是否带呼吸动画（默认 true） */
  breathe?: boolean;
}

/**
 * 主按钮 ——「翻开答案」。
 * 克制的呼吸动画，serif 字体，宽间距，营造仪式感。
 */
export default function BookButton({
  children,
  breathe = true,
  className = "",
  ...rest
}: BookButtonProps) {
  return (
    <button
      className={`btn-primary ${breathe ? "animate-breathe" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
