import { describe, expect, test } from "bun:test"
import { antiquityLoreCatalogSchema } from "./saved-variables-schema"

describe("antiquityLoreCatalogSchema", () => {
  test("parses a well-formed catalog, coercing numeric-string keys", () => {
    const raw = {
      "42": {
        name: "Ayleid Relic",
        categoryId: 3,
        categoryName: "Relics",
        setId: 0,
        totalLoreEntries: 5,
      },
    }
    const parsed = antiquityLoreCatalogSchema.parse(raw)
    expect(parsed[42]?.name).toBe("Ayleid Relic")
    expect(parsed[42]?.categoryName).toBe("Relics")
    expect(parsed[42]?.totalLoreEntries).toBe(5)
  })

  test("rejects an entry carrying an unknown key (.strict)", () => {
    const raw = {
      "1": {
        name: "x",
        categoryId: 1,
        categoryName: "c",
        setId: 0,
        totalLoreEntries: 1,
        extra: true,
      },
    }
    expect(() => antiquityLoreCatalogSchema.parse(raw)).toThrow()
  })

  test("rejects an entry missing a required field", () => {
    const raw = {
      "1": { name: "x", categoryId: 1, categoryName: "c", setId: 0 },
    }
    expect(() => antiquityLoreCatalogSchema.parse(raw)).toThrow()
  })
})
