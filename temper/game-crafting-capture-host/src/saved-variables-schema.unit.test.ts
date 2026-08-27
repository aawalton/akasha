import { describe, expect, it } from "bun:test"
import { recipeCatalogSchema, traitResearchCatalogSchema } from "./saved-variables-schema"

describe("recipeCatalogSchema", () => {
  it("parses a populated recipeCatalog with numeric-string list and recipe keys", () => {
    const parsed = recipeCatalogSchema.parse({
      "1": {
        name: "Meat Dishes",
        recipes: {
          "57088": { name: "Stros M'Kai Grilled Seagull" },
          "33921": { name: "Solstheim Elk and Scuttle" },
        },
      },
    })
    expect(parsed[1]?.name).toBe("Meat Dishes")
    expect(parsed[1]?.recipes[57088]?.name).toBe("Stros M'Kai Grilled Seagull")
  })

  it("rejects a recipe carrying an unknown field (strict)", () => {
    const withExtra = {
      "1": { name: "Meat Dishes", recipes: { "57088": { name: "X", known: true } } },
    }
    expect(recipeCatalogSchema.safeParse(withExtra).success).toBe(false)
  })

  it("rejects a list missing its name (strict)", () => {
    const withoutName = { "1": { recipes: { "57088": { name: "X" } } } }
    expect(recipeCatalogSchema.safeParse(withoutName).success).toBe(false)
  })
})

describe("traitResearchCatalogSchema", () => {
  it("parses a populated traitResearchCatalog with nested craft/line/trait maps", () => {
    const parsed = traitResearchCatalogSchema.parse({
      "2": {
        name: "Clothing",
        lines: {
          "1": {
            name: "Robe & Jerkin",
            traits: {
              "1": { name: "Sturdy" },
              "2": { name: "Impenetrable" },
            },
          },
        },
      },
    })
    expect(parsed[2]?.name).toBe("Clothing")
    expect(parsed[2]?.lines[1]?.name).toBe("Robe & Jerkin")
    expect(parsed[2]?.lines[1]?.traits[2]?.name).toBe("Impenetrable")
  })

  it("rejects a trait carrying an unknown field (strict)", () => {
    const withExtra = {
      "2": {
        name: "Clothing",
        lines: { "1": { name: "Robe & Jerkin", traits: { "1": { name: "Sturdy", known: true } } } },
      },
    }
    expect(traitResearchCatalogSchema.safeParse(withExtra).success).toBe(false)
  })
})
