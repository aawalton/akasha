import { expect, test } from "bun:test"
import type { ArmorTypeId } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-types/armor-types.module.code.ts"
import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { ArmorWeightId } from "akasha/temper/catalog/gear/equipment/modules/armor-weight-ids/armor-weight-ids.module.code.ts"
import { getArmorValue } from "akasha/temper/player/character/characters-equipment/modules/armor-weights/armor-weights.module.code.ts"
import type { ItemLevel } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()

type Case = readonly [ArmorWeightId, EquipmentQualityId, ArmorTypeId, number, string]

const LEVEL_ONE: readonly Case[] = [
  ["medium", "normal", "head", 59, "01a155cc-9d70-7230-a7d4-997842cfd41a"],
  ["medium", "normal", "shoulders", 59, "01a155cb-74c7-7758-9b82-d195505e1e24"],
  ["medium", "normal", "chest", 68, "01a155cc-b754-7d5c-982e-ee091efd2a77"],
  ["medium", "normal", "waist", 25, "01a155cb-d697-7d8d-bc9e-5ccf5484e878"],
  ["medium", "normal", "legs", 59, "01a155cc-8279-70ed-9f44-ca7ace298368"],
  ["medium", "normal", "feet", 59, "01a155cb-f0af-7ac1-8057-355594510d7b"],
  ["medium", "normal", "hands", 34, "01a155cc-68cc-7bc0-ad92-89f3578f76d4"],
  ["light", "normal", "waist", 19, "01a15a4d-3efd-777a-9874-70934b32d76b"],
  ["light", "fine", "head", 87, "01a15627-1846-7fd0-95fc-a5a11fc82aeb"],
  ["light", "fine", "shoulders", 87, "01a15626-e46d-7491-873a-266252f2c82e"],
  ["light", "fine", "chest", 100, "01a15627-2655-7ce0-8673-cb1f800f5f5d"],
  ["light", "fine", "waist", 37, "01a15627-3623-771d-943f-ac06a29af8f7"],
  ["light", "fine", "legs", 87, "01a1563a-dabb-7b19-a1fc-651fb43b53e1"],
  ["light", "fine", "feet", 87, "01a15627-500c-78c3-9efb-57ef0a8d9cd4"],
  ["light", "fine", "hands", 50, "01a15626-fe4a-7585-b3e4-efb264f993aa"],
  ["heavy", "superior", "head", 241, "01a1562a-232a-7def-828a-98b9ec78ce7a"],
  ["heavy", "superior", "shoulders", 241, "01a15629-f9f7-78b2-a274-ee131a668649"],
  ["heavy", "superior", "chest", 276, "01a1562a-652a-7861-a48a-b877dcc8f9f4"],
  ["heavy", "superior", "waist", 103, "01a15629-ebb7-76e5-abb7-84c2cf86cea8"],
  ["heavy", "superior", "legs", 241, "01a1562a-1519-7a97-88cf-388c3646a18d"],
  ["heavy", "superior", "feet", 241, "01a1562a-4b5f-7665-bbeb-2d61573e9816"],
  ["heavy", "superior", "hands", 138, "01a1562a-3d2e-7d3a-9386-40ab103d4e60"],
  ["shield", "normal", "shield", 40, "01a155cd-f99c-7146-9c6b-a56817ee0a5b"],
  ["shield", "fine", "shield", 100, "01a15625-eb42-78d6-8c57-0d3c554853b6"],
  ["shield", "superior", "shield", 160, "01a1563a-0fad-74b7-8514-343e58339d60"],
]

const LEVEL_ONE_SASH_SHEET = 31628

const LEVEL_ONE_SASH = 19

const NORMAL_LIGHT_SASHES: readonly (readonly [ItemLevel, number, string])[] = [
  [16, 31730, "01a15a58-3b6c-7951-aca0-d0953e2e8ef3"],
  [26, 31790, "01a15a50-f953-7871-88c0-0fb050422a4f"],
  [36, 31850, "01a15a58-a195-7ae5-b4d0-ed54368faa3f"],
  [46, 31910, "01a15a51-11ce-7827-bc89-6558100d1a64"],
  ["CP10", 31934, "01a15a51-3581-74a4-9400-b560dc53b742"],
  ["CP40", 31964, "01a15a51-2991-7a54-818f-342f6429bf39"],
  ["CP70", 31988, "01a15a51-5d03-7b93-b6a4-cee8928bd96f"],
  ["CP90", 32006, "01a15a51-511b-71a0-a79b-58dc767edea7"],
  ["CP150", 32060, "01a15a50-24ab-749b-9cad-719163cc72a0"],
  ["CP160", 32066, "01a15a50-e9c6-74f5-8d2f-269df5e0648a"],
]

for (const [level, sheet, reading] of NORMAL_LIGHT_SASHES) {
  test(`a ${level} normal light sash reads ${sheet} Physical Resistance in Erin Solstice's reading ${reading}, against ${LEVEL_ONE_SASH_SHEET} with the level-1 sash`, () => {
    expect(getArmorValue("waist", "light", "normal", level)).toBe(
      LEVEL_ONE_SASH + sheet - LEVEL_ONE_SASH_SHEET
    )
  })
}

const LEVEL_ONE_CHEST_SHEET = 28912

const LEVEL_ONE_CHEST = 84

const NORMAL_HEAVY_CHESTS: readonly (readonly [ItemLevel, number, string])[] = [
  [16, 29456, "01a15a59-359d-7dfd-b7e4-cb2ec3f505ca"],
  [26, 29776, "01a15a59-d79a-7098-b394-db25c2dad764"],
  [36, 30096, "01a15a5a-68dc-7750-b3b4-a6e255c6b7ae"],
  [46, 30416, "01a15a5a-445e-7e86-bca0-27bc8e6a38e2"],
  ["CP10", 30544, "01a15a5a-85b3-70d5-9989-ac22a77fb4b4"],
  ["CP40", 30704, "01a15a5a-23ab-727a-81fe-d55152c98ade"],
  ["CP70", 30832, "01a15a59-aafa-7571-bd0c-532c8f87328f"],
  ["CP90", 30928, "01a15a59-0584-7094-b660-16b333ff82c3"],
  ["CP150", 31216, "01a15a59-61df-750b-95f8-857cd3059831"],
  ["CP160", 31248, "01a15a59-8648-755f-aa1c-337642df9048"],
]

test(`a level-1 normal heavy chest adds ${LEVEL_ONE_CHEST}, read ${LEVEL_ONE_CHEST_SHEET} in Erin Solstice's reading 01a15a59-fb96-7ff9-a498-06da85882ab9`, () => {
  expect(getArmorValue("chest", "heavy", "normal", 1)).toBe(LEVEL_ONE_CHEST)
})

for (const [level, sheet, reading] of NORMAL_HEAVY_CHESTS) {
  test(`a ${level} normal heavy chest reads ${sheet} Physical Resistance in Erin Solstice's reading ${reading}, against ${LEVEL_ONE_CHEST_SHEET} with the level-1 chest`, () => {
    expect(getArmorValue("chest", "heavy", "normal", level)).toBe(
      LEVEL_ONE_CHEST + sheet - LEVEL_ONE_CHEST_SHEET
    )
  })
}

for (const [weight, quality, slot, resistance, reading] of LEVEL_ONE) {
  test(`a level-1 ${quality} ${weight} ${slot} adds the ${resistance} resistance Erin Solstice's reading ${reading} saw`, () => {
    expect(getArmorValue(slot, weight, quality, 1)).toBe(resistance)
  })
}
