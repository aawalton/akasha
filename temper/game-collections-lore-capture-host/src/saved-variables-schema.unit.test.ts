import { describe, expect, it } from "bun:test"
import { loreLibraryCatalogSchema, loreLibraryCollectionSchema } from "./saved-variables-schema"

describe("loreLibraryCatalogSchema", () => {
  it("parses a category → collection → book tree, coercing numeric-string keys", () => {
    const raw = {
      "1": {
        name: "Shalidor's Library",
        collections: {
          "1": {
            name: "Aldmeri Dominion",
            books: { "1": { name: "The Anticipations" } },
          },
        },
      },
    }

    const parsed = loreLibraryCatalogSchema.parse(raw)

    expect(parsed[1]?.name).toBe("Shalidor's Library")
    expect(parsed[1]?.collections[1]?.name).toBe("Aldmeri Dominion")
    expect(parsed[1]?.collections[1]?.books[1]?.name).toBe("The Anticipations")
  })

  it("keeps hidden collections whose name is the empty string", () => {
    const parsed = loreLibraryCollectionSchema.parse({
      name: "",
      books: { "3": { name: "Crafting Motifs 3: The Argonians" } },
    })

    expect(parsed.name).toBe("")
    expect(parsed.books[3]?.name).toBe("Crafting Motifs 3: The Argonians")
  })

  it("rejects an unknown key on a strict container", () => {
    const result = loreLibraryCollectionSchema.safeParse({
      name: "Aldmeri Dominion",
      books: {},
      unexpected: true,
    })

    expect(result.success).toBe(false)
  })
})
