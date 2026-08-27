import { describe, expect, it } from "bun:test"
import {
  claimItemForCharacter,
  hashItemKey,
  planUseDestinationsForStack,
  resolveUseDestination,
} from "./use-destination-resolver"
import { CharacterId, type ItemKey, type UseDestinationContext } from "./use-destination-types"

const cid = CharacterId

function makeCtx(
  priority: ReadonlyArray<CharacterId>,
  known: ReadonlySet<string> = new Set<string>(),
  chapterCounts: ReadonlyMap<string, number> = new Map<string, number>()
): UseDestinationContext {
  return {
    characterPriority: priority,
    knowsItem: (charId, itemKey) => known.has(`${charId}:${hashItemKey(itemKey)}`),
    knownChapterCountForStyle: (charId, styleId) => chapterCounts.get(`${charId}:${styleId}`) ?? 0,
  }
}

const EMPTY_CLAIMS: ReadonlyMap<CharacterId, ReadonlySet<string>> = new Map()

const RECIPE_A: ItemKey = { kind: "recipe", resultItemId: 111 }
const RECIPE_B: ItemKey = { kind: "recipe", resultItemId: 222 }
const MOTIF_A: ItemKey = { kind: "motif", styleId: 3, chapterId: 4 }
const MOTIF_MASTER_3: ItemKey = { kind: "motif", styleId: 3, chapterId: null }
const MOTIF_MASTER_5: ItemKey = { kind: "motif", styleId: 5, chapterId: null }
const SCRIPT_A: ItemKey = { kind: "script", scriptId: 555 }
const CONSUMABLE_A: ItemKey = { kind: "consumable", itemId: 999 }

describe("resolveUseDestination", () => {
  it("returns the only eligible character when there is exactly one", () => {
    const ctx = makeCtx([cid("a")])
    expect(resolveUseDestination(RECIPE_A, ctx, EMPTY_CLAIMS)).toBe(cid("a"))
  })

  it("returns the higher-priority character when both are eligible", () => {
    const ctx = makeCtx([cid("a"), cid("b")])
    expect(resolveUseDestination(RECIPE_A, ctx, EMPTY_CLAIMS)).toBe(cid("a"))
  })

  it("skips a character that already knows the item and returns the next eligible one", () => {
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")], new Set([`a:${hashItemKey(RECIPE_A)}`]))
    expect(resolveUseDestination(RECIPE_A, ctx, EMPTY_CLAIMS)).toBe(cid("b"))
  })

  it("returns undefined when every priority character already knows the item", () => {
    const ctx = makeCtx(
      [cid("a"), cid("b")],
      new Set([`a:${hashItemKey(RECIPE_A)}`, `b:${hashItemKey(RECIPE_A)}`])
    )
    expect(resolveUseDestination(RECIPE_A, ctx, EMPTY_CLAIMS)).toBeUndefined()
  })

  it("returns undefined when characterPriority is empty", () => {
    const ctx = makeCtx([])
    expect(resolveUseDestination(RECIPE_A, ctx, EMPTY_CLAIMS)).toBeUndefined()
  })

  it("treats an existing claim on the same recipe as blocking that character", () => {
    const ctx = makeCtx([cid("a"), cid("b")])
    const claims = new Map<CharacterId, Set<string>>()
    claimItemForCharacter(claims, cid("a"), RECIPE_A)
    expect(resolveUseDestination(RECIPE_A, ctx, claims)).toBe(cid("b"))
  })

  it("does not treat a claim on a different recipe (different resultItemId) as blocking", () => {
    const ctx = makeCtx([cid("a"), cid("b")])
    const claims = new Map<CharacterId, Set<string>>()
    claimItemForCharacter(claims, cid("a"), RECIPE_B)
    expect(resolveUseDestination(RECIPE_A, ctx, claims)).toBe(cid("a"))
  })

  it("does not cross-block across kinds (motif claim does not block a recipe resolution)", () => {
    const ctx = makeCtx([cid("a"), cid("b")])
    const claims = new Map<CharacterId, Set<string>>()
    claimItemForCharacter(claims, cid("a"), MOTIF_A)
    expect(resolveUseDestination(RECIPE_A, ctx, claims)).toBe(cid("a"))
  })

  it("ignores claim-blocking for consumables (carve-out documented in CLAUDE.md)", () => {
    const ctx = makeCtx([cid("a"), cid("b")])
    const claims = new Map<CharacterId, Set<string>>([
      [cid("a"), new Set([hashItemKey(CONSUMABLE_A)])],
    ])
    expect(resolveUseDestination(CONSUMABLE_A, ctx, claims)).toBe(cid("a"))
  })

  it("resolves all four ItemKey kinds correctly under simple conditions", () => {
    const ctx = makeCtx([cid("a")])
    expect(resolveUseDestination(RECIPE_A, ctx, EMPTY_CLAIMS)).toBe(cid("a"))
    expect(resolveUseDestination(MOTIF_A, ctx, EMPTY_CLAIMS)).toBe(cid("a"))
    expect(resolveUseDestination(SCRIPT_A, ctx, EMPTY_CLAIMS)).toBe(cid("a"))
    expect(resolveUseDestination(CONSUMABLE_A, ctx, EMPTY_CLAIMS)).toBe(cid("a"))
  })
})

describe("hashItemKey", () => {
  it("formats recipe hashes as `recipe:<resultItemId>`", () => {
    expect(hashItemKey({ kind: "recipe", resultItemId: 111 })).toBe("recipe:111")
  })

  it("formats motif chapter hashes as `motif:<styleId>:<chapterId>`", () => {
    expect(hashItemKey({ kind: "motif", styleId: 3, chapterId: 4 })).toBe("motif:3:4")
  })

  it("formats motif master-book hashes as `motif:<styleId>:master`", () => {
    expect(hashItemKey({ kind: "motif", styleId: 3, chapterId: null })).toBe("motif:3:master")
  })

  it("formats script hashes as `script:<scriptId>`", () => {
    expect(hashItemKey({ kind: "script", scriptId: 555 })).toBe("script:555")
  })

  it("formats consumable hashes as `consumable:<itemId>`", () => {
    expect(hashItemKey({ kind: "consumable", itemId: 999 })).toBe("consumable:999")
  })
})

describe("claimItemForCharacter", () => {
  it("adds a hash to a fresh claims map", () => {
    const claims = new Map<CharacterId, Set<string>>()
    claimItemForCharacter(claims, cid("a"), RECIPE_A)
    expect(claims.get(cid("a"))).toEqual(new Set([hashItemKey(RECIPE_A)]))
  })

  it("accumulates two distinct hashes for the same character", () => {
    const claims = new Map<CharacterId, Set<string>>()
    claimItemForCharacter(claims, cid("a"), RECIPE_A)
    claimItemForCharacter(claims, cid("a"), RECIPE_B)
    expect(claims.get(cid("a"))).toEqual(new Set([hashItemKey(RECIPE_A), hashItemKey(RECIPE_B)]))
  })

  it("is a no-op for consumables (the map remains empty)", () => {
    const claims = new Map<CharacterId, Set<string>>()
    claimItemForCharacter(claims, cid("a"), CONSUMABLE_A)
    expect(claims.size).toBe(0)
  })
})

describe("planUseDestinationsForStack", () => {
  it("allocates one copy per eligible character in priority order, up to stackCount", () => {
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")])
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(RECIPE_A, 3, ctx, claims)).toEqual([
      cid("a"),
      cid("b"),
      cid("c"),
    ])
  })

  it("returns fewer characters than stackCount when not enough are eligible (surplus signal)", () => {
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")])
    const claims = new Map<CharacterId, Set<string>>()
    const result = planUseDestinationsForStack(RECIPE_A, 5, ctx, claims)
    expect(result).toEqual([cid("a"), cid("b"), cid("c")])
    expect(result.length).toBe(3)
  })

  it("caps at stackCount when more characters are eligible than copies", () => {
    const ctx = makeCtx([cid("a"), cid("b"), cid("c"), cid("d")])
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(RECIPE_A, 2, ctx, claims)).toEqual([cid("a"), cid("b")])
  })

  it("skips characters that already know the item", () => {
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")], new Set([`b:${hashItemKey(RECIPE_A)}`]))
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(RECIPE_A, 3, ctx, claims)).toEqual([cid("a"), cid("c")])
  })

  it("skips characters that already have a claim on the same ItemKey", () => {
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")])
    const claims = new Map<CharacterId, Set<string>>()
    claimItemForCharacter(claims, cid("a"), RECIPE_A)
    expect(planUseDestinationsForStack(RECIPE_A, 3, ctx, claims)).toEqual([cid("b"), cid("c")])
  })

  it("never emits the same character twice for the same stack", () => {
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")])
    const claims = new Map<CharacterId, Set<string>>()
    const result = planUseDestinationsForStack(RECIPE_A, 3, ctx, claims)
    expect(new Set(result).size).toBe(result.length)
  })

  it("mutates the claim map so subsequent calls see the new claims", () => {
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")])
    const claims = new Map<CharacterId, Set<string>>()
    planUseDestinationsForStack(RECIPE_A, 2, ctx, claims)
    expect(planUseDestinationsForStack(RECIPE_A, 3, ctx, claims)).toEqual([cid("c")])
  })

  it("does not cross-block across kinds (motif claim does not block a recipe pass)", () => {
    const ctx = makeCtx([cid("a"), cid("b")])
    const claims = new Map<CharacterId, Set<string>>()
    claimItemForCharacter(claims, cid("a"), MOTIF_A)
    expect(planUseDestinationsForStack(RECIPE_A, 2, ctx, claims)).toEqual([cid("a"), cid("b")])
  })

  it("returns an empty array when no priority characters are eligible", () => {
    const ctx = makeCtx(
      [cid("a"), cid("b")],
      new Set([`a:${hashItemKey(RECIPE_A)}`, `b:${hashItemKey(RECIPE_A)}`])
    )
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(RECIPE_A, 5, ctx, claims)).toEqual([])
  })

  it("returns an empty array when stackCount is 0", () => {
    const ctx = makeCtx([cid("a"), cid("b")])
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(RECIPE_A, 0, ctx, claims)).toEqual([])
  })

  it("returns an empty array when characterPriority is empty", () => {
    const ctx = makeCtx([])
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(RECIPE_A, 3, ctx, claims)).toEqual([])
  })
})

describe("planUseDestinationsForStack — master-motif chapter-count tiebreaker", () => {
  it("places a single master book on the eligible char with the fewest known chapters", () => {
    const counts = new Map([
      ["a:3", 10],
      ["b:3", 3],
      ["c:3", 7],
    ])
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")], new Set<string>(), counts)
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(MOTIF_MASTER_3, 1, ctx, claims)).toEqual([cid("b")])
  })

  it("orders allocations ASC by chapter count when stackCount covers every eligible char", () => {
    const counts = new Map([
      ["a:3", 10],
      ["b:3", 3],
      ["c:3", 7],
    ])
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")], new Set<string>(), counts)
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(MOTIF_MASTER_3, 3, ctx, claims)).toEqual([
      cid("b"),
      cid("c"),
      cid("a"),
    ])
  })

  it("breaks chapter-count ties using characterPriority order (stable sort)", () => {
    const counts = new Map([
      ["a:3", 5],
      ["b:3", 5],
      ["c:3", 2],
    ])
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")], new Set<string>(), counts)
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(MOTIF_MASTER_3, 3, ctx, claims)).toEqual([
      cid("c"),
      cid("a"),
      cid("b"),
    ])
  })

  it("falls back to pure characterPriority when every eligible char has the same count", () => {
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")])
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(MOTIF_MASTER_3, 3, ctx, claims)).toEqual([
      cid("a"),
      cid("b"),
      cid("c"),
    ])
  })

  it("skips chars who already know the master before applying the tiebreaker", () => {
    const counts = new Map([
      ["a:3", 0],
      ["b:3", 8],
      ["c:3", 3],
    ])
    const ctx = makeCtx(
      [cid("a"), cid("b"), cid("c")],
      new Set([`a:${hashItemKey(MOTIF_MASTER_3)}`]),
      counts
    )
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(MOTIF_MASTER_3, 2, ctx, claims)).toEqual([
      cid("c"),
      cid("b"),
    ])
  })

  it("isolates the tiebreaker by styleId — a different style's chapter counts don't leak", () => {
    const counts = new Map([
      ["a:3", 0],
      ["a:5", 10],
      ["b:3", 10],
      ["b:5", 3],
    ])
    const ctx = makeCtx([cid("a"), cid("b")], new Set<string>(), counts)
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(MOTIF_MASTER_5, 1, ctx, claims)).toEqual([cid("b")])
  })

  it("does NOT apply the tiebreaker to motif chapter books — priority wins", () => {
    const counts = new Map([
      ["a:3", 13],
      ["b:3", 0],
      ["c:3", 7],
    ])
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")], new Set<string>(), counts)
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(MOTIF_A, 3, ctx, claims)).toEqual([
      cid("a"),
      cid("b"),
      cid("c"),
    ])
  })

  it("does NOT apply the tiebreaker to recipes — priority wins", () => {
    const counts = new Map([
      ["a:3", 13],
      ["b:3", 0],
    ])
    const ctx = makeCtx([cid("a"), cid("b")], new Set<string>(), counts)
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(RECIPE_A, 2, ctx, claims)).toEqual([cid("a"), cid("b")])
  })

  it("threads claims correctly under the tiebreaker — a second pass sees the first pass's claims", () => {
    const counts = new Map([
      ["a:3", 10],
      ["b:3", 3],
      ["c:3", 7],
    ])
    const ctx = makeCtx([cid("a"), cid("b"), cid("c")], new Set<string>(), counts)
    const claims = new Map<CharacterId, Set<string>>()
    expect(planUseDestinationsForStack(MOTIF_MASTER_3, 2, ctx, claims)).toEqual([
      cid("b"),
      cid("c"),
    ])
    expect(planUseDestinationsForStack(MOTIF_MASTER_3, 2, ctx, claims)).toEqual([cid("a")])
  })
})
