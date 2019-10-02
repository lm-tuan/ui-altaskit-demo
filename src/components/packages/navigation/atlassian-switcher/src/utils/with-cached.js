export const RELEASE_RESOLVED_PROMISE_DELAY = 5000;
const isPromise = (p) => {
    return typeof p.then === 'function' && typeof p.catch === 'function';
};
/**
 * withCached wraps a function and keeps track of in-flight promises:
 *
 * 1. First call will result to normal invocation. After promise is resolved
 * it will be removed from the promise-cache and store value into result-cache.
 *
 * 2. Second and subsequent calls will:
 *    a) return unresolved promise if any
 *    b) do a normal invocation otherwise
 *
 * 3. Provides methods to get `cached` value and `reset` caches
 */
export const withCached = (fn) => {
    const resultCache = new Map();
    const promiseCache = new Map();
    function getCacheKey(...args) {
        return JSON.stringify(args);
    }
    const cached = (...args) => {
        const cacheKey = getCacheKey(...args);
        return resultCache.get(cacheKey);
    };
    const reset = () => {
        resultCache.clear();
        promiseCache.clear();
    };
    const execute = (...args) => {
        const cacheKey = getCacheKey(...args);
        const cachedPromise = promiseCache.get(cacheKey);
        if (cachedPromise !== undefined) {
            return cachedPromise;
        }
        const maybePromise = fn(...args);
        promiseCache.set(cacheKey, maybePromise);
        if (isPromise(maybePromise)) {
            maybePromise
                .then(result => {
                resultCache.set(cacheKey, result);
                setTimeout(() => promiseCache.delete(cacheKey), RELEASE_RESOLVED_PROMISE_DELAY);
            })
                .catch(() => {
                promiseCache.delete(cacheKey);
            });
        }
        return maybePromise;
    };
    return Object.assign(execute, fn, {
        cached,
        reset,
    });
};
