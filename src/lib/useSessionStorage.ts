"use client";

import { useState } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const stored = window.sessionStorage.getItem(key);
      if (stored !== null) {
        return JSON.parse(stored) as T;
      }
    } catch {
      // Ignore storage errors
    }
    return initialValue;
  });

  const setStored = (newValue: T) => {
    setValue(newValue);
    try {
      if (newValue === null || newValue === undefined || newValue === ("" as unknown as T)) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch {
      // Ignore storage errors
    }
  };

  const clear = () => {
    setValue(initialValue);
    try {
      sessionStorage.removeItem(key);
    } catch {
      // Ignore storage errors
    }
  };

  return [value, setStored, clear] as const;
}
