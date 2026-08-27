import type { Page } from "../daily-tracking/tracking-types.ts"
import { displayTitle, fieldStr } from "./format.ts"
import { DIFFICULTY_LEVEL_KEY } from "./levels.ts"

export interface SafetyChangeClone {
  readonly title: string
  readonly difficulty: string | undefined
  readonly relationships: readonly string[]
}

export interface PlannedSession {
  readonly title: string
  readonly startInstant: Date
  readonly safety: string
  readonly difficulty: string | undefined
  readonly relationships: readonly string[]
}

export function cloneOpenSessionForSafetyChange(open: Page): SafetyChangeClone {
  const rels = open.relationships
  return {
    title: displayTitle(open),
    difficulty: fieldStr(open, DIFFICULTY_LEVEL_KEY),
    relationships: Array.isArray(rels)
      ? rels.filter((r): r is string => typeof r === "string")
      : [],
  }
}

export function planSafetySplit(
  open: Page,
  safety: string,
  instant: Date
): { readonly closeAt: Date; readonly next: PlannedSession } {
  const clone = cloneOpenSessionForSafetyChange(open)
  return {
    closeAt: instant,
    next: {
      title: clone.title,
      startInstant: instant,
      safety,
      difficulty: clone.difficulty,
      relationships: clone.relationships,
    },
  }
}
