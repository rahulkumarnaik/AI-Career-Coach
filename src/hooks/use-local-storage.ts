import { useState, useEffect, useCallback } from 'react';

// Custom event for same-tab localStorage updates
const STORAGE_UPDATE_EVENT = 'localStorageUpdate';

// Dispatch custom event when localStorage changes
export function dispatchLocalStorageUpdate(key: string) {
  window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_EVENT, { detail: { key } }));
}

// Hook to listen for localStorage changes (both same-tab and cross-tab)
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom event for same-tab updates
      dispatchLocalStorageUpdate(key);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage key "${key}":`, error);
        }
      }
    };

    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        try {
          const item = window.localStorage.getItem(key);
          if (item !== null) {
            setStoredValue(JSON.parse(item));
          }
        } catch (error) {
          console.error(`Error reading localStorage key "${key}":`, error);
        }
      }
    };

    // Listen for cross-tab changes
    window.addEventListener('storage', handleStorageChange);
    // Listen for same-tab changes
    window.addEventListener(STORAGE_UPDATE_EVENT, handleCustomStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(STORAGE_UPDATE_EVENT, handleCustomStorageChange as EventListener);
    };
  }, [key]);

  return [storedValue, setValue];
}

// Hook specifically for metrics with auto-refresh
export function useMetrics() {
  const [metrics, setMetrics] = useLocalStorage('metrics', {});
  
  // Auto-refresh every 10 seconds for active updates
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const item = window.localStorage.getItem('metrics');
        if (item) {
          setMetrics(JSON.parse(item));
        }
      } catch (error) {
        console.error('Error auto-refreshing metrics:', error);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [setMetrics]);

  return metrics;
}
