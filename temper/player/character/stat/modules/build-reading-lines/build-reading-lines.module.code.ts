import { createHash } from "node:crypto"
import {
  bySlugOf,
  characterLinesLanded,
  type LinesLanded,
  type LinesLandingDeps,
} from "akasha/temper/player/character/temper-account-character/modules/character-lines-landing/character-lines-landing.module.code.ts"
import {
  jsonlBodyOf,
  jsonlLinesOf,
  textIn,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import { z } from "zod"

export type BuildReading = {
  readonly character: string
  readonly buildHash: string
  readonly bar: string
  readonly reading: Readonly<Record<string, unknown>>
}

const RESULT = "result"

const CAPTURED_AT = "capturedAt"

function canonicalOf(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalOf)
  if (value === null || typeof value !== "object") return value
  const sorted: Record<string, unknown> = {}
  for (const key of Object.keys(value).sort()) {
    sorted[key] = canonicalOf((value as Record<string, unknown>)[key])
  }
  return sorted
}

export function resultOf(one: BuildReading): string {
  const result = Object.fromEntries(
    Object.entries(one.reading).filter(([key]) => key !== CAPTURED_AT)
  )
  const said = JSON.stringify(canonicalOf({ buildHash: one.buildHash, bar: one.bar, result }))
  return createHash("sha256").update(said).digest("hex")
}

function lineOf(one: BuildReading, result: string): string {
  return JSON.stringify({ [RESULT]: result, ...one })
}

const REMOVED_READINGS = "removed-readings"

export function captureKeyOf(bar: string, capturedAt: unknown): string {
  return `${bar}:${String(capturedAt)}`
}

const keyedLine = z.looseObject({
  bar: z.string(),
  capturedAt: z.number().optional(),
  reading: z.looseObject({ capturedAt: z.number().optional() }).optional(),
})

function heldKeyOf(line: string): string | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(line)
  } catch {
    return null
  }
  const keyed = keyedLine.safeParse(parsed)
  if (!keyed.success) return null
  const capturedAt = keyed.data.capturedAt ?? keyed.data.reading?.capturedAt
  return capturedAt === undefined ? null : captureKeyOf(keyed.data.bar, capturedAt)
}

export const KEPT_PER_BUILD = 20

const BUILD_HASH = "buildHash"

function latestPerBuild(lines: readonly string[]): readonly string[] {
  const counted = new Map<string, number>()
  const kept: string[] = []
  for (let at = lines.length - 1; at >= 0; at -= 1) {
    const line = lines[at] ?? ""
    const build = textIn(line, BUILD_HASH)
    if (build !== "") {
      const held = counted.get(build) ?? 0
      if (held >= KEPT_PER_BUILD) continue
      counted.set(build, held + 1)
    }
    kept.push(line)
  }
  return kept.reverse()
}

export function readingsWith(
  body: string | null,
  readings: readonly BuildReading[],
  removed: string | null = null
): string | null {
  const held = jsonlLinesOf(body)
  const results = new Set(held.map((line) => textIn(line, RESULT)))
  const captures = new Set(
    [...held, ...jsonlLinesOf(removed)].map(heldKeyOf).filter((key) => key !== null)
  )
  const fresh: string[] = []
  for (const one of readings) {
    const result = resultOf(one)
    const capture = captureKeyOf(one.bar, one.reading[CAPTURED_AT])
    if (results.has(result) || captures.has(capture)) continue
    results.add(result)
    captures.add(capture)
    fresh.push(lineOf(one, result))
  }
  if (fresh.length === 0) return null
  return jsonlBodyOf(latestPerBuild([...held, ...fresh]))
}

function readingsBySlug(
  readings: readonly BuildReading[]
): ReadonlyMap<string, readonly BuildReading[]> {
  return bySlugOf(readings, (one) => one.character)
}

const READINGS_KIND = {
  property: "readings",
  what: "reading",
  left: "its readings stay unlanded",
  linesWith: readingsWith,
  beside: REMOVED_READINGS,
}

export function landReadings(
  readings: readonly BuildReading[],
  deps: LinesLandingDeps = {}
): Promise<LinesLanded> {
  return characterLinesLanded(readingsBySlug(readings), READINGS_KIND, deps)
}
