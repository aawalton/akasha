import { describe, expect, test } from "bun:test"
import { achievementCatalogSchema } from "./achievement-catalog-schema"

describe("achievementCatalogSchema", () => {
  test("parses a category with a general subcategory and numbered subcategories", () => {
    const raw = {
      categories: {
        1: {
          name: "Cyrodiil",
          generalSubCategory: {
            name: "General",
            achievements: {
              12: { name: "Home Keep", points: 10, totalSteps: 1, isCharacterSpecific: false },
            },
          },
          subCategories: {
            1: {
              name: "Campaigns",
              achievements: {
                34: {
                  name: "Grand Overlord",
                  points: 50,
                  totalSteps: 250000,
                  isCharacterSpecific: true,
                },
              },
            },
          },
        },
      },
    }
    const parsed = achievementCatalogSchema.parse(raw)
    expect(parsed.categories[1]?.name).toBe("Cyrodiil")
    expect(parsed.categories[1]?.generalSubCategory?.achievements[12]?.points).toBe(10)
    expect(parsed.categories[1]?.subCategories[1]?.achievements[34]?.isCharacterSpecific).toBe(true)
  })

  test("accepts a category with no generalSubCategory (writer-optional)", () => {
    const parsed = achievementCatalogSchema.parse({
      categories: {
        2: {
          name: "Crafting",
          subCategories: {
            1: {
              name: "Blacksmithing",
              achievements: {
                5: { name: "Smithing", points: 5, totalSteps: 1, isCharacterSpecific: false },
              },
            },
          },
        },
      },
    })
    expect(parsed.categories[2]?.generalSubCategory).toBeUndefined()
  })

  test("rejects an unknown key on an achievement entry (.strict())", () => {
    const raw = {
      categories: {
        1: {
          name: "Cyrodiil",
          subCategories: {
            1: {
              name: "Campaigns",
              achievements: {
                34: {
                  name: "Grand Overlord",
                  points: 50,
                  totalSteps: 1,
                  isCharacterSpecific: true,
                  extra: "nope",
                },
              },
            },
          },
        },
      },
    }
    expect(() => achievementCatalogSchema.parse(raw)).toThrow()
  })
})
