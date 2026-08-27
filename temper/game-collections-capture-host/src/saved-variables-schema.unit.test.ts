import { describe, expect, it } from "bun:test"
import { collectiblesCatalogSchema } from "./saved-variables-schema"

const HARVEST_SHAPED = {
  categories: {
    "16": {
      name: "Weapon Styles",
      subCategories: {
        "1": {
          name: "Two-Handed",
          collectibles: {
            "7168": { name: "Moongrave Fane Greatsword", categoryType: 24 },
            "4097": { name: "Dro-m'Athra Maul", categoryType: 24 },
          },
        },
      },
    },
    "8": {
      name: "Mementos",
      generalSubCategory: {
        name: "General",
        collectibles: {
          "300": { name: "Bonesnap Binding Stone", categoryType: 10 },
        },
      },
      subCategories: {},
    },
  },
}

describe("collectiblesCatalogSchema", () => {
  it("parses the harvest-shaped payload, coercing numeric-string keys to number", () => {
    const parsed = collectiblesCatalogSchema.parse(HARVEST_SHAPED)
    expect(parsed.categories[16]?.name).toBe("Weapon Styles")
    expect(parsed.categories[16]?.subCategories[1]?.collectibles[7168]?.categoryType).toBe(24)
    expect(parsed.categories[8]?.generalSubCategory?.collectibles[300]?.name).toBe(
      "Bonesnap Binding Stone"
    )
  })

  it("rejects an unexpected key on a strict container", () => {
    const withExtra = {
      categories: {
        "1": { name: "X", subCategories: {}, unexpected: true },
      },
    }
    expect(() => collectiblesCatalogSchema.parse(withExtra)).toThrow()
  })
})
