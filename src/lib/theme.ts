"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "dictateflow-theme";

/**
 * A minimal external store so the toggle can read the persisted preference
 * without an effect correcting the first render.
 *
 * "system" is represented by the absence of both the storage key and the
 * data-theme attribute, which lets prefers-color-scheme decide — the same way
 * the app follows Windows.
 */
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

/** The server cannot read localStorage; the inline head script fixes the
 *  paint, and this store settles on the first client read. */
function getServerSnapshot(): Theme {
  return "system";
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setTheme(next: Theme) {
  try {
    if (next === "system") {
      localStorage.removeItem(THEME_STORAGE_KEY);
      document.documentElement.removeAttribute("data-theme");
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, next);
      document.documentElement.setAttribute("data-theme", next);
    }
  } catch {
    // Preference cannot be persisted. Still update the current page.
    if (next === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", next);
    }
  }
  emit();
}
