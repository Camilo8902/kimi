import { useState, useEffect, useCallback, useRef } from 'react';

// Cache entry with TTL
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Global cache store (simulates distributed cache)
const globalCache = new Map<string, CacheEntry<any>>();

interface UseCacheOptions {
  ttl?: number; // Time to live in milliseconds (default: 5 minutes)
  key?: string;
}

interface UseCacheReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  invalidate: () => void;
  setCache: (data: T) => void;
}

/**
 * Hook for distributed caching
 * Provides client-side caching with TTL support
 */
export function useCache<T>(
  fetcher: () => Promise<T>,
  options: UseCacheOptions = {}
): UseCacheReturn<T> {
  const { ttl = 5 * 60 * 1000, key = fetcher.toString() } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true);

  // Check if cache is valid
  const isCacheValid = useCallback((entry: CacheEntry<T> | undefined): boolean => {
    if (!entry) return false;
    const entryTtl = entry.ttl || ttl;
    return Date.now() - entry.timestamp < entryTtl;
  }, [ttl]);

  // Fetch data with caching
  const fetchData = useCallback(async (force = false) => {
    if (!isMounted.current) return;

    // Check cache first
    const cached = globalCache.get(key) as CacheEntry<T> | undefined;
    
    if (!force && cached && isCacheValid(cached)) {
      setData(cached.data);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      
      if (isMounted.current) {
        // Update cache
        globalCache.set(key, {
          data: result,
          timestamp: Date.now(),
          ttl,
        });
        
        setData(result);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err : new Error(String(err)));
        
        // Use stale cache if available
        if (cached) {
          setData(cached.data);
        }
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [fetcher, key, ttl, isCacheValid]);

  // Initial fetch
  useEffect(() => {
    fetchData();
    
    return () => {
      isMounted.current = false;
    };
  }, [fetchData]);

  // Manual refresh
  const refresh = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  // Invalidate cache
  const invalidate = useCallback(() => {
    globalCache.delete(key);
    setData(null);
  }, [key]);

  // Set cache manually
  const setCache = useCallback((newData: T) => {
    globalCache.set(key, {
      data: newData,
      timestamp: Date.now(),
      ttl,
    });
    setData(newData);
  }, [key, ttl]);

  return {
    data,
    isLoading,
    error,
    refresh,
    invalidate,
    setCache,
  };
}

// Hook for localStorage caching
interface UseLocalStorageCacheOptions<T> {
  key: string;
  defaultValue?: T;
  ttl?: number;
}

export function useLocalStorageCache<T>(
  options: UseLocalStorageCacheOptions<T>
): [T | null, (value: T | null) => void, () => void] {
  const { key, defaultValue = null, ttl = Infinity } = options;

  const getStoredValue = useCallback((): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;

      const parsed = JSON.parse(item);
      
      // Check TTL
      if (ttl !== Infinity && parsed.timestamp && Date.now() - parsed.timestamp > ttl) {
        localStorage.removeItem(key);
        return defaultValue;
      }

      return parsed.data;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }, [key, defaultValue, ttl]);

  const [value, setValue] = useState<T | null>(getStoredValue);

  const setStoredValue = useCallback((newValue: T | null) => {
    try {
      if (newValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify({
          data: newValue,
          timestamp: Date.now(),
        }));
      }
      setValue(newValue);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key]);

  const removeValue = useCallback(() => {
    localStorage.removeItem(key);
    setValue(defaultValue);
  }, [key, defaultValue]);

  return [value, setStoredValue, removeValue];
}

// Hook for session caching (memory only)
export function useSessionCache<T>(key: string): [T | undefined, (value: T) => void, () => void] {
  const cacheRef = useRef<Map<string, T>>(new Map());

  const getValue = useCallback((): T | undefined => {
    return cacheRef.current.get(key);
  }, [key]);

  const [value, setValueState] = useState<T | undefined>(getValue);

  const setValue = useCallback((newValue: T) => {
    cacheRef.current.set(key, newValue);
    setValueState(newValue);
  }, [key]);

  const removeValue = useCallback(() => {
    cacheRef.current.delete(key);
    setValueState(undefined);
  }, [key]);

  return [value, setValue, removeValue];
}

// Cache management utilities
export const cacheUtils = {
  // Clear all cache
  clearAll: () => {
    globalCache.clear();
  },

  // Clear expired entries
  clearExpired: () => {
    const now = Date.now();
    for (const [key, entry] of globalCache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        globalCache.delete(key);
      }
    }
  },

  // Get cache size
  getSize: () => globalCache.size,

  // Get cache keys
  getKeys: () => Array.from(globalCache.keys()),

  // Preload data into cache
  preload: <T>(key: string, data: T, ttl = 5 * 60 * 1000) => {
    globalCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  },

  // Get from cache without hook
  get: <T>(key: string): T | null => {
    const entry = globalCache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > entry.ttl) {
      globalCache.delete(key);
      return null;
    }
    return entry.data;
  },
};

// Auto-clear expired cache every 5 minutes
setInterval(cacheUtils.clearExpired, 5 * 60 * 1000);
