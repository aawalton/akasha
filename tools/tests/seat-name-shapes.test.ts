import { describe, expect, test } from "bun:test"
import { help as startHelp } from "../commands/seat/start.ts"
import { help as stopHelp } from "../commands/seat/stop.ts"
import { type AdmissionVocabularies, admitSeatName } from "../lib/admit-seat-name.ts"
import { SEAT_NAME_FAMILIES } from "../lib/seat-name-families.ts"

const RETIRED = ["amy-calendar", "awen-gm--the-tower", "nimue-lora-drift", "aria-ablation-a"]

const NAMEABLE_ROLES = [
  "lead",
  "manage",
  "deliver",
  "handler",
  "intake",
  "awen-gm",
  "worker",
  "developer",
  "reviewer",
  "manager",
]

const PERSONAS = ["amy", "nimue", "aria", "athena", "ki"]

const vocabularies: AdmissionVocabularies = {
  personas: new Set(PERSONAS),
  persons: new Set<string>(),
  domains: new Set(["ki", "identity", ...PERSONAS, ...NAMEABLE_ROLES]),
  roles: new Set(NAMEABLE_ROLES),
  rolesLongestFirst: [...NAMEABLE_ROLES].sort((a, b) => b.length - a.length),
}

function candidateNames(text: string): readonly string[] {
  return text.match(/[a-z0-9]+(?:-[a-z0-9]+)+/g) ?? []
}

function namesPrescribedBy(example: string): readonly string[] {
  const named = example.match(/^ops seat stop ([a-z][a-z0-9-]*)/)?.[1]
  return named === undefined ? [] : [named]
}

describe("the families a seat name may be admitted under", () => {
  test("are the three a name composes from, no shape naming a seat for a subject", () => {
    expect(SEAT_NAME_FAMILIES.map((one) => one.family)).toEqual([
      "person",
      "bare-persona",
      "composed-identity",
    ])
  })

  test.each(RETIRED)("%s is admitted by none of them", (name) => {
    expect(admitSeatName(name, vocabularies).admitted).toBe(false)
  })

  test("no help surface prescribes one of those, whatever else its examples name", () => {
    const named = [...(startHelp.examples ?? []), ...(stopHelp.examples ?? [])].flatMap(
      candidateNames
    )
    expect(named.filter((name) => RETIRED.includes(name))).toEqual([])
  })
})

describe("no help surface prescribes a handle the name boundary would refuse", () => {
  test.each([
    ["start", startHelp],
    ["stop", stopHelp],
  ])("%s's examples all name declared shapes", (_command, surface) => {
    for (const example of surface.examples ?? []) {
      for (const name of namesPrescribedBy(example)) {
        expect(admitSeatName(name, vocabularies).admitted).toBe(true)
      }
    }
  })

  test("the examples do name handles, so the assertion above is not vacuous", () => {
    const named = [...(startHelp.examples ?? []), ...(stopHelp.examples ?? [])].flatMap(
      namesPrescribedBy
    )
    expect(named.length).toBeGreaterThan(0)
  })
})
