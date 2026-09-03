import { AKASHA, resolveRoots } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"

const NONE = "none"

const PAGE_TYPE = "seat-conditions"

/**
 * The keys the seat conditions page carries, in the camelCase the akasha page states them under.
 *
 * The old markdown store filed these in kebab and this reader asked in kebab to match. akasha
 * derives a page's keys from the property slug mechanically, so `auto-compact-window` is
 * `autoCompactWindow` here, and a kebab key handed to `asking` is refused rather than read as
 * nothing. Every multi-word key on this page changed spelling; `model` did not, for being one word.
 */
const KEYS = [
  "model",
  "subagentModel",
  "fallbackModel",
  "autoCompactWindow",
  "effortLevel",
  "subagentSpawnDepth",
  "toolTimeout",
  "resumeThresholdMinutes",
  "resumeTokenThreshold",
  "extendedContextAvailable",
] as const

type Held = Readonly<Record<string, unknown>>

export interface SeatConditions {
  readonly model: string | null
  readonly subagentModel: string | null
  readonly fallbackModel: string | null
  readonly autoCompactWindow: string | null
  readonly effortLevel: string | null
  readonly subagentSpawnDepth: string | null
  readonly toolTimeout: string | null
  readonly resumeThresholdMinutes: string | null
  readonly resumeTokenThreshold: string | null
  readonly extendedContextAvailable: boolean
}

/**
 * A condition a seat runs under, as text, or nothing where the page leaves it open.
 *
 * The markdown store kept every value as text and akasha keeps a number as a number, so the five
 * timing and depth conditions arrive as numbers here where they arrived as strings before. They are
 * written back to text so that what this hands a caller does not change with the store underneath
 * it. `none` reads as unstated, which is how the page says a condition is left to whatever asks.
 */
function stated(values: Held, key: string): string | null {
  const held = values[key]
  if (typeof held === "number") return String(held)
  if (typeof held !== "string") return null
  const text = held.trim()
  if (text === "" || text === NONE) return null
  return text
}

/**
 * A flag a seat runs under.
 *
 * akasha states a boolean as a boolean where the markdown store stated it as the text `true`, so
 * both are read. Absent reads as false, the page stating every condition rather than this deciding
 * it.
 */
function flagged(values: Held, key: string): boolean {
  const held = values[key]
  return held === true || held === "true"
}

function checkoutRoot(): string {
  const roots = resolveRoots() as unknown as Readonly<Record<string, string>>
  const root = roots[AKASHA]
  if (root === undefined || root === "") {
    throw new Error("no akasha checkout stands here, so nothing states what a seat runs under")
  }
  return root
}

export function readSeatConditions(): SeatConditions {
  const asked = asking(checkoutRoot(), { pageTypeSlug: PAGE_TYPE, keys: [...KEYS] } as never) as {
    readonly refused?: string
    readonly rows?: readonly Held[]
  }
  if (asked.refused !== undefined) {
    throw new Error(`\`${PAGE_TYPE}\` could not be read — ${asked.refused}`)
  }
  const rows = asked.rows ?? []
  const [row, second] = rows
  if (row === undefined) {
    throw new Error(`no \`${PAGE_TYPE}\` page stands, so nothing states what a seat runs under`)
  }
  if (second !== undefined) {
    throw new Error(
      `${rows.length} \`${PAGE_TYPE}\` pages stand where one carries them, so none of them holds`
    )
  }
  return {
    model: stated(row, "model"),
    subagentModel: stated(row, "subagentModel"),
    fallbackModel: stated(row, "fallbackModel"),
    autoCompactWindow: stated(row, "autoCompactWindow"),
    effortLevel: stated(row, "effortLevel"),
    subagentSpawnDepth: stated(row, "subagentSpawnDepth"),
    toolTimeout: stated(row, "toolTimeout"),
    resumeThresholdMinutes: stated(row, "resumeThresholdMinutes"),
    resumeTokenThreshold: stated(row, "resumeTokenThreshold"),
    extendedContextAvailable: flagged(row, "extendedContextAvailable"),
  }
}
