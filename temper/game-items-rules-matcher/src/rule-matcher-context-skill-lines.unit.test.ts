import { describe, expect, it } from "bun:test"
import { skillLines } from "@temper/game-characters-skill-lines/skill-lines-data"
import {
  buildGetCharacterSkillLineRanks,
  compileSkillLineCurrentRanks,
} from "./rule-matcher-context-skill-lines"

const KNOWN_LINE = skillLines.list.find((l) => l.esoSkillLineId > 0)
if (KNOWN_LINE === undefined) throw new Error("test fixture: no skill line with esoSkillLineId > 0")
const KNOWN_LINE_ID = KNOWN_LINE.id
const KNOWN_LINE_ESO_ID = KNOWN_LINE.esoSkillLineId
const KNOWN_LINE_MAX_RANK = KNOWN_LINE.maxRank

describe("compileSkillLineCurrentRanks", () => {
  it("ignores characters without completion data", () => {
    const map = compileSkillLineCurrentRanks([
      { esoCharacterId: "1001", targetBuildId: undefined, sortOrder: undefined },
    ])
    expect(map.size).toBe(0)
  })

  it("captures currentRank per esoSkillLineId from the completion blob", () => {
    const map = compileSkillLineCurrentRanks([
      {
        esoCharacterId: "1001",
        targetBuildId: undefined,
        sortOrder: undefined,
        completion: {
          skillLineProgress: {
            [KNOWN_LINE_ESO_ID]: { currentRank: 7, currentXP: 10, nextRankXP: 100 },
          },
        },
      },
    ])
    expect(map.get("1001")?.get(KNOWN_LINE_ESO_ID)).toBe(7)
  })

  it("skips entries with non-numeric currentRank", () => {
    const map = compileSkillLineCurrentRanks([
      {
        esoCharacterId: "1001",
        targetBuildId: undefined,
        sortOrder: undefined,
        completion: {
          skillLineProgress: {
            [KNOWN_LINE_ESO_ID]: { currentRank: "junk", currentXP: 0, nextRankXP: 0 },
          },
        },
      },
    ])
    expect(map.size).toBe(0)
  })
})

describe("buildGetCharacterSkillLineRanks", () => {
  const innerMap = new Map<number, number>([[KNOWN_LINE_ESO_ID, 4]])
  const charMap = new Map<string, ReadonlyMap<number, number>>([["1001", innerMap]])
  const resolve = buildGetCharacterSkillLineRanks(charMap)

  it("returns currentRank from per-char map and maxRank from static data", () => {
    expect(resolve("1001", KNOWN_LINE_ID)).toEqual({
      currentRank: 4,
      maxRank: KNOWN_LINE_MAX_RANK,
    })
  })

  it("returns currentRank: 0 when char is known but the line has no progress entry", () => {
    const otherLine = skillLines.list.find(
      (l) => l.esoSkillLineId > 0 && l.esoSkillLineId !== KNOWN_LINE_ESO_ID
    )
    if (otherLine === undefined) throw new Error("test fixture: need a second known line")
    expect(resolve("1001", otherLine.id)).toEqual({
      currentRank: 0,
      maxRank: otherLine.maxRank,
    })
  })

  it("returns undefined for an unknown character", () => {
    expect(resolve("9999", KNOWN_LINE_ID)).toBeUndefined()
  })

  it("returns undefined for an unknown skill-line id", () => {
    expect(resolve("1001", "not-a-real-skill-line")).toBeUndefined()
  })

  it("returns undefined for a static line with esoSkillLineId === 0", () => {
    const stub = skillLines.list.find((l) => l.esoSkillLineId === 0)
    if (stub === undefined) return
    expect(resolve("1001", stub.id)).toBeUndefined()
  })
})
