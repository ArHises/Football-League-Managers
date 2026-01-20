// src/services/apiCache.js

const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes
const PREFIX = "apiCache:";

function safeJsonParse(value) {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
}

function now() {
    return Date.now();
}

function makeKey(key) {
    return `${PREFIX}${key}`;
}

export function getCache(key) {
    const raw = localStorage.getItem(makeKey(key));
    if (!raw) return null;

    const entry = safeJsonParse(raw);
    if (!entry || typeof entry !== "object") {
        localStorage.removeItem(makeKey(key));
        return null;
    }

    const { expiresAt, data } = entry;
    if (typeof expiresAt !== "number" || now() > expiresAt) {
        localStorage.removeItem(makeKey(key));
        return null;
    }

    return data;
}

export function setCache(key, data, ttlMs = DEFAULT_TTL_MS) {
    const entry = {
        expiresAt: now() + ttlMs,
        data,
    };
    localStorage.setItem(makeKey(key), JSON.stringify(entry));
}

export function deleteCache(key) {
    localStorage.removeItem(makeKey(key));
}

export function clearApiCache() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i += 1) {
        const k = localStorage.key(i);
        if (k && k.startsWith(PREFIX)) keysToRemove.push(k);
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
}

/**
 * Cached GET helper.
 * - Uses `cacheKey` if provided, otherwise uses `url`.
 * - Only caches successful JSON responses.
 */
export async function cachedGetJson(
    url,
    {
        cacheKey,
        ttlMs = DEFAULT_TTL_MS,
        fetchOptions = {},
        forceRefresh = false,
    } = {}
) {
    const key = cacheKey ?? url;

    if (!forceRefresh) {
        const cached = getCache(key);
        if (cached !== null) return cached;
    }

    const res = await fetch(url, { method: "GET", ...fetchOptions });
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    setCache(key, data, ttlMs);
    return data;
}
