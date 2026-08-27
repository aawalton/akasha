import { describe, expect, test } from "bun:test"
import type { SkillLineProgress, SkillMorphData } from "@temper/game-completion/completion-types"
import { mergeSkillLineProgress } from "./skill-lines-merge"

function line(currentRank: number, currentXP: number, nextRankXP: number): SkillLineProgress {
  return { currentRank, currentXP, nextRankXP }
}

function morph(baseRank: number, currentMorph: number): SkillMorphData {
  return {
    base: { name: "Force Shock", rank: baseRank },
    morph1: { name: "Crushing Shock", rank: undefined },
    morph2: { name: "Force Pulse", rank: undefined },
    currentMorph,
    abilityIndex: 3,
    atMorph: true,
  }
}

function fullScan(lineCount: number): Record<number, SkillLineProgress> {
  const lines: Record<number, SkillLineProgress> = {}
  for (let id = 1; id <= lineCount; id++) {
    lines[id] = line(10, 500, 1000)
  }
  return lines
}

describe("mergeSkillLineProgress", () => {
  test("an absent stored record takes the fresh scan whole", () => {
    const fresh = fullScan(40)
    expect(mergeSkillLineProgress(undefined, fresh)).toEqual(fresh)
  })

  test("a skill line only the fresh scan has is added", () => {
    const merged = mergeSkillLineProgress(fullScan(1), fullScan(40))
    expect(Object.keys(merged).length).toBe(40)
    expect(merged[40]?.currentRank).toBe(10)
  })

  test("an empty fresh scan never empties a populated stored record", () => {
    const merged = mergeSkillLineProgress(fullScan(40), {})
    expect(Object.keys(merged).length).toBe(40)
    expect(merged[40]?.currentRank).toBe(10)
  })

  test("skill lines only the stored record has are kept", () => {
    const merged = mergeSkillLineProgress(fullScan(40), fullScan(3))
    expect(Object.keys(merged).length).toBe(40)
    expect(merged[40]?.currentRank).toBe(10)
  })

  test("a rank the fresh scan advanced lands with its own XP pair", () => {
    const merged = mergeSkillLineProgress({ 1: line(10, 500, 1000) }, { 1: line(11, 20, 1200) })
    expect(merged[1]?.currentRank).toBe(11)
    expect(merged[1]?.currentXP).toBe(20)
    expect(merged[1]?.nextRankXP).toBe(1200)
  })

  test("a cold scan reporting a lower rank never de-levels a stored skill line", () => {
    const merged = mergeSkillLineProgress({ 1: line(50, 900, 1000) }, { 1: line(0, 0, 0) })
    expect(merged[1]?.currentRank).toBe(50)
    expect(merged[1]?.currentXP).toBe(900)
    expect(merged[1]?.nextRankXP).toBe(1000)
  })

  test("the XP pair is never split across the two scans", () => {
    const merged = mergeSkillLineProgress({ 1: line(50, 900, 1000) }, { 1: line(3, 40, 60) })
    expect(merged[1]?.currentXP).toBe(900)
    expect(merged[1]?.nextRankXP).toBe(1000)
  })

  test("morph data a sibling collector wrote under skills survives the merge", () => {
    const stored: Record<number, SkillLineProgress> = {
      1: {
        currentRank: 10,
        currentXP: 500,
        nextRankXP: 1000,
        skills: { 4321: morph(4, 1) },
      },
    }
    const merged = mergeSkillLineProgress(stored, { 1: line(11, 20, 1200) })
    expect(merged[1]?.currentRank).toBe(11)
    expect(merged[1]?.skills?.[4321]?.base.rank).toBe(4)
    expect(merged[1]?.skills?.[4321]?.currentMorph).toBe(1)
  })

  test("morph data survives even when a cold scan reports a lower rank", () => {
    const stored: Record<number, SkillLineProgress> = {
      1: {
        currentRank: 50,
        currentXP: 900,
        nextRankXP: 1000,
        skills: { 4321: morph(4, 2) },
      },
    }
    const merged = mergeSkillLineProgress(stored, { 1: line(0, 0, 0) })
    expect(merged[1]?.currentRank).toBe(50)
    expect(merged[1]?.skills?.[4321]?.currentMorph).toBe(2)
  })

  test("a sliver captured first heals to the full harvest on a later scan", () => {
    const sliver = { 1: line(50, 900, 1000) }
    const merged = mergeSkillLineProgress(sliver, fullScan(40))
    expect(Object.keys(merged).length).toBe(40)
    expect(merged[1]?.currentRank).toBe(50)
  })

  test("merging is idempotent — a repeat scan changes nothing", () => {
    const stored = fullScan(40)
    expect(mergeSkillLineProgress(stored, stored)).toEqual(stored)
  })
})
