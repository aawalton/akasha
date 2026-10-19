import { createHash } from "node:crypto"
import { slugOf } from "akasha/page/naming/folding/modules/slug-of/slug-of.module.code.ts"
import {
  characterLinesLanded,
  type LinesLanded,
  type LinesLandingDeps,
} from "akasha/temper/player/character/temper-account-character/modules/character-lines-landing/character-lines-landing.module.code.ts"
import {
  jsonlBodyOf,
  jsonlLinesOf,
  textIn,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

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

export function readingsWith(
  body: string | null,
  readings: readonly BuildReading[]
): string | null {
  const held = jsonlLinesOf(body)
  const results = new Set(held.map((line) => textIn(line, RESULT)))
  const fresh: string[] = []
  for (const one of readings) {
    const result = resultOf(one)
    if (results.has(result)) continue
    results.add(result)
    fresh.push(lineOf(one, result))
  }
  if (fresh.length === 0) return null
  return jsonlBodyOf([...held, ...fresh])
}

function readingsBySlug(
  readings: readonly BuildReading[]
): ReadonlyMap<string, readonly BuildReading[]> {
  const bySlug = new Map<string, BuildReading[]>()
  for (const one of readings) {
    const slug = slugOf(one.character)
    const held = bySlug.get(slug)
    if (held === undefined) bySlug.set(slug, [one])
    else held.push(one)
  }
  return bySlug
}

const READINGS_KIND = {
  property: "readings",
  what: "reading",
  left: "its readings stay unlanded",
  linesWith: readingsWith,
}

export function landReadings(
  readings: readonly BuildReading[],
  deps: LinesLandingDeps = {}
): Promise<LinesLanded> {
  return characterLinesLanded(readingsBySlug(readings), READINGS_KIND, deps)
}
