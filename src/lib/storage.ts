/**
 * 本地存储封装（LocalStorage）。
 * 负责：收藏、当前抽到的答案、最近抽取记录。
 * 所有方法都做了 try/catch，避免隐私模式下 LocalStorage 不可用导致崩溃。
 */

import type { Quote } from "../data/quotes";

const FAVORITES_KEY = "answer-book:favorites";
const CURRENT_KEY = "answer-book:current";
const RECENT_KEY = "answer-book:recent";

const RECENT_LIMIT = 20;

export interface StoredFavorite {
  quote: Quote;
  savedAt: string; // ISO 时间戳
}

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* 忽略写入失败 */
  }
}

// ————————————————————————— 收藏 —————————————————————————

export function getFavorites(): StoredFavorite[] {
  const raw = safeGet(FAVORITES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFavorites(list: StoredFavorite[]): void {
  safeSet(FAVORITES_KEY, JSON.stringify(list));
}

export function isFavorite(id: string): boolean {
  return getFavorites().some((f) => f.quote.id === id);
}

export function toggleFavorite(quote: Quote): StoredFavorite[] {
  const list = getFavorites();
  const exists = list.some((f) => f.quote.id === quote.id);
  let next: StoredFavorite[];
  if (exists) {
    next = list.filter((f) => f.quote.id !== quote.id);
  } else {
    next = [
      { quote, savedAt: new Date().toISOString() },
      ...list,
    ];
  }
  saveFavorites(next);
  return next;
}

// ————————————————————————— 当前答案 —————————————————————————

export function getCurrentQuote(): Quote | null {
  const raw = safeGet(CURRENT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Quote;
  } catch {
    return null;
  }
}

export function setCurrentQuote(quote: Quote | null): void {
  if (quote === null) {
    try {
      window.localStorage.removeItem(CURRENT_KEY);
    } catch {
      /* ignore */
    }
    return;
  }
  safeSet(CURRENT_KEY, JSON.stringify(quote));
}

// ————————————————————————— 最近抽取记录 —————————————————————————

export function getRecentIds(): string[] {
  const raw = safeGet(RECENT_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function pushRecentId(id: string): void {
  const list = getRecentIds().filter((x) => x !== id);
  list.unshift(id);
  safeSet(RECENT_KEY, JSON.stringify(list.slice(0, RECENT_LIMIT)));
}
