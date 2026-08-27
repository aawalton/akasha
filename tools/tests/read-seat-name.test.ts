
import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { SLOTS, type Vocabularies, readSeatName } from "../lib/read-seat-name.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"

const roots = resolveRoots()

interface FixtureVocabulary {
  readonly personas: readonly string[]
  readonly roles: readonly string[]
  readonly domains: readonly string[]
  readonly tasks: readonly string[]
}

interface NameCase {
  readonly name: string
  readonly vocabulary: string
  readonly why: string
  readonly reads?: Readonly<Record<string, string | null>>
  readonly unreadable?: number
}

interface SeatNameFixture {
  readonly vocabularies: Readonly<Record<string, FixtureVocabulary>>
  readonly cases: readonly NameCase[]
}

const fixture: SeatNameFixture = JSON.parse(
  readFileSync(`${rootFor(roots, AKASHA)}/tools/lib/seat-name-fixture.json`, "utf8")
)

function vocabularyNamed(which: string): Vocabularies {
  const declared = fixture.vocabularies[which]
  if (declared === undefined) {
    throw new Error(`the fixture names the vocabulary \`${which}\` and does not declare it`)
  }
  return {
    personas: new Set(declared.personas),
    roles: new Set(declared.roles),
    domains: new Set(declared.domains),
    tasks: new Set(declared.tasks),
  }
}

describe("the shared fixture — the same cases the code repository's port runs", () => {
  test("the fixture carries cases of both kinds, so neither arm of the rule goes unexercised", () => {
    expect(fixture.cases.filter((one) => one.reads !== undefined).length).toBeGreaterThan(0)
    expect(fixture.cases.filter((one) => one.unreadable !== undefined).length).toBeGreaterThan(0)
    for (const one of fixture.cases) {
      expect((one.reads === undefined) !== (one.unreadable === undefined)).toBe(true)
    }
  })

  for (const one of fixture.cases) {
    test(`${one.name} — ${one.why}`, () => {
      const read = readSeatName(one.name, vocabularyNamed(one.vocabulary))
      if (one.unreadable !== undefined) {
        expect("unreadable" in read ? read.unreadable.length : "read as a seat").toBe(one.unreadable)
        return
      }
      expect("reading" in read).toBe(true)
      if (!("reading" in read) || one.reads === undefined) return
      for (const slot of SLOTS) expect(read.reading[slot]).toBe(one.reads[slot] ?? null)
    })
  }
})
