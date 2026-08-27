import { describe, expect, it } from "bun:test"
import {
  composeCharEligibilityPredicate,
  type EligibilityResolvers,
} from "./eligibility-predicate-composer"
import { planStockDestinationsForStack } from "./stock-destination-planner"
import type { StockDestinationContext } from "./stock-destination-types"
import { CharacterId } from "./use-destination-types"

const cid = CharacterId

const JUSTICE_LINES = ["world-legerdemain", "guild-thieves-guild", "guild-dark-brotherhood"]

type RankMap = ReadonlyMap<string, ReadonlyMap<string, { currentRank: number; maxRank: number }>>

function skillResolver(
  ranks: RankMap
): NonNullable<EligibilityResolvers["getCharacterSkillLineRanks"]> {
  return (charId, skillLineId) => ranks.get(charId)?.get(skillLineId)
}

const ALL_MAXED = new Map(JUSTICE_LINES.map((id) => [id, { currentRank: 20, maxRank: 20 }]))
const LEGERDEMAIN_UNMAXED = new Map([
  ["world-legerdemain", { currentRank: 18, maxRank: 20 }],
  ["guild-thieves-guild", { currentRank: 20, maxRank: 20 }],
  ["guild-dark-brotherhood", { currentRank: 20, maxRank: 20 }],
])

function skillOnlyResolvers(ranks: RankMap): EligibilityResolvers {
  return {
    getCharacterSkillLineRanks: skillResolver(ranks),
    getCharacterCurseState: undefined,
    getCharacterCanLevelMorphs: undefined,
  }
}

describe("composeCharEligibilityPredicate", () => {
  it("returns an all-pass predicate when conditions are undefined", () => {
    const predicate = composeCharEligibilityPredicate(undefined, skillOnlyResolvers(new Map()))
    expect(predicate(cid("anyone"))).toBe(true)
  })

  it("returns an all-pass predicate when no axis is active", () => {
    const predicate = composeCharEligibilityPredicate(
      { requiredSkillLines: { skillLineIds: [], mode: "any-not-maxed" } },
      skillOnlyResolvers(new Map())
    )
    expect(predicate(cid("anyone"))).toBe(true)
  })

  it("any-not-maxed: excludes a char with every justice line maxed, admits one below max", () => {
    const ranks: RankMap = new Map([
      ["erin", ALL_MAXED],
      ["alt", LEGERDEMAIN_UNMAXED],
    ])
    const predicate = composeCharEligibilityPredicate(
      { requiredSkillLines: { skillLineIds: JUSTICE_LINES, mode: "any-not-maxed" } },
      skillOnlyResolvers(ranks)
    )
    expect(predicate(cid("erin"))).toBe(false)
    expect(predicate(cid("alt"))).toBe(true)
  })

  it("AND-composes the curse axis — a skill-eligible char failing curse is excluded", () => {
    const ranks: RankMap = new Map([["alt", LEGERDEMAIN_UNMAXED]])
    const resolvers: EligibilityResolvers = {
      getCharacterSkillLineRanks: skillResolver(ranks),
      getCharacterCurseState: (charId) => (charId === "vamp" ? "vampire" : undefined),
      getCharacterCanLevelMorphs: undefined,
    }
    const predicate = composeCharEligibilityPredicate(
      {
        requiredSkillLines: { skillLineIds: JUSTICE_LINES, mode: "any-not-maxed" },
        requiredCurseState: { state: "vampire" },
      },
      resolvers
    )
    expect(predicate(cid("alt"))).toBe(false)
  })

  it("AND-composes the morphs axis", () => {
    const ranks: RankMap = new Map([
      ["can", LEGERDEMAIN_UNMAXED],
      ["cannot", LEGERDEMAIN_UNMAXED],
    ])
    const resolvers: EligibilityResolvers = {
      getCharacterSkillLineRanks: skillResolver(ranks),
      getCharacterCurseState: undefined,
      getCharacterCanLevelMorphs: (charId) => charId === "can",
    }
    const predicate = composeCharEligibilityPredicate(
      {
        requiredSkillLines: { skillLineIds: JUSTICE_LINES, mode: "any-not-maxed" },
        canLevelMorphs: { mode: "can-level" },
      },
      resolvers
    )
    expect(predicate(cid("can"))).toBe(true)
    expect(predicate(cid("cannot"))).toBe(false)
  })

  it("fail-opens an axis whose resolver is missing", () => {
    const ranks: RankMap = new Map([["alt", LEGERDEMAIN_UNMAXED]])
    const predicate = composeCharEligibilityPredicate(
      {
        requiredSkillLines: { skillLineIds: JUSTICE_LINES, mode: "any-not-maxed" },
        requiredCurseState: { state: "vampire" },
      },
      skillOnlyResolvers(ranks)
    )
    expect(predicate(cid("alt"))).toBe(true)
  })
})

describe("composeCharEligibilityPredicate × planStockDestinationsForStack (justice-edict end to end)", () => {
  it("routes a gated stock stack past every maxed priority char to the first non-maxed one", () => {
    const ranks: RankMap = new Map([
      ["erin", ALL_MAXED],
      ["maxed2", ALL_MAXED],
      ["nonmaxed", LEGERDEMAIN_UNMAXED],
    ])
    const predicate = composeCharEligibilityPredicate(
      { requiredSkillLines: { skillLineIds: JUSTICE_LINES, mode: "any-not-maxed" } },
      skillOnlyResolvers(ranks)
    )
    const ctx: StockDestinationContext = {
      characterPriority: [cid("erin"), cid("maxed2"), cid("nonmaxed")],
      getStockOnChar: () => 0,
    }
    const claims = new Map<CharacterId, Set<string>>()
    const result = planStockDestinationsForStack(
      "stock:71779",
      new Set([71779]),
      2,
      10,
      ctx,
      claims,
      predicate
    )
    expect(result).toEqual([cid("nonmaxed"), cid("nonmaxed")])
  })

  it("yields no allocation only when every priority char is maxed", () => {
    const ranks: RankMap = new Map([
      ["erin", ALL_MAXED],
      ["maxed2", ALL_MAXED],
    ])
    const predicate = composeCharEligibilityPredicate(
      { requiredSkillLines: { skillLineIds: JUSTICE_LINES, mode: "any-not-maxed" } },
      skillOnlyResolvers(ranks)
    )
    const ctx: StockDestinationContext = {
      characterPriority: [cid("erin"), cid("maxed2")],
      getStockOnChar: () => 0,
    }
    const claims = new Map<CharacterId, Set<string>>()
    expect(
      planStockDestinationsForStack("stock:71779", new Set([71779]), 2, 10, ctx, claims, predicate)
    ).toEqual([])
  })
})
