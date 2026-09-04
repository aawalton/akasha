import { describe, expect, test } from "bun:test"
import type { CharacterCompletion } from "@akasha/temper-completion/completion-progress"
import {
  isAccountMeasured,
  isCharacterMeasured,
  isCompanionMeasured,
} from "./completion-measured.module.code.ts"

const ROSTER_ONLY: CharacterCompletion = {
  gender: 1,
  level: 27,
  classId: 3,
  allianceId: 2,
  raceId: 5,
  className: "Sorcerer",
  classIcon: "/esoui/art/class/sorcerer.dds",
}

describe("isCharacterMeasured", () => {
  test("a character carrying only roster fields has not been read", () => {
    expect(isCharacterMeasured(ROSTER_ONLY)).toBe(false)
  })

  test("nothing, no character and an empty character have not been read", () => {
    expect(isCharacterMeasured(null)).toBe(false)
    expect(isCharacterMeasured(undefined)).toBe(false)
    expect(isCharacterMeasured({})).toBe(false)
  })

  test("any field a later collector fills makes the character read", () => {
    expect(isCharacterMeasured({ ...ROSTER_ONLY, traitResearch: {} })).toBe(true)
    expect(isCharacterMeasured({ ...ROSTER_ONLY, quests: [] })).toBe(true)
    expect(isCharacterMeasured({ ...ROSTER_ONLY, achievements: {} })).toBe(true)
    expect(isCharacterMeasured({ ...ROSTER_ONLY, motifKnowledge: {} })).toBe(true)
  })

  test("an empty value under such a field still makes the character read", () => {
    expect(isCharacterMeasured({ traitResearch: {} })).toBe(true)
    expect(isCharacterMeasured({ quests: [] })).toBe(true)
    expect(isCharacterMeasured({ bagSize: 0 })).toBe(true)
    expect(isCharacterMeasured({ allianceRank: 0 })).toBe(true)
  })

  test("a field only login fills makes the character read", () => {
    expect(isCharacterMeasured({ ...ROSTER_ONLY, curseState: "none" })).toBe(true)
  })

  test("part of the roster fields is still no reading", () => {
    expect(isCharacterMeasured({ level: 3 })).toBe(false)
    expect(isCharacterMeasured({ className: "Nightblade", classIcon: "x" })).toBe(false)
  })
})

describe("isAccountMeasured", () => {
  test("nothing, no account and an empty account have not been read", () => {
    expect(isAccountMeasured(null)).toBe(false)
    expect(isAccountMeasured(undefined)).toBe(false)
    expect(isAccountMeasured({})).toBe(false)
  })

  test("any account field makes the account read, even an empty one", () => {
    expect(isAccountMeasured({ achievements: {} })).toBe(true)
    expect(isAccountMeasured({ championPointsEarned: 0 })).toBe(true)
  })
})

describe("isCompanionMeasured", () => {
  test("nothing, no companion and an empty companion have not been read", () => {
    expect(isCompanionMeasured(null)).toBe(false)
    expect(isCompanionMeasured(undefined)).toBe(false)
    expect(isCompanionMeasured({})).toBe(false)
  })

  test("any captured field makes the companion read, even a zero", () => {
    expect(isCompanionMeasured({ level: 0 })).toBe(true)
    expect(isCompanionMeasured({ rapport: 0 })).toBe(true)
    expect(isCompanionMeasured({ skillLineProgress: {} })).toBe(true)
  })
})
