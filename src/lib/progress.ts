"use client";

import { useCallback, useSyncExternalStore } from "react";
import { PathwaySection, ProgressState } from "@/types";

export type CareerProgressMap = Record<string, ProgressState>;

const cache: Record<string, CareerProgressMap> = {};
const listeners: Record<string, Set<() => void>> = {};
const emptySnapshot: CareerProgressMap = {};

function storageKey(careerId: string) {
  return `itcpe:progress:${careerId}`;
}

function load(careerId: string): CareerProgressMap {
  if (cache[careerId]) return cache[careerId];
  if (typeof window === "undefined") return emptySnapshot;
  try {
    const raw = window.localStorage.getItem(storageKey(careerId));
    cache[careerId] = raw ? JSON.parse(raw) : {};
  } catch {
    cache[careerId] = {};
  }
  return cache[careerId];
}

function save(careerId: string, data: CareerProgressMap) {
  cache[careerId] = data;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(storageKey(careerId), JSON.stringify(data));
  }
  listeners[careerId]?.forEach((listener) => listener());
}

function subscribe(careerId: string, callback: () => void) {
  if (!listeners[careerId]) listeners[careerId] = new Set();
  listeners[careerId].add(callback);
  return () => listeners[careerId]?.delete(callback);
}

export function useCareerProgress(careerId: string) {
  const getSnapshot = useCallback(() => load(careerId), [careerId]);
  const sub = useCallback((cb: () => void) => subscribe(careerId, cb), [careerId]);
  const progress = useSyncExternalStore(sub, getSnapshot, () => emptySnapshot);

  const cycleNodeState = useCallback(
    (nodeId: string) => {
      const current = load(careerId);
      const curState = current[nodeId] ?? "not-started";
      const next: ProgressState =
        curState === "completed" ? "not-started" : curState === "learning" ? "completed" : "learning";
      save(careerId, { ...current, [nodeId]: next });
    },
    [careerId]
  );

  const resetProgress = useCallback(() => {
    save(careerId, {});
  }, [careerId]);

  return { progress, cycleNodeState, resetProgress };
}

/** Flattens a career's trackable (skill/certification) nodes in pathway order. */
export function getTrackableNodes(sections: PathwaySection[]) {
  return sections.flatMap((s) => s.nodes.filter((n) => n.kind === "skill" || n.kind === "certification"));
}

/**
 * Sequential skill-tree gating: the first incomplete trackable node is "current",
 * everything after it is "locked" until earlier nodes are completed.
 */
export function computeNodeStatuses(
  sections: PathwaySection[],
  progress: CareerProgressMap
): Record<string, ProgressState> {
  const result: Record<string, ProgressState> = {};
  const trackable = getTrackableNodes(sections);

  let gateOpen = true;
  for (const node of trackable) {
    const state = progress[node.id];
    if (state === "completed") {
      result[node.id] = "completed";
      continue;
    }
    if (!gateOpen) {
      result[node.id] = "locked";
      continue;
    }
    if (state === "learning") {
      result[node.id] = "learning";
    } else {
      result[node.id] = "current";
    }
    gateOpen = false;
  }

  const allDone = trackable.length > 0 && trackable.every((n) => progress[n.id] === "completed");
  for (const section of sections) {
    for (const node of section.nodes) {
      if (node.kind === "project-group") result[node.id] = "not-started";
      if (node.kind === "milestone") result[node.id] = allDone ? "completed" : "locked";
    }
  }
  return result;
}

export function computeCareerCompletion(sections: PathwaySection[], progress: CareerProgressMap) {
  const trackable = getTrackableNodes(sections);
  const total = trackable.length;
  const completed = trackable.filter((n) => progress[n.id] === "completed").length;
  const learning = trackable.filter((n) => progress[n.id] === "learning").length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, learning, percent };
}
