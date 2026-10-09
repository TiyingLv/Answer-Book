import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";

/**
 * 「深度解惑」主操作：进入 AI 解读页。
 */
export default function DeepDiveButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/deepdive")}
      className="btn-primary"
      aria-label="深度解惑"
    >
      <Compass className="h-4 w-4" strokeWidth={1.5} />
      <span>深度解惑</span>
    </button>
  );
}
