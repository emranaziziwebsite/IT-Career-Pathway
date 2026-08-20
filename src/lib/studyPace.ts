"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_HOURS_PER_WEEK } from "./estimate";

const STORAGE_KEY = "itcpe:hours-per-week";
const listeners = new Set<() => void>();

function readHoursPerWeek(): number {
  if (typeof window === "undefined") return DEFAULT_HOURS_PER_WEEK;
  const stored = Number(window.localStorage.getItem(STORAGE_KEY));
  return stored > 0 ? stored : DEFAULT_HOURS_PER_WEEK;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function writeHoursPerWeek(next: number) {
  window.localStorage.setItem(STORAGE_KEY, String(next));
  listeners.forEach((l) => l());
}

/** Shared, persisted "how many hours a week do you plan to study" preference. */
export function useStudyPace() {
  const hoursPerWeek = useSyncExternalStore(subscribe, readHoursPerWeek, () => DEFAULT_HOURS_PER_WEEK);
  const setHoursPerWeek = useCallback((next: number) => writeHoursPerWeek(next), []);
  return { hoursPerWeek, setHoursPerWeek };
}
