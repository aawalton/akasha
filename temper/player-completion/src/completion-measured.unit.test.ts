import { describe, expect, test } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import { isAccountMeasured, isCharacterMeasured, isCompanionMeasured } from "./completion-measured"

const ROSTER_STUB: CharacterCompletion = {
  gender: 1,
  level: 27,
  classId: 3,
  allianceId: 2,
  raceId: 5,
  className: "Sorcerer",
  classIcon: "/esoui/art/class/sorcerer.dds",
}

describe("isCharacterMeasured", () => {
  test("a roster stub alone is NOT measured", () => {
    expect(isCharacterMeasured(ROSTER_STUB)).toBe(false)
  })

  test("null / undefined / empty are NOT measured", () => {
    expect(isCharacterMeasured(null)).toBe(false)
    expect(isCharacterMeasured(undefined)).toBe(false)
    expect(isCharacterMeasured({})).toBe(false)
  })

  test("any deferred-collector key makes it measured", () => {
    expect(isCharacterMeasured({ ...ROSTER_STUB, traitResearch: {} })).toBe(true)
    expect(isCharacterMeasured({ ...ROSTER_STUB, quests: [] })).toBe(true)
    expect(isCharacterMeasured({ ...ROSTER_STUB, achievements: {} })).toBe(true)
    expect(isCharacterMeasured({ ...ROSTER_STUB, motifKnowledge: {} })).toBe(true)
  })

  test("an EMPTY deferred-collector value still counts as measured", () => {
    expect(isCharacterMeasured({ traitResearch: {} })).toBe(true)
    expect(isCharacterMeasured({ quests: [] })).toBe(true)
    expect(isCharacterMeasured({ bagSize: 0 })).toBe(true)
    expect(isCharacterMeasured({ allianceRank: 0 })).toBe(true)
  })

  test("the synchronous login-only fields count as measured", () => {
    expect(isCharacterMeasured({ ...ROSTER_STUB, curseState: "none" })).toBe(true)
  })

  test("a partial roster stub is still NOT measured", () => {
    expect(isCharacterMeasured({ level: 3 })).toBe(false)
    expect(isCharacterMeasured({ className: "Nightblade", classIcon: "x" })).toBe(false)
  })
})

describe("isAccountMeasured", () => {
  test("null / undefined / empty are NOT measured", () => {
    expect(isAccountMeasured(null)).toBe(false)
    expect(isAccountMeasured(undefined)).toBe(false)
    expect(isAccountMeasured({})).toBe(false)
  })

  test("any account key makes it measured, including an empty one", () => {
    expect(isAccountMeasured({ achievements: {} })).toBe(true)
    expect(isAccountMeasured({ championPointsEarned: 0 })).toBe(true)
  })
})

describe("isCompanionMeasured", () => {
  test("null / undefined / empty are NOT measured", () => {
    expect(isCompanionMeasured(null)).toBe(false)
    expect(isCompanionMeasured(undefined)).toBe(false)
    expect(isCompanionMeasured({})).toBe(false)
  })

  test("any captured field makes it measured, including a zero", () => {
    expect(isCompanionMeasured({ level: 0 })).toBe(true)
    expect(isCompanionMeasured({ rapport: 0 })).toBe(true)
    expect(isCompanionMeasured({ skillLineProgress: {} })).toBe(true)
  })
})
