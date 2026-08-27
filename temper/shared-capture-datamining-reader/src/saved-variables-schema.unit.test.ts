import { describe, expect, it } from "bun:test"
import {
  dataminingAccountWideSchema,
  minedItemSchema,
  minedQuestSchema,
  rootSchema,
} from "./saved-variables-schema"

function fullItem(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    name: "Ring of the Pale Order",
    icon: "/esoui/art/icons/ring.dds",
    itemType: 4,
    specializedItemType: 0,
    equipType: 12,
    weaponType: 0,
    armorType: 0,
    weaponPower: 0,
    armorRating: 0,
    requiredLevel: 50,
    requiredCP: 160,
    value: 500,
    quality: 5,
    style: 0,
    filterType: 3,
    filterTypeSpecific: 0,
    isUnique: true,
    isUniqueEquipped: false,
    enchantHeader: "Adds Recovery",
    enchantDescription: "Adds 161 Health Recovery",
    hasOnUseAbility: false,
    abilityHeader: "",
    abilityDescription: "",
    abilityCooldown: 0,
    traitType: 26,
    traitDescription: "Arcane",
    hasSet: true,
    setId: 574,
    setName: "Pale Order",
    setMaxEquip: 2,
    setBonuses: {
      "1": { numRequired: 1, description: "Restores health on damage", isPerfected: false },
      "2": { numRequired: 2, description: "Reduces healing received", isPerfected: false },
    },
    flavorText: "A ring worn by the Pale Order.",
    ...overrides,
  }
}

describe("minedItemSchema", () => {
  it("recovers setBonuses from the on-disk numeric-string-keyed record into an array", () => {
    const parsed = minedItemSchema.parse(fullItem())
    expect(parsed.setBonuses).toEqual([
      { numRequired: 1, description: "Restores health on damage", isPerfected: false },
      { numRequired: 2, description: "Reduces healing received", isPerfected: false },
    ])
    expect(parsed.requiredCP).toBe(160)
  })

  it("accepts an empty setBonuses table", () => {
    const parsed = minedItemSchema.parse(fullItem({ setBonuses: {} }))
    expect(parsed.setBonuses).toEqual([])
  })

  it("rejects an item missing a required field (strict)", () => {
    const { name: _omit, ...withoutName } = fullItem()
    expect(minedItemSchema.safeParse(withoutName).success).toBe(false)
  })
})

describe("minedQuestSchema", () => {
  it("parses a mined quest", () => {
    const parsed = minedQuestSchema.parse({
      name: "The Long Road",
      questType: 1,
      repeatableType: 0,
      zoneId: 3,
      zoneName: "Auridon",
    })
    expect(parsed.name).toBe("The Long Road")
    expect(parsed.zoneName).toBe("Auridon")
  })
})

describe("dataminingAccountWideSchema", () => {
  it("parses a populated $AccountWide payload with the version sentinel and mine maps", () => {
    const parsed = dataminingAccountWideSchema.parse({
      version: 1,
      items: { "12345": fullItem() },
      nextItemId: 12346,
      isRunning: false,
      consecutiveMisses: 0,
      completed: false,
      stats: { totalProcessed: 100, equipmentFound: 12, startTime: 1000 },
      quests: {
        "7": {
          name: "The Long Road",
          questType: 1,
          repeatableType: 0,
          zoneId: 3,
          zoneName: "Auridon",
        },
      },
      questNextId: 8,
      questIsRunning: false,
      questConsecutiveMisses: 0,
      questCompleted: false,
      questStats: { totalMined: 7, startTime: 1000, endTime: 2000 },
      apiVersion: "101041",
    })
    expect(parsed.items?.[12345]?.setName).toBe("Pale Order")
    expect(parsed.quests?.[7]?.name).toBe("The Long Road")
  })

  it("accepts a freshly-seeded $AccountWide carrying only the version sentinel", () => {
    const parsed = dataminingAccountWideSchema.parse({ version: 1 })
    expect(parsed.items).toBeUndefined()
  })
})

describe("rootSchema", () => {
  it("parses the Default → @account → $AccountWide envelope", () => {
    const parsed = rootSchema.parse({
      Default: {
        "@player": {
          $AccountWide: { version: 1, items: { "12345": fullItem() } },
        },
      },
    })
    const accountWide = parsed.Default?.["@player"]?.$AccountWide
    expect(accountWide?.items?.[12345]?.name).toBe("Ring of the Pale Order")
  })
})
