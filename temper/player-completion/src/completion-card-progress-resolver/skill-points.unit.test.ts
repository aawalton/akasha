import { describe, expect, it } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import { resolveTaskProgress } from "../completion-card-progress-resolver"

describe("resolveTaskProgress / skill-points (generic checker-derived fallback)", () => {
  it("returns x/y for the Folium Discognitum leaf via the generic fallback", () => {
    const charCompletion: CharacterCompletion = {
      skillPoints: {
        total: 0,
        unassigned: 0,
        level: 0,
        mainQuests: 0,
        tutorial: 0,
        foliumDiscognitum: 2,
        pvpRank: 0,
        maelstromArena: 0,
        endlessArchive: 0,
        skyshardPoints: 0,
        totalSkyshards: 0,
        zoneQuestTotal: 0,
        groupDungeonTotal: 0,
        publicDungeonTotal: 0,
        skyshards: {},
        zoneQuests: {},
        groupDungeons: {},
        publicDungeons: {},
      },
    }
    const out = resolveTaskProgress(
      "skill-points",
      ["general", "foliumDiscognitum"],
      charCompletion,
      null
    )
    expect(out).toEqual({ current: 2, total: 2 })
  })

  it("returns the static total with current 0 when charCompletion is null", () => {
    const out = resolveTaskProgress("skill-points", ["general", "foliumDiscognitum"], null, null)
    expect(out).toEqual({ current: 0, total: 2 })
  })
})
