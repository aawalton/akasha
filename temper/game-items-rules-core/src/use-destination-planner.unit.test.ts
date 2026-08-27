import { describe, expect, it } from "bun:test"
import { planUseDestinations, type UseDestinationCandidate } from "./use-destination-planner"
import { hashItemKey } from "./use-destination-resolver"
import { CharacterId, type ItemKey, type UseDestinationContext } from "./use-destination-types"

const cid = CharacterId

function makeCtx(
  priority: ReadonlyArray<CharacterId>,
  known: ReadonlySet<string> = new Set<string>()
): UseDestinationContext {
  return {
    characterPriority: priority,
    knowsItem: (charId, itemKey) => known.has(`${charId}:${hashItemKey(itemKey)}`),
    knownChapterCountForStyle: () => 0,
  }
}

const RECIPE_A: ItemKey = { kind: "recipe", resultItemId: 111 }
const RECIPE_B: ItemKey = { kind: "recipe", resultItemId: 222 }
const CONSUMABLE_A: ItemKey = { kind: "consumable", itemId: 999 }

describe("planUseDestinations", () => {
  it("returns an empty result map for an empty candidate list", () => {
    const ctx = makeCtx([cid("a")])
    const result = planUseDestinations([], ctx)
    expect(result.size).toBe(0)
  })

  it("assigns a single candidate to the only eligible character", () => {
    const ctx = makeCtx([cid("a")])
    const candidates: ReadonlyArray<UseDestinationCandidate> = [
      { slotKey: "s1", itemKey: RECIPE_A },
    ]
    const result = planUseDestinations(candidates, ctx)
    expect(result.get("s1")).toBe(cid("a"))
  })

  it("splits two identical recipes across two eligible characters in priority order", () => {
    const ctx = makeCtx([cid("a"), cid("b")])
    const candidates: ReadonlyArray<UseDestinationCandidate> = [
      { slotKey: "s1", itemKey: RECIPE_A },
      { slotKey: "s2", itemKey: RECIPE_A },
    ]
    const result = planUseDestinations(candidates, ctx)
    expect(result.get("s1")).toBe(cid("a"))
    expect(result.get("s2")).toBe(cid("b"))
  })

  it("returns undefined for the second copy of an identical recipe when only one character is eligible", () => {
    const ctx = makeCtx([cid("a")])
    const candidates: ReadonlyArray<UseDestinationCandidate> = [
      { slotKey: "s1", itemKey: RECIPE_A },
      { slotKey: "s2", itemKey: RECIPE_A },
    ]
    const result = planUseDestinations(candidates, ctx)
    expect(result.get("s1")).toBe(cid("a"))
    expect(result.get("s2")).toBeUndefined()
  })

  it("does not let claims cross item-kinds (two different recipes both place when each char has space)", () => {
    const ctx = makeCtx([cid("a"), cid("b")])
    const candidates: ReadonlyArray<UseDestinationCandidate> = [
      { slotKey: "s1", itemKey: RECIPE_A },
      { slotKey: "s2", itemKey: RECIPE_B },
    ]
    const result = planUseDestinations(candidates, ctx)
    expect(result.get("s1")).toBe(cid("a"))
    expect(result.get("s2")).toBe(cid("a"))
  })

  it("assigns according to iteration order — reversing the input swaps the two recipes' chars", () => {
    const ctx = makeCtx([cid("a"), cid("b")])
    const forward: ReadonlyArray<UseDestinationCandidate> = [
      { slotKey: "s1", itemKey: RECIPE_A },
      { slotKey: "s2", itemKey: RECIPE_A },
    ]
    const reverse: ReadonlyArray<UseDestinationCandidate> = [
      { slotKey: "s2", itemKey: RECIPE_A },
      { slotKey: "s1", itemKey: RECIPE_A },
    ]
    const fwd = planUseDestinations(forward, ctx)
    const rev = planUseDestinations(reverse, ctx)
    expect(fwd.get("s1")).toBe(cid("a"))
    expect(fwd.get("s2")).toBe(cid("b"))
    expect(rev.get("s2")).toBe(cid("a"))
    expect(rev.get("s1")).toBe(cid("b"))
  })

  it("routes three consumables on a single eligible character all to that character (consumable carve-out)", () => {
    const ctx = makeCtx([cid("a")])
    const candidates: ReadonlyArray<UseDestinationCandidate> = [
      { slotKey: "s1", itemKey: CONSUMABLE_A },
      { slotKey: "s2", itemKey: CONSUMABLE_A },
      { slotKey: "s3", itemKey: CONSUMABLE_A },
    ]
    const result = planUseDestinations(candidates, ctx)
    expect(result.get("s1")).toBe(cid("a"))
    expect(result.get("s2")).toBe(cid("a"))
    expect(result.get("s3")).toBe(cid("a"))
  })
})
