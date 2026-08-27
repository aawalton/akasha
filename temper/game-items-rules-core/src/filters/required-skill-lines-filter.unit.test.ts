import { describe, expect, it } from "bun:test"
import {
  characterPassesRequiredSkillLines,
  requiredSkillLinesFilter,
} from "./required-skill-lines-filter"

function makeResolver(
  data: Record<string, Record<string, { currentRank: number; maxRank: number } | undefined>>
) {
  return (charId: string, skillLineId: string) => data[charId]?.[skillLineId]
}

describe("characterPassesRequiredSkillLines — all-maxed", () => {
  const resolve = makeResolver({
    alice: {
      "world-legerdemain": { currentRank: 10, maxRank: 10 },
      "guild-thieves-guild": { currentRank: 12, maxRank: 12 },
    },
    bob: {
      "world-legerdemain": { currentRank: 10, maxRank: 10 },
      "guild-thieves-guild": { currentRank: 5, maxRank: 12 },
    },
  })

  it("passes when every listed line is at maxRank for the candidate", () => {
    expect(
      characterPassesRequiredSkillLines(
        "alice",
        { skillLineIds: ["world-legerdemain", "guild-thieves-guild"], mode: "all-maxed" },
        resolve
      )
    ).toBe(true)
  })

  it("fails when at least one listed line is below maxRank", () => {
    expect(
      characterPassesRequiredSkillLines(
        "bob",
        { skillLineIds: ["world-legerdemain", "guild-thieves-guild"], mode: "all-maxed" },
        resolve
      )
    ).toBe(false)
  })

  it("fails fail-closed when a listed line resolves to undefined", () => {
    expect(
      characterPassesRequiredSkillLines(
        "alice",
        { skillLineIds: ["not-a-line"], mode: "all-maxed" },
        resolve
      )
    ).toBe(false)
  })

  it("passes vacuously when skillLineIds is empty", () => {
    expect(
      characterPassesRequiredSkillLines("alice", { skillLineIds: [], mode: "all-maxed" }, resolve)
    ).toBe(true)
  })
})

describe("characterPassesRequiredSkillLines — any-not-maxed", () => {
  const resolve = makeResolver({
    alice: {
      "world-legerdemain": { currentRank: 10, maxRank: 10 },
      "guild-thieves-guild": { currentRank: 5, maxRank: 12 },
    },
    bob: {
      "world-legerdemain": { currentRank: 10, maxRank: 10 },
    },
  })

  it("passes when at least one listed line is below maxRank", () => {
    expect(
      characterPassesRequiredSkillLines(
        "alice",
        { skillLineIds: ["world-legerdemain", "guild-thieves-guild"], mode: "any-not-maxed" },
        resolve
      )
    ).toBe(true)
  })

  it("fails when every listed line is at maxRank or unresolvable", () => {
    expect(
      characterPassesRequiredSkillLines(
        "bob",
        { skillLineIds: ["world-legerdemain"], mode: "any-not-maxed" },
        resolve
      )
    ).toBe(false)
  })

  it("skips unresolved lines without short-circuiting (other lines still evaluated)", () => {
    expect(
      characterPassesRequiredSkillLines(
        "alice",
        { skillLineIds: ["not-a-line", "guild-thieves-guild"], mode: "any-not-maxed" },
        resolve
      )
    ).toBe(true)
  })

  it("passes vacuously when skillLineIds is empty", () => {
    expect(
      characterPassesRequiredSkillLines(
        "alice",
        { skillLineIds: [], mode: "any-not-maxed" },
        resolve
      )
    ).toBe(true)
  })
})

describe("requiredSkillLinesFilter (rule-level)", () => {
  it("isPresent when at least one skillLineId is set", () => {
    expect(
      requiredSkillLinesFilter.isPresent({
        requiredSkillLines: { skillLineIds: ["world-legerdemain"], mode: "all-maxed" },
      })
    ).toBe(true)
    expect(
      requiredSkillLinesFilter.isPresent({
        requiredSkillLines: { skillLineIds: [], mode: "all-maxed" },
      })
    ).toBe(false)
    expect(requiredSkillLinesFilter.isPresent(undefined)).toBe(false)
  })

  it("fingerprint sorts ids and includes mode for stable comparison", () => {
    const fp = requiredSkillLinesFilter.fingerprint({
      requiredSkillLines: {
        skillLineIds: ["guild-thieves-guild", "world-legerdemain"],
        mode: "all-maxed",
      },
    })
    expect(fp).toBe("all-maxed:guild-thieves-guild,world-legerdemain")
  })

  it("scopes to the `stock` action via isEligibleForAction", () => {
    expect(requiredSkillLinesFilter.isEligibleForAction?.("stock")).toBe(true)
    expect(requiredSkillLinesFilter.isEligibleForAction?.("sell")).toBe(false)
  })

  it("clear and transferToCategory mirror set-sources-style filters", () => {
    expect(requiredSkillLinesFilter.clear()).toEqual({ requiredSkillLines: undefined })
    expect(
      requiredSkillLinesFilter.transferToCategory(
        { requiredSkillLines: { skillLineIds: ["world-legerdemain"], mode: "all-maxed" } },
        "any",
        "any-other",
        {}
      )
    ).toEqual({
      requiredSkillLines: { skillLineIds: ["world-legerdemain"], mode: "all-maxed" },
    })
  })
})
