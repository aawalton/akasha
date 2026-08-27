import { describe, expect, it } from "bun:test"
import type { EligibilityResolvers } from "./eligibility-predicate-composer"
import type { DestinationChain } from "./inventory-rule-types"
import { planStockChainVisit } from "./stock-chain-visit"
import { planStockDestinationsForChain } from "./stock-destination-planner"
import type { StockDestinationContext } from "./stock-destination-types"
import { CharacterId } from "./use-destination-types"

const cid = CharacterId
const ITEM_ID = 12345

const TWO_TIER_CHAIN: DestinationChain = [
  { destination: "character:by-priority", targetQuantity: 200 },
  { destination: "bank" },
]

const THREE_TIER_CHAIN: DestinationChain = [
  {
    destination: "character:by-priority",
    targetQuantity: 5,
    charEligibility: { canLevelMorphs: { mode: "can-level" } },
  },
  { destination: "bank", targetQuantity: 200 },
  { destination: "house-storage:4677" },
]

describe("planStockChainVisit", () => {
  it("reduces a 2-tier chain to fill target + a single uncapped bank surplus tier", () => {
    const plan = planStockChainVisit(TWO_TIER_CHAIN)
    expect(plan).not.toBeUndefined()
    expect(plan?.fillTargetQuantity).toBe(200)
    expect(plan?.surplusDestination).toBe("bank")
    expect(plan?.surplusCascade).toEqual([{ destination: "bank", cap: undefined }])
    expect(plan?.charEligibility).toBeUndefined()
  })

  it("reduces a 3-tier chain to the fill tier + the full capped surplus cascade", () => {
    const plan = planStockChainVisit(THREE_TIER_CHAIN)
    expect(plan?.fillTargetQuantity).toBe(5)
    expect(plan?.surplusDestination).toBe("bank")
    expect(plan?.surplusCascade).toEqual([
      { destination: "bank", cap: 200 },
      { destination: "house-storage:4677", cap: undefined },
    ])
    expect(plan?.charEligibility).toEqual({ canLevelMorphs: { mode: "can-level" } })
  })

  it("returns undefined for a pure fixed-destination chain (no by-priority tier)", () => {
    expect(planStockChainVisit([{ destination: "bank" }])).toBeUndefined()
  })

  it("treats a by-priority tier with no targetQuantity as a zero fill target", () => {
    const plan = planStockChainVisit([
      { destination: "character:by-priority" },
      { destination: "bank" },
    ])
    expect(plan?.fillTargetQuantity).toBe(0)
  })

  it("returns an empty surplus cascade when the by-priority tier is terminal", () => {
    const plan = planStockChainVisit([
      { destination: "character:by-priority", targetQuantity: 200 },
    ])
    expect(plan?.fillTargetQuantity).toBe(200)
    expect(plan?.surplusDestination).toBeUndefined()
    expect(plan?.surplusCascade).toEqual([])
  })
})

describe("planStockChainVisit ↔ planStockDestinationsForChain convergence", () => {
  const noopResolvers: EligibilityResolvers = {
    getCharacterSkillLineRanks: () => undefined,
    getCharacterCurseState: () => undefined,
    getCharacterCanLevelMorphs: () => false,
  }

  function makeCtx(
    priority: ReadonlyArray<CharacterId>,
    stockMap: ReadonlyMap<string, number>
  ): StockDestinationContext {
    return {
      characterPriority: priority,
      getStockOnChar: (_itemId, charId) => stockMap.get(charId) ?? 0,
      getStockOnCharForGroup: (_itemIds, charId) => stockMap.get(charId) ?? 0,
    }
  }

  it("per-visit fill target equals the amount the global planner fills a below-target char to", () => {
    const plan = planStockChainVisit(TWO_TIER_CHAIN)
    if (plan === undefined) throw new Error("expected a chain visit plan for the 2-tier chain")
    const rows = planStockDestinationsForChain(
      `stock:${ITEM_ID}`,
      new Set([ITEM_ID]),
      1000,
      TWO_TIER_CHAIN,
      makeCtx([cid("a")], new Map()),
      noopResolvers,
      new Map()
    )
    const aFilled = rows.filter((r) => r.charId === cid("a")).reduce((n, r) => n + r.count, 0)
    expect(aFilled).toBe(plan.fillTargetQuantity)
  })
})
