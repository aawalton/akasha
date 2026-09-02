import { describe, expect, it } from "bun:test"
import { rowToMinedItemData } from "@/lib/mined-item-rows"

const MINED_ITEM_DATA_KEYS = [
  "itemId",
  "name",
  "icon",
  "itemType",
  "specializedItemType",
  "equipType",
  "weaponType",
  "armorType",
  "weaponPower",
  "armorRating",
  "requiredLevel",
  "requiredCp",
  "value",
  "quality",
  "style",
  "filterType",
  "filterTypeSpecific",
  "isUnique",
  "isUniqueEquipped",
  "enchantHeader",
  "enchantDescription",
  "hasOnUseAbility",
  "abilityHeader",
  "abilityDescription",
  "abilityCooldown",
  "traitType",
  "traitDescription",
  "hasSet",
  "setId",
  "setName",
  "setMaxEquip",
  "setBonuses",
  "flavorText",
  "minedAt",
].sort()

const LEAKED_KEYS = ["userId", "id", "seq", "pageTypeId", "slug", "title"]

const ROW_FIELDS: Record<string, unknown> = {
  itemId: "12345",
  name: "Ring of the Wild Hunt",
  icon: "/esoui/art/icons/gear.dds",
  itemType: "1",
  specializedItemType: "2",
  equipType: "3",
  weaponType: "0",
  armorType: "0",
  weaponPower: "0",
  armorRating: "0",
  requiredLevel: "50",
  requiredCp: "160",
  value: "400",
  quality: "4",
  style: "7",
  filterType: "2",
  filterTypeSpecific: "5",
  isUnique: "false",
  isUniqueEquipped: "false",
  enchantHeader: "Enchantment",
  enchantDescription: "Adds 1096 Max Stamina",
  hasOnUseAbility: "false",
  abilityHeader: "",
  abilityDescription: "",
  abilityCooldown: "0",
  traitType: "26",
  traitDescription: "Arcane",
  hasSet: "true",
  setId: "388",
  setName: "Ring of the Wild Hunt",
  setMaxEquip: "1",
  flavorText: "",
  userId: "00000000-0000-0000-0000-000000000000",
  id: "page-uuid-abc",
  seq: "42",
  pageTypeId: "type-uuid-xyz",
  slug: "12345",
  title: "Ring of the Wild Hunt",
}

function makeRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return { ...ROW_FIELDS, minedAt: "1700000000000", ...overrides }
}

describe("rowToMinedItemData — data-floor boundary (#15881)", () => {
  it("emits exactly the MinedItemData keys — never internal page columns", () => {
    const result = rowToMinedItemData(makeRow())
    expect(Object.keys(result).sort()).toEqual(MINED_ITEM_DATA_KEYS)
  })

  it("drops every internal column the row carries", () => {
    const keys = Object.keys(rowToMinedItemData(makeRow()))
    for (const leaked of LEAKED_KEYS) {
      expect(keys).not.toContain(leaked)
    }
  })

  it("never leaks the uploader userId, even a real one", () => {
    const result = rowToMinedItemData(makeRow({ userId: "alan-real-account-uuid" }))
    expect(Object.keys(result)).not.toContain("userId")
    expect(Object.values(result)).not.toContain("alan-real-account-uuid")
  })

  it("reads a number, a flag and a list back out of the text they stand as", () => {
    const result = rowToMinedItemData(
      makeRow({
        setBonuses: [
          '{"numRequired":2,"description":"Adds 1 Weapon Damage","isPerfected":false}',
          '{"numRequired":5,"description":"Adds 1 Critical Chance","isPerfected":true}',
        ],
      })
    )
    expect(result.itemId).toBe(12345)
    expect(result.hasSet).toBe(true)
    expect(result.isUnique).toBe(false)
    expect(result.setBonuses).toEqual([
      { numRequired: 2, description: "Adds 1 Weapon Damage", isPerfected: false },
      { numRequired: 5, description: "Adds 1 Critical Chance", isPerfected: true },
    ])
  })

  it("reports no set bonuses where the row carries none", () => {
    expect(rowToMinedItemData(makeRow()).setBonuses).toBeNull()
  })

  describe("minedAt parse guard (#15881)", () => {
    it("returns a valid ISO string for a numeric epoch", () => {
      const result = rowToMinedItemData(makeRow({ minedAt: "1700000000000" }))
      expect(result.minedAt).toBe(new Date(1_700_000_000_000).toISOString())
    })

    it("does not throw and yields '' when minedAt is missing", () => {
      const row = { ...ROW_FIELDS }
      expect(() => rowToMinedItemData(row)).not.toThrow()
      expect(rowToMinedItemData(row).minedAt).toBe("")
    })

    it("does not throw and yields '' when minedAt is non-numeric", () => {
      const row = makeRow({ minedAt: "not-a-timestamp" })
      expect(() => rowToMinedItemData(row)).not.toThrow()
      expect(rowToMinedItemData(row).minedAt).toBe("")
    })
  })
})
