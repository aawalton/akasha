import { describe, expect, test } from "bun:test"
import { skillLines } from "akasha/temper/character-skill-line/modules/skill-lines/skill-lines.module.code.ts"
import {
  buildGetCharacterSkillLineRanks,
  compileSkillLineCurrentRanks,
} from "akasha/temper/items/rules/matcher/modules/rule-matcher-context-skill-lines/rule-matcher-context-skill-lines.module.code.ts"

const OPENED = "weapon-two-handed"

const UNOPENED = "weapon-one-hand-and-shield"

const UNNAMED = "no-skill-line"

const OPENED_ESO = skillLines.data[OPENED].esoSkillLineId

const CHARACTER = "1001"

const STRANGER = "9999"

function compiledFrom(completion: unknown): ReadonlyMap<string, ReadonlyMap<number, number>> {
  return compileSkillLineCurrentRanks([
    { esoCharacterId: CHARACTER, targetBuildId: undefined, sortOrder: undefined, completion },
  ])
}

function progressOf(currentRank: unknown): unknown {
  return { skillLineProgress: { [OPENED_ESO]: { currentRank, currentXP: 10, nextRankXP: 100 } } }
}

const reading = buildGetCharacterSkillLineRanks(new Map([[CHARACTER, new Map([[OPENED_ESO, 4]])]]))

describe("A character the game gave no progress for is kept out.", () => {
  test("a character with no completion at all holds nothing", () => {
    expect(compiledFrom(undefined).size).toBe(0)
  })
})

describe("Only a rank the game gave as a number is kept.", () => {
  test("a numeric rank is kept under the line's game id", () => {
    expect(compiledFrom(progressOf(7)).get(CHARACTER)?.get(OPENED_ESO)).toBe(7)
  })

  test("a rank that is no number leaves the character holding nothing", () => {
    expect(compiledFrom(progressOf("junk")).size).toBe(0)
  })
})

describe("A line the character has opened but not advanced answers rank zero.", () => {
  test("the rank compiled for a line comes back beside that line's top rank", () => {
    expect(reading(CHARACTER, OPENED)).toEqual({
      currentRank: 4,
      maxRank: skillLines.data[OPENED].maxRank,
    })
  })

  test("a line the character holds nothing for answers zero", () => {
    expect(reading(CHARACTER, UNOPENED)).toEqual({
      currentRank: 0,
      maxRank: skillLines.data[UNOPENED].maxRank,
    })
  })
})

describe("A skill line the character has not opened answers as nothing.", () => {
  test("a character nothing was compiled for answers as nothing", () => {
    expect(reading(STRANGER, OPENED)).toBeUndefined()
  })

  test("a line no static data names answers as nothing", () => {
    expect(reading(CHARACTER, "not-a-real-skill-line")).toBeUndefined()
  })

  test("a line the game gives no id answers as nothing", () => {
    expect(reading(CHARACTER, UNNAMED)).toBeUndefined()
  })
})
