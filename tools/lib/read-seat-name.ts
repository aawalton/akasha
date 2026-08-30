
import { FLEX, JOINER } from "./compose-seat-name.ts"
import type { Vocabulary } from "./seat-vocabulary.ts"

export const SLOTS = ["persona", "domain", "role", "flex"] as const

export type Slot = (typeof SLOTS)[number]

export interface Vocabularies {
  readonly personas: ReadonlySet<string>
  readonly domains: ReadonlySet<string>
  readonly roles: ReadonlySet<string>
}

export function vocabulariesOf(vocabulary: Vocabulary): Vocabularies {
  return {
    personas: new Set(vocabulary.persona),
    roles: new Set(vocabulary.role),
    domains: new Set(vocabulary.domain),
  }
}

export type Reading = { readonly [K in Slot]: string | null }

function admits(slot: Slot, segment: string, vocabularies: Vocabularies): boolean {
  if (slot === "persona") return vocabularies.personas.has(segment)
  if (slot === "domain") return vocabularies.domains.has(segment)
  if (slot === "role") return vocabularies.roles.has(segment)
  return FLEX.test(segment)
}

interface Span {
  readonly slot: Slot
  readonly from: number
  readonly to: number
}

const AFTER_PERSONA = SLOTS.indexOf("domain")

type Segments = readonly (readonly string[])[]

function segmentsOf(parts: readonly string[]): Segments {
  const spans: string[][] = []
  for (let from = 0; from < parts.length; from += 1) {
    const row: string[] = []
    let joined = ""
    for (let to = from + 1; to <= parts.length; to += 1) {
      joined = to === from + 1 ? (parts[from] as string) : `${joined}${JOINER}${parts[to - 1] as string}`
      row[to] = joined
    }
    spans[from] = row
  }
  return spans
}

function segment(segments: Segments, from: number, to: number): string {
  return (segments[from] as readonly string[])[to] as string
}

function divisions(
  partCount: number,
  segments: Segments,
  vocabularies: Vocabularies
): readonly (readonly Span[])[] {
  const found: (readonly Span[])[] = []
  if (admits("persona", segment(segments, 0, partCount), vocabularies)) {
    found.push([{ slot: "persona", from: 0, to: partCount }])
  }
  const taken: Span[] = []
  const walk = (at: number, slotAt: number): void => {
    if (at === partCount) {
      if (taken.length > 0) found.push([...taken])
      return
    }
    for (let which = slotAt; which < SLOTS.length; which += 1) {
      const slot = SLOTS[which] as Slot
      for (let to = at + 1; to <= partCount; to += 1) {
        if (!admits(slot, segment(segments, at, to), vocabularies)) continue
        taken.push({ slot, from: at, to })
        walk(to, which + 1)
        taken.pop()
      }
    }
  }
  walk(0, AFTER_PERSONA)
  return found
}

const BOUNDARY = "boundary"

function marksOf(parts: readonly string[], division: readonly Span[]): readonly string[] {
  const marks: string[] = []
  for (const [which, span] of division.entries()) {
    if (which > 0) marks.push(BOUNDARY)
    for (let part = span.from; part < span.to; part += 1) {
      if (part > span.from) marks.push(span.slot)
      for (let at = 0; at < (parts[part] as string).length; at += 1) marks.push(span.slot)
    }
  }
  return marks
}

function within(mine: string, other: string): boolean {
  return mine === other || (other === "domain" && mine !== BOUNDARY)
}

function narrower(mine: readonly string[], other: readonly string[]): boolean {
  return mine.length === other.length && mine.every((mark, at) => within(mark, other[at] as string))
}

function readingOf(segments: Segments, division: readonly Span[]): Reading {
  const filled: Record<string, string | null> = {}
  for (const slot of SLOTS) filled[slot] = null
  for (const span of division) filled[span.slot] = segment(segments, span.from, span.to)
  return filled as Reading
}

function spell(segments: Segments, division: readonly Span[]): string {
  return division.map((span) => `${span.slot}=${segment(segments, span.from, span.to)}`).join(" ")
}

function admittedAnywhere(candidate: string, vocabularies: Vocabularies): boolean {
  return SLOTS.some((slot) => admits(slot, candidate, vocabularies))
}

export function unplaceableSegments(name: string, vocabularies: Vocabularies): readonly string[] {
  const parts = name.split(JOINER)
  const segments = segmentsOf(parts)
  const placeable = (at: number): boolean => {
    for (let from = 0; from <= at; from += 1) {
      for (let to = at + 1; to <= parts.length; to += 1) {
        if (admittedAnywhere(segment(segments, from, to), vocabularies)) return true
      }
    }
    return false
  }
  return parts.filter((_, at) => !placeable(at))
}

export function readSeatName(
  name: string,
  vocabularies: Vocabularies
): { readonly reading: Reading } | { readonly unreadable: readonly string[] } {
  const parts = name.split(JOINER)
  const segments = segmentsOf(parts)
  const found = divisions(parts.length, segments, vocabularies)
  if (found.length === 0) return { unreadable: [] }
  if (found.length === 1) return { reading: readingOf(segments, found[0] as readonly Span[]) }
  const marks = found.map((division) => marksOf(parts, division))
  const narrowest = found.filter((_, at) => marks.every((other) => narrower(marks[at] as string[], other)))
  if (narrowest.length === 0) return { unreadable: found.map((division) => spell(segments, division)) }
  return { reading: readingOf(segments, narrowest[0] as readonly Span[]) }
}
