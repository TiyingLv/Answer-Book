/**
 * 随机抽取逻辑。
 * 从内置短句库中随机抽取一条，尽量避免连续重复：
 * - 随机索引
 * - 排除最近若干条（存于 LocalStorage）
 * - 抽完后把结果写入「最近记录」
 */

import { quotes, type Quote } from "../data/quotes";
import { getRecentIds, pushRecentId } from "./storage";

export function getRandomQuote(excludeIds?: string[]): Quote {
  const recent = getRecentIds();
  const blocked = new Set<string>([...(excludeIds ?? []), ...recent]);

  // 优先在「未出现过」的句子里抽；如果全被排除，则退回全库兜底
  let pool = quotes.filter((q) => !blocked.has(q.id));
  if (pool.length === 0) {
    pool = quotes;
  }

  const index = Math.floor(Math.random() * pool.length);
  const quote = pool[index];

  pushRecentId(quote.id);
  return quote;
}

export { quotes };
