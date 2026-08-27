import { answer } from "./page-query.ts"
import { type Row } from "./page-derive-shape.ts"
import { textOf } from "./page-query-values.ts"
import { patchPage } from "./page-write.ts"
import { resolveRoots } from "../../repo/roots/roots"

const POLICY = "selection-policy"

const PROFILE = "client-profile"

export interface GoalWeights {
  readonly longevity: number
  readonly energy: number
  readonly functionality: number
  readonly aesthetics: number
}

export interface SelectionPolicy {
  readonly weights: GoalWeights
  readonly noveltyCapPerSession: number
  readonly anchorBlockWeeks: number
  readonly weeklySetFloor: number
  readonly weeklySetCeiling: number
  readonly zone2WeeklyFloor: number
  readonly recencyWeight: number
  readonly recencySaturationDays: number
}

function only(pageType: string): Row {
  const found = answer(resolveRoots(), { pageType })
  if (found === null) throw new Error(`\`${pageType}\` names no page type whose pages are files`)
  const [row, second] = found.rows
  if (row === undefined) throw new Error(`no \`${pageType}\` page stands, so nothing states what it carries`)
  if (second !== undefined) {
    throw new Error(`${found.n} \`${pageType}\` pages stand where one carries them, so none of them holds`)
  }
  return row
}

function number(row: Row, pageType: string, key: string): number {
  const held = textOf(row.values, key)
  const value = held === null ? Number.NaN : Number(held)
  if (!Number.isFinite(value)) {
    throw new Error(`the \`${pageType}\` page states no number for \`${key}\`, so nothing supplies it`)
  }
  return value
}

export function readSelectionPolicy(): SelectionPolicy {
  const row = only(POLICY)
  const at = (key: string): number => number(row, POLICY, key)
  return {
    weights: {
      longevity: at("weight-longevity"),
      energy: at("weight-energy"),
      functionality: at("weight-functionality"),
      aesthetics: at("weight-aesthetics"),
    },
    noveltyCapPerSession: at("novelty-cap-per-session"),
    anchorBlockWeeks: at("anchor-block-weeks"),
    weeklySetFloor: at("weekly-set-floor"),
    weeklySetCeiling: at("weekly-set-ceiling"),
    zone2WeeklyFloor: at("zone2-weekly-floor"),
    recencyWeight: at("recency-weight"),
    recencySaturationDays: at("recency-saturation-days"),
  }
}

export function selectionPolicyStated(): ReadonlyMap<string, number> {
  const stated = new Map<string, number>()
  for (const [key, held] of Object.entries(only(POLICY).values)) {
    if (typeof held !== "string") continue
    const value = Number(held)
    if (held.trim() !== "" && Number.isFinite(value)) stated.set(key, value)
  }
  return stated
}

export function readBodyweight(): number {
  return number(only(PROFILE), PROFILE, "bodyweight")
}

export function writeBodyweight(bodyweight: number): string {
  const written = patchPage(resolveRoots(), PROFILE, PROFILE, { bodyweight })
  if (written === null) throw new Error(`\`${PROFILE}\` names no page type whose pages are files`)
  if (written.commitError !== null) throw new Error(written.commitError)
  return written.relPath
}
