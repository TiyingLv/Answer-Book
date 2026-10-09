/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 米白 / 纸张
        paper: "#faf6ee",
        "paper-2": "#f3ecde",
        "paper-3": "#ece2cf",
        // 暖黑 / 墨色
        ink: "#23201a",
        "ink-2": "#3a352c",
        "ink-soft": "#7a7061",
        "ink-faint": "#a89d8a",
        // 暗红 / 棕（极少量的强调色）
        accent: "#8a3a2b",
        "accent-deep": "#6f2d21",
        // 分隔线
        line: "#e6dcc7",
      },
      fontFamily: {
        serif: [
          '"Noto Serif SC"',
          '"Source Han Serif SC"',
          '"Songti SC"',
          '"STSong"',
          '"SimSun"',
          "Georgia",
          '"Times New Roman"',
          "serif",
        ],
        serifEn: ["Georgia", '"Times New Roman"', "serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      boxShadow: {
        page: "0 1px 2px rgba(35,32,26,0.04), 0 12px 40px -12px rgba(35,32,26,0.18)",
        "page-sm": "0 1px 1px rgba(35,32,26,0.03), 0 8px 24px -10px rgba(35,32,26,0.14)",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.02)", opacity: "0.92" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        turn: {
          "0%": { opacity: "0", transform: "rotateY(-18deg) translateX(-4px)" },
          "100%": { opacity: "1", transform: "rotateY(0deg) translateX(0)" },
        },
      },
      animation: {
        breathe: "breathe 3.6s ease-in-out infinite",
        fadeIn: "fadeIn 0.6s ease-out both",
        fadeUp: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both",
        turn: "turn 0.7s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
