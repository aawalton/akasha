import { readFileSync } from "node:fs"
import { exclusively } from "@akasha/file-system/exclusive"
import { parseFrontmatter, textField } from "@akasha/markdown-pages/frontmatter"
import {
  readUncommitted,
  uncommittedPathFor,
  writeUncommitted,
} from "@akasha/markdown-pages/uncommitted"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { PENDING, STEP, STEP_TERMINAL } from "@akasha/pipeline-sweep/pipeline-page-statuses"
import { patchPage } from "../page-write.ts"
import type { Value } from "../page-write-values.ts"
import { whereFor } from "../page-write-where.ts"

export type Held = Value | null

export interface Effect {
  readonly pageType: string
  readonly seq: string
  readonly was: string
  readonly to: string
  readonly guard: string
  readonly set?: Readonly<Record<string, Held>>
}

export function transition(
  pageType: string,
  seq: string,
  was: string,
  to: string,
  guard: string,
  set?: Readonly<Record<string, Held>>
): Effect {
  return { pageType, seq, was, to, guard, ...(set === undefined ? {} : { set }) }
}

export function describe(effect: Effect): string {
  return `${effect.pageType}=${effect.seq} ${effect.was}->${effect.to} guard=${effect.guard}`
}

function statusStatedIn(path: string): string | null {
  let text: string
  try {
    text = readFileSync(path, "utf8")
  } catch {
    return null
  }
  return textField(parseFrontmatter(text), "status")
}

function takeState(roots: Roots, effect: Effect): boolean {
  const at = whereFor(roots, STEP, effect.seq)
  if (at === null) return false
  return exclusively(uncommittedPathFor(at.path), () => {
    const standing = readUncommitted(at.path) ?? {}
    const stands = typeof standing.status === "string" ? standing.status : PENDING
    if (stands !== effect.was) return false
    const finished = STEP_TERMINAL.has(effect.to)
      ? { "completed-at": new Date().toISOString() }
      : {}
    writeUncommitted(at.path, {
      ...standing,
      ...finished,
      ...(effect.set ?? {}),
      status: effect.to,
    })
    return true
  })
}

function takePage(roots: Roots, effect: Effect): boolean {
  const at = whereFor(roots, effect.pageType, effect.seq)
  if (at === null) return false
  if (statusStatedIn(at.path) !== effect.was) return false
  const set: Record<string, Value> = { status: effect.to }
  const clear: string[] = []
  for (const [key, value] of Object.entries(effect.set ?? {})) {
    if (value === null) clear.push(key)
    else set[key] = value
  }
  return patchPage(roots, effect.pageType, effect.seq, set, undefined, clear) !== null
}

export function applyEffect(roots: Roots, effect: Effect): boolean {
  return effect.pageType === STEP ? takeState(roots, effect) : takePage(roots, effect)
}
