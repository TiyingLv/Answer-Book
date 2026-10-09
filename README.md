# 答案之书

一本数字化的、具有文学气质的现代「答案之书」。

默念一个问题，翻开答案，从 437 条文学短句中随机得到一句话——然后，让 AI 帮你理解这句话为什么可能正是你的答案。

> 它不是算命，也不是名言随机生成器。它是一次「先抽到答案，再解释答案」的安静阅读。

## 使用方式

1. 默念一个问题（不必告诉任何人）
2. 点击「翻开答案」
3. 得到一句文学短句，附作者与出处
4. 可「深度解惑」——输入你默念的问题，让 AI 基于这句话做文学化解读
5. 可收藏，在「我的答案」中回顾

## 本地运行

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 构建到 dist/
npm test         # 逻辑冒烟测试
```

## 接入 AI

深度解惑默认走真实 AI 接口（OpenAI 兼容）。复制 `.env.example` 为 `.env.local`，填入：

```
VITE_AI_API_KEY=你的Key
VITE_AI_BASE_URL=https://api.siliconflow.cn/v1
VITE_AI_MODEL=deepseek-ai/DeepSeek-V3
```

未配置 Key 时，深度解惑会明确提示「AI 未就绪」，不会静默返回本地示例。

> 注意：`VITE_` 前缀变量会打进前端构建产物，纯前端直连意味着 Key 会暴露在浏览器中。若需对外公开部署，请加一层后端代理保护 Key。

## 数据

短句库位于 `src/data/quotes.ts`，共 437 条，每条含 `id / text / author / work / category / sourceType / keywords / sourceVerified` 字段。向数组追加即可继续扩容。

## 技术栈

React · Vite · TypeScript · Tailwind CSS · lucide-react · LocalStorage
