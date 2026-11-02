const STORAGE_KEY = 'next_invoice_orig_lookup_tracker';
const WINDOW_MS = 60 * 60 * 1000; // 1 giờ (60 phút)
export const MAX_LOOKUPS_PER_HOUR = 10;

export interface RateLimitStatus {
  count: number;
  remaining: number;
  isBlocked: boolean;
  resetInSeconds: number;
}

export function getRateLimitStatus(): RateLimitStatus {
  if (typeof window === 'undefined') {
    return {
      count: 0,
      remaining: MAX_LOOKUPS_PER_HOUR,
      isBlocked: false,
      resetInSeconds: 0,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    let timestamps: number[] = raw ? JSON.parse(raw) : [];

    // Chỉ giữ lại các timestamp trong vòng 1 giờ qua
    timestamps = timestamps.filter((ts) => typeof ts === 'number' && now - ts < WINDOW_MS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps));

    const count = timestamps.length;
    const remaining = Math.max(0, MAX_LOOKUPS_PER_HOUR - count);
    const isBlocked = count >= MAX_LOOKUPS_PER_HOUR;

    let resetInSeconds = 0;
    if (isBlocked && timestamps.length > 0) {
      const oldestTs = Math.min(...timestamps);
      const expiresAt = oldestTs + WINDOW_MS;
      resetInSeconds = Math.max(0, Math.ceil((expiresAt - now) / 1000));
    }

    return {
      count,
      remaining,
      isBlocked,
      resetInSeconds,
    };
  } catch {
    return {
      count: 0,
      remaining: MAX_LOOKUPS_PER_HOUR,
      isBlocked: false,
      resetInSeconds: 0,
    };
  }
}

export function recordLookupAttempt(): RateLimitStatus {
  if (typeof window === 'undefined') {
    return getRateLimitStatus();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    let timestamps: number[] = raw ? JSON.parse(raw) : [];

    timestamps = timestamps.filter((ts) => typeof ts === 'number' && now - ts < WINDOW_MS);
    timestamps.push(now);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps));
  } catch {
    // Ignore localStorage errors
  }

  return getRateLimitStatus();
}
