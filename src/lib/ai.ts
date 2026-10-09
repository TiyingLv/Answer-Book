/**
 * AI 解读模块（真实 AI，无离线 mock）。
 *
 * API 配置（通过环境变量）：
 *   在项目根目录创建 `.env.local` 文件，写入：
 *     VITE_AI_API_KEY=你的密钥
 *     VITE_AI_BASE_URL=https://api.siliconflow.cn/v1   （任意 OpenAI 兼容端点均可）
 *     VITE_AI_MODEL=deepseek-ai/DeepSeek-V3
 *
 * 也可在浏览器控制台临时覆盖（仅本地调试）：
 *   localStorage.setItem("answer-book:ai", JSON.stringify({
 *     apiKey: "...", baseURL: "https://...", model: "..."
 *   }))
 *
 * 未配置 Key、或调用失败时，直接抛出错误，由界面明确提示，不再降级为本地示例解读。
 */

import type { Quote } from "../data/quotes";
import { SYSTEM_PROMPT, buildUserPrompt } from "../prompts/answerBookPrompt";

export interface AIConfig {
  apiKey: string;
  baseURL: string;
  model: string;
}

const LS_KEY = "answer-book:ai";

export function getAIConfig(): AIConfig {
  // 1) 环境变量（.env.local）
  const env: AIConfig = {
    apiKey: import.meta.env.VITE_AI_API_KEY ?? "",
    baseURL: import.meta.env.VITE_AI_BASE_URL ?? "",
    model: import.meta.env.VITE_AI_MODEL ?? "",
  };

  // 2) LocalStorage 覆盖（用于无 Key 用户本地临时调试）
  let local: Partial<AIConfig> = {};
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (raw) local = JSON.parse(raw) as Partial<AIConfig>;
  } catch {
    /* ignore */
  }

  return {
    apiKey: local.apiKey ?? env.apiKey,
    baseURL: local.baseURL ?? env.baseURL ?? "https://api.siliconflow.cn/v1",
    model: local.model ?? env.model ?? "deepseek-ai/DeepSeek-V3",
  };
}

export function hasAPIKey(): boolean {
  return getAIConfig().apiKey.trim().length > 0;
}

export interface InterpretResult {
  content: string;
}

export async function interpretQuote(
  question: string,
  quote: Quote,
): Promise<InterpretResult> {
  const cfg = getAIConfig();

  if (!hasAPIKey()) {
    throw new Error("未配置 AI Key，请在 .env.local 中设置 VITE_AI_API_KEY 后重启。");
  }

  let res: Response;
  try {
    res = await fetch(`${cfg.baseURL.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cfg.apiKey}`,
      },
      body: JSON.stringify({
        model: cfg.model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: buildUserPrompt({
              question,
              text: quote.text,
              author: quote.author,
              work: quote.work,
            }),
          },
        ],
        temperature: 0.9,
        max_tokens: 900,
      }),
    });
  } catch {
    throw new Error("无法连接 AI 服务，请检查网络后重试。");
  }

  if (!res.ok) {
    let detail = "";
    try {
      const d = await res.json();
      detail = d?.error?.message || d?.message || "";
    } catch {
      /* ignore */
    }
    throw new Error(`AI 服务返回错误（${res.status}）${detail ? "：" + detail : ""}`);
  }

  const data = await res.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  if (!content || !content.trim()) {
    throw new Error("AI 返回内容为空，请重试。");
  }

  return { content: content.trim() };
}
