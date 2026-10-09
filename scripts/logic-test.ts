// 逻辑冒烟测试：随机抽取、短句库完整性、收藏 toggle
// 由 esbuild 打包后运行（Node 原生 strip-types 无法解析无扩展名导入）。

const store = new Map();
(globalThis as any).window = {
  localStorage: {
    getItem: (k: string) => (store.has(k) ? store.get(k) : null),
    setItem: (k: string, v: string) => store.set(k, String(v)),
    removeItem: (k: string) => store.delete(k),
    clear: () => store.clear(),
  },
};

import { quotes } from "../src/data/quotes";
import { getRandomQuote } from "../src/lib/randomQuote";
import * as storage from "../src/lib/storage";

let pass = 0;
let fail = 0;
function check(name: string, cond: boolean) {
  if (cond) {
    pass++;
    console.log("  ✓ " + name);
  } else {
    fail++;
    console.log("  ✗ " + name);
  }
}

console.log("短句库完整性：");
check(`短句数量 >= 100（当前 ${quotes.length}）`, quotes.length >= 100);
check("每条都有 text", quotes.every((q) => q.text && q.text.length > 0));
check("每条都有 author", quotes.every((q) => q.author));
check("每条都有 work", quotes.every((q) => q.work));
check(
  "每条都有 category 数组",
  quotes.every((q) => Array.isArray(q.category) && q.category.length > 0),
);
check(
  "id 唯一",
  new Set(quotes.map((q) => q.id)).size === quotes.length,
);

console.log("随机抽取：");
const drawn: string[] = [];
for (let i = 0; i < 40; i++) drawn.push(getRandomQuote().id);
check(
  "40 次抽取都返回有效对象",
  drawn.every((id) => quotes.some((q) => q.id === id)),
);
let noAdjRepeat = true;
for (let i = 1; i < drawn.length; i++) {
  if (drawn[i] === drawn[i - 1]) {
    noAdjRepeat = false;
    break;
  }
}
check("40 次抽取无相邻重复", noAdjRepeat);
check("抽取具有随机性（去重后 > 10 条不同）", new Set(drawn).size > 10);

console.log("收藏 toggle：");
const q = quotes[0];
check("初始未收藏", storage.isFavorite(q.id) === false);
storage.toggleFavorite(q);
check("toggle 后已收藏", storage.isFavorite(q.id) === true);
const favs = storage.getFavorites();
check("收藏含 savedAt 时间戳", !!favs[0] && typeof favs[0].savedAt === "string");
storage.toggleFavorite(q);
check("再次 toggle 后取消收藏", storage.isFavorite(q.id) === false);

console.log(`\n结果：${pass} 通过，${fail} 失败`);
if (fail > 0) process.exit(1);
