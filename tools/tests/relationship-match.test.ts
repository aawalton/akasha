import { describe, expect, it } from "bun:test"
import {
  matchRelationships,
  mergeRelationships,
  parseAliases,
  relationshipEntries,
  relationshipsForTitle,
  type RelationshipMatchEntry,
} from "../lib/relationship-match.ts"

const JENNIFER_WALTON = "019db533-f382-757e-93d6-8b217ef99d58"
const JENNY_WILLIAMS = "019db533-f382-7712-bfc7-67a478a7658d"
const LIZZY_WALTON = "019db533-f382-77f7-87ea-7cf70e32924a"

function set(args: {
  readonly waltonAliases?: readonly string[]
  readonly williamsAliases?: readonly string[]
}): readonly RelationshipMatchEntry[] {
  return [
    { id: JENNIFER_WALTON, aliases: args.waltonAliases ?? [] },
    { id: JENNY_WILLIAMS, aliases: args.williamsAliases ?? [] },
    { id: LIZZY_WALTON, aliases: ["Lizzy"] },
  ]
}

describe("matchRelationships — only a registered alias links", () => {
  it("links nobody for a relationship carrying no alias", () => {
    expect(matchRelationships({ title: "Jen", relationships: set({}) })).toEqual([])
    expect(matchRelationships({ title: "Jennifer Walton", relationships: set({}) })).toEqual([])
  })

  it("links the one relationship registering the alias", () => {
    const rels = set({ waltonAliases: ["Jen"] })
    expect(matchRelationships({ title: "Jen", relationships: rels })).toEqual([JENNIFER_WALTON])
    expect(matchRelationships({ title: "Church + Jen", relationships: rels })).toEqual([
      JENNIFER_WALTON,
    ])
    expect(matchRelationships({ title: "Time with Jen", relationships: rels })).toEqual([
      JENNIFER_WALTON,
    ])
  })

  it("links nobody when two relationships answer to the same alias", () => {
    expect(
      matchRelationships({
        title: "Jen",
        relationships: set({ waltonAliases: ["Jen"], williamsAliases: ["Jen"] }),
      })
    ).toEqual([])
  })

  it("matches an alias anywhere in the title, not only as a whole word", () => {
    const rels = set({ waltonAliases: ["Jen"] })
    expect(matchRelationships({ title: "Michael Jensen", relationships: rels })).toEqual([
      JENNIFER_WALTON,
    ])
  })

  it("ignores case and punctuation on both sides", () => {
    expect(
      matchRelationships({ title: "JEN — planning", relationships: set({ waltonAliases: ["jen"] }) })
    ).toEqual([JENNIFER_WALTON])
  })

  it("links several when the title carries several aliases", () => {
    expect(
      matchRelationships({ title: "Jen + Lizzy", relationships: set({ waltonAliases: ["Jen"] }) })
    ).toEqual([JENNIFER_WALTON, LIZZY_WALTON].sort())
  })

  it("links nobody for an empty, blank or non-string title", () => {
    const rels = set({ waltonAliases: ["Jen"] })
    expect(matchRelationships({ title: "", relationships: rels })).toEqual([])
    expect(matchRelationships({ title: "   ", relationships: rels })).toEqual([])
    expect(matchRelationships({ title: undefined, relationships: rels })).toEqual([])
    expect(matchRelationships({ title: 42, relationships: rels })).toEqual([])
  })
})

describe("mergeRelationships — what the caller stated is never dropped", () => {
  it("keeps a stated id a title match would never have produced", () => {
    expect(mergeRelationships(["rel-ryan"], [JENNIFER_WALTON])).toEqual([
      "rel-ryan",
      JENNIFER_WALTON,
    ])
  })

  it("adds no duplicate where a stated id was matched too", () => {
    expect(mergeRelationships([JENNIFER_WALTON], [JENNIFER_WALTON])).toEqual([JENNIFER_WALTON])
  })

  it("keeps the stated order first", () => {
    expect(mergeRelationships(["b", "a"], ["c"])).toEqual(["b", "a", "c"])
  })
})

describe("parseAliases / relationshipEntries — a malformed row links nobody rather than throwing", () => {
  it("takes a string array and nothing else", () => {
    expect(parseAliases(["Jen", "Jenny"])).toEqual(["Jen", "Jenny"])
    expect(parseAliases(undefined)).toEqual([])
    expect(parseAliases(null)).toEqual([])
    expect(parseAliases("Jen")).toEqual([])
    expect(parseAliases([1, 2])).toEqual([])
  })

  it("drops a row carrying no string id", () => {
    expect(relationshipEntries([{ aliases: ["Jen"] }, { id: 7, aliases: ["Jen"] }])).toEqual([])
    expect(relationshipEntries([{ id: "r1", aliases: ["Jen"] }])).toEqual([
      { id: "r1", aliases: ["Jen"] },
    ])
  })
})

describe("relationshipsForTitle — one read, stated ids merged with matched", () => {
  it("asks for the relationship page type and merges what it matches onto the stated ids", async () => {
    const asked: unknown[] = []
    const result = await relationshipsForTitle({
      sb: "client",
      title: "Projects + Jen",
      stated: ["rel-ryan"],
      getPages: async (_sb, query) => {
        asked.push(query)
        return { rows: [{ id: JENNIFER_WALTON, aliases: ["Jen"] }, { id: LIZZY_WALTON }] }
      },
    })
    expect(result).toEqual(["rel-ryan", JENNIFER_WALTON])
    expect(asked).toEqual([{ pageTypeSlug: "relationship", select: ["id", "aliases"], limit: 5000 }])
  })
})
