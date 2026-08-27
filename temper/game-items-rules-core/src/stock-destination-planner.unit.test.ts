import { describe, expect, it } from "bun:test"
import type { EligibilityResolvers } from "./eligibility-predicate-composer"
import type { DestinationChain } from "./inventory-rule-types"
import {
  planStockDestinationsForChain,
  planStockDestinationsForStack,
} from "./stock-destination-planner"
import type { StockDestinationContext } from "./stock-destination-types"
import { CharacterId } from "./use-destination-types"

const cid = CharacterId
const ITEM_ID = 12345
const GROUP_KEY = `stock:${ITEM_ID}`
const SINGLE_GROUP = new Set([ITEM_ID])

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

function makeGroupCtx(
  priority: ReadonlyArray<CharacterId>,
  perCharPerItem: ReadonlyMap<string, number>
): StockDestinationContext {
  const readOne = (itemId: number, charId: CharacterId): number =>
    perCharPerItem.get(`${charId}:${itemId}`) ?? 0
  return {
    characterPriority: priority,
    getStockOnChar: readOne,
    getStockOnCharForGroup: (itemIds, charId) => {
      let sum = 0
      for (const id of itemIds) sum += readOne(id, charId)
      return sum
    },
  }
}

describe("planStockDestinationsForStack", () => {
  it("returns empty when characterPriority is empty", () => {
    const ctx = makeCtx([], new Map())
    const claims = new Map<CharacterId, Set<string>>()
    expect(planStockDestinationsForStack(GROUP_KEY, SINGLE_GROUP, 10, 5, ctx, claims)).toEqual([])
  })

  it("returns empty when stackCount is 0", () => {
    const ctx = makeCtx([cid("a")], new Map())
    const claims = new Map<CharacterId, Set<string>>()
    expect(planStockDestinationsForStack(GROUP_KEY, SINGLE_GROUP, 0, 5, ctx, claims)).toEqual([])
  })

  it("returns empty when targetQuantity is 0", () => {
    const ctx = makeCtx([cid("a")], new Map())
    const claims = new Map<CharacterId, Set<string>>()
    expect(planStockDestinationsForStack(GROUP_KEY, SINGLE_GROUP, 10, 0, ctx, claims)).toEqual([])
  })

  it("tops up the first eligible char up to targetQuantity from current stock", () => {
    const ctx = makeCtx([cid("a"), cid("b")], new Map([["a", 3]]))
    const claims = new Map<CharacterId, Set<string>>()
    const result = planStockDestinationsForStack(GROUP_KEY, SINGLE_GROUP, 10, 5, ctx, claims)
    expect(result).toEqual([cid("a"), cid("a"), cid("b"), cid("b"), cid("b"), cid("b"), cid("b")])
  })

  it("returns empty when every priority-ranked char is at or above targetQuantity", () => {
    const ctx = makeCtx(
      [cid("a"), cid("b")],
      new Map([
        ["a", 5],
        ["b", 6],
      ])
    )
    const claims = new Map<CharacterId, Set<string>>()
    expect(planStockDestinationsForStack(GROUP_KEY, SINGLE_GROUP, 10, 5, ctx, claims)).toEqual([])
  })

  it("truncates output at stackCount when total need exceeds the stack", () => {
    const ctx = makeCtx([cid("a"), cid("b")], new Map())
    const claims = new Map<CharacterId, Set<string>>()
    const result = planStockDestinationsForStack(GROUP_KEY, SINGLE_GROUP, 3, 10, ctx, claims)
    expect(result).toEqual([cid("a"), cid("a"), cid("a")])
  })

  it("leaves surplus on the stack when total need is below stackCount", () => {
    const ctx = makeCtx([cid("a")], new Map([["a", 4]]))
    const claims = new Map<CharacterId, Set<string>>()
    const result = planStockDestinationsForStack(GROUP_KEY, SINGLE_GROUP, 10, 5, ctx, claims)
    expect(result).toEqual([cid("a")])
  })

  it("filters via eligibilityPredicate — only matching chars receive units", () => {
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")], new Map())
    const claims = new Map<CharacterId, Set<string>>()
    const predicate = (charId: CharacterId) => charId !== cid("b")
    const result = planStockDestinationsForStack(
      GROUP_KEY,
      SINGLE_GROUP,
      5,
      2,
      ctx,
      claims,
      predicate
    )
    expect(result).toEqual([cid("a"), cid("a"), cid("c"), cid("c")])
  })

  it("returns empty when predicate rejects every char", () => {
    const ctx = makeCtx([cid("a"), cid("b")], new Map())
    const claims = new Map<CharacterId, Set<string>>()
    const result = planStockDestinationsForStack(
      GROUP_KEY,
      SINGLE_GROUP,
      5,
      10,
      ctx,
      claims,
      () => false
    )
    expect(result).toEqual([])
  })

  it("records claims for cross-stack dedup signaling under the group key", () => {
    const ctx = makeCtx([cid("a")], new Map())
    const claims = new Map<CharacterId, Set<string>>()
    planStockDestinationsForStack(GROUP_KEY, SINGLE_GROUP, 1, 5, ctx, claims)
    expect(claims.get(cid("a"))?.has(GROUP_KEY)).toBe(true)
  })
})

describe("planStockDestinationsForStack — multi-itemId AGGREGATE counting", () => {
  const ITEM_A = 1001
  const ITEM_B = 1002
  const RULE_GROUP_KEY = "stock:rule:my-rule"
  const GROUP = new Set([ITEM_A, ITEM_B])

  it("caps the per-char TOTAL across the group, not each itemId independently", () => {
    const ctx = makeGroupCtx(
      [cid("a"), cid("b")],
      new Map([
        [`a:${ITEM_A}`, 60],
        [`a:${ITEM_B}`, 50],
      ])
    )
    const claims = new Map<CharacterId, Set<string>>()
    const result = planStockDestinationsForStack(RULE_GROUP_KEY, GROUP, 30, 100, ctx, claims)
    expect(result).toEqual(Array.from({ length: 30 }, () => cid("b")))
  })

  it("a single accumulator caps a char across stacks of DIFFERENT itemIds in the rule", () => {
    const ctx = makeGroupCtx([cid("a")], new Map())
    const claims = new Map<CharacterId, Set<string>>()
    const acc = new Map<CharacterId, number>()
    const stackA = planStockDestinationsForStack(
      RULE_GROUP_KEY,
      GROUP,
      60,
      100,
      ctx,
      claims,
      undefined,
      acc
    )
    const stackB = planStockDestinationsForStack(
      RULE_GROUP_KEY,
      GROUP,
      50,
      100,
      ctx,
      claims,
      undefined,
      acc
    )
    expect(stackA.length).toBe(60)
    expect(stackB.length).toBe(40)
    expect(stackA.every((c) => c === cid("a"))).toBe(true)
    expect(stackB.every((c) => c === cid("a"))).toBe(true)
  })

  it("60 of A + 50 of B held by one char caps at target 100, surplus falls through", () => {
    const ctx = makeGroupCtx(
      [cid("a")],
      new Map([
        [`a:${ITEM_A}`, 60],
        [`a:${ITEM_B}`, 50],
      ])
    )
    const claims = new Map<CharacterId, Set<string>>()
    const result = planStockDestinationsForStack(RULE_GROUP_KEY, GROUP, 40, 100, ctx, claims)
    expect(result).toEqual([])
  })

  it("falls back to summing getStockOnChar when no group accessor is supplied", () => {
    const ctx: StockDestinationContext = {
      characterPriority: [cid("a")],
      getStockOnChar: (itemId, charId) => (charId === cid("a") && itemId === ITEM_A ? 60 : 0),
    }
    const claims = new Map<CharacterId, Set<string>>()
    const result = planStockDestinationsForStack(RULE_GROUP_KEY, GROUP, 100, 100, ctx, claims)
    expect(result.length).toBe(40)
    expect(result.every((c) => c === cid("a"))).toBe(true)
  })
})

describe("planStockDestinationsForChain", () => {
  const noopResolvers: EligibilityResolvers = {
    getCharacterSkillLineRanks: () => undefined,
    getCharacterCurseState: () => undefined,
    getCharacterCanLevelMorphs: () => false,
  }

  const lockpicksChain: DestinationChain = [
    { destination: "character:by-priority", targetQuantity: 200 },
    { destination: "bank" },
  ]

  it("fills each priority char from a bank-source stack, surplus to the bank tier", () => {
    const ctx = makeCtx([cid("a"), cid("b")], new Map([["a", 50]]))
    const rows = planStockDestinationsForChain(
      GROUP_KEY,
      SINGLE_GROUP,
      1000,
      lockpicksChain,
      ctx,
      noopResolvers,
      new Map()
    )
    const aRow = rows.find((r) => r.charId === cid("a"))
    const bRow = rows.find((r) => r.charId === cid("b"))
    const bankRow = rows.find((r) => r.destination === "bank")
    expect(aRow?.count).toBe(150)
    expect(bRow?.count).toBe(200)
    expect(bankRow?.count).toBe(650)
  })

  it("by-priority per-char allocation equals planStockDestinationsForStack", () => {
    const priority = [cid("a"), cid("b")]
    const stock = new Map([["a", 50]])
    const chainRows = planStockDestinationsForChain(
      GROUP_KEY,
      SINGLE_GROUP,
      1000,
      lockpicksChain,
      makeCtx(priority, stock),
      noopResolvers,
      new Map()
    )
    const stackAlloc = planStockDestinationsForStack(
      GROUP_KEY,
      SINGLE_GROUP,
      1000,
      200,
      makeCtx(priority, stock),
      new Map()
    )
    const chainPerChar = new Map<CharacterId, number>()
    for (const r of chainRows) {
      if (r.destination === "character:by-priority" && r.charId !== undefined) {
        chainPerChar.set(r.charId, (chainPerChar.get(r.charId) ?? 0) + r.count)
      }
    }
    const stackPerChar = new Map<CharacterId, number>()
    for (const c of stackAlloc) stackPerChar.set(c, (stackPerChar.get(c) ?? 0) + 1)
    expect(chainPerChar).toEqual(stackPerChar)
  })

  it("returns no by-priority rows for a pure fixed-destination chain", () => {
    const ctx = makeCtx([cid("a")], new Map())
    const rows = planStockDestinationsForChain(
      GROUP_KEY,
      SINGLE_GROUP,
      100,
      [{ destination: "bank" }],
      ctx,
      noopResolvers,
      new Map()
    )
    expect(rows.every((r) => r.destination === "bank")).toBe(true)
  })

  it("aggregate group: by-priority tier caps a char at the group total across itemIds", () => {
    const ITEM_A = 2001
    const ITEM_B = 2002
    const GROUP = new Set([ITEM_A, ITEM_B])
    const ctx = makeGroupCtx(
      [cid("a")],
      new Map([
        [`a:${ITEM_A}`, 150],
        [`a:${ITEM_B}`, 100],
      ])
    )
    const rows = planStockDestinationsForChain(
      "stock:rule:agg",
      GROUP,
      1000,
      lockpicksChain,
      ctx,
      noopResolvers,
      new Map()
    )
    const aRow = rows.find((r) => r.charId === cid("a"))
    const bankRow = rows.find((r) => r.destination === "bank")
    expect(aRow).toBeUndefined()
    expect(bankRow?.count).toBe(1000)
  })
})
