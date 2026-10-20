import { expect, test } from "bun:test"
import type { ArmorTypeId } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-types/armor-types.module.code.ts"
import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { ArmorWeightId } from "akasha/temper/catalog/gear/equipment/modules/armor-weight-ids/armor-weight-ids.module.code.ts"
import { getArmorValue } from "akasha/temper/player/character/characters-equipment/modules/armor-weights/armor-weights.module.code.ts"
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

for (const [weight, quality, slot, resistance, reading] of LEVEL_ONE) {
  test(`a level-1 ${quality} ${weight} ${slot} adds the ${resistance} resistance Erin Solstice's reading ${reading} saw`, () => {
    expect(getArmorValue(slot, weight, quality, 1)).toBe(resistance)
  })
}
