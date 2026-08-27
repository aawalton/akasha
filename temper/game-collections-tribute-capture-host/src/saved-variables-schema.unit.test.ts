import { describe, expect, it } from "bun:test"
import { tributeCatalogSchema } from "./saved-variables-schema"

function saintPelin(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    name: "Saint Pelin",
    categoryName: "Patrons",
    collectibleId: 10403,
    cards: {
      "7": { baseCardName: "Archers' Volley", upgradeCardName: "Siege Weapon Volley" },
      "9": { baseCardName: "Banneret", upgradeCardName: "Knight Commander" },
      "5": { baseCardName: "Bangkorai Sentries", upgradeCardName: "Knights of Saint Pelin" },
    },
    ...overrides,
  }
}

describe("tributeCatalogSchema", () => {
  it("parses a populated tributeCatalog with numeric-string patron and card keys", () => {
    const parsed = tributeCatalogSchema.parse({ "1": saintPelin() })
    expect(parsed[1]?.name).toBe("Saint Pelin")
    expect(parsed[1]?.collectibleId).toBe(10403)
    expect(parsed[1]?.cards[7]?.upgradeCardName).toBe("Siege Weapon Volley")
  })

  it("accepts a patron with an empty cards table", () => {
    const parsed = tributeCatalogSchema.parse({ "1": saintPelin({ cards: {} }) })
    expect(parsed[1]?.cards).toEqual({})
  })

  it("rejects a patron missing a required field (strict)", () => {
    const { collectibleId: _omit, ...withoutCollectibleId } = saintPelin()
    expect(tributeCatalogSchema.safeParse({ "1": withoutCollectibleId }).success).toBe(false)
  })

  it("rejects an unknown key on a patron entry (strict)", () => {
    expect(tributeCatalogSchema.safeParse({ "1": saintPelin({ extraField: true }) }).success).toBe(
      false
    )
  })

  it("rejects an unknown key on a card (strict)", () => {
    const withBadCard = saintPelin({
      cards: { "7": { baseCardName: "A", upgradeCardName: "B", rogue: 1 } },
    })
    expect(tributeCatalogSchema.safeParse({ "1": withBadCard }).success).toBe(false)
  })
})
