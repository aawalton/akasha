import { expect, test } from "bun:test"
import { temperLocationType } from "akasha/temper/catalog/world/temper-location-type/temper-location-type.page-type.ts"
import {
  groupInventoryByLocation,
  ownValuesOf,
} from "akasha/temper/items/core/modules/inventory-grouping/inventory-grouping.module.code.ts"
import type { InventoryItemData } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import { holdKeyedTitlesFromCheckout } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.test-fixtures.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()

const MACE: InventoryItemData = {
  itemId: 141443,
  itemName: "Savage Werewolf's Mace",
  itemLink: "|H1:item:141443:364:50:26587:370:50:2:46:0:0:0:0:0:0:2049:78:0:1:0:399:0|h|h",
  quality: 5,
  filterType: 1,
  itemType: 1,
  traitType: 2,
  requiredLevel: 50,
  requiredCP: 160,
  stackCount: 1,
}

test("a slot read before its link's own values were captured still gives its level and CP", () => {
  expect(ownValuesOf(MACE)).toEqual({ requiredLevel: 50, requiredCp: 160, merchantValue: 0 })
})

test("a slot's own link values reach the tooltip, its trait type going with its trait text", () => {
  const bonuses = [{ numRequired: 2, description: "Adds 1096 Max Stamina.", isPerfected: false }]
  expect(
    ownValuesOf({
      ...MACE,
      merchantValue: 26,
      weaponPower: 1335,
      traitDescription: "Increases Enchantment charges.",
      abilityHeader: "Use",
      abilityDescription: "Restores Health.",
      setBonuses: bonuses,
    })
  ).toEqual({
    requiredLevel: 50,
    requiredCp: 160,
    merchantValue: 26,
    weaponPower: 1335,
    traitType: 2,
    traitDescription: "Increases Enchantment charges.",
    hasOnUseAbility: true,
    abilityHeader: "Use",
    abilityDescription: "Restores Health.",
    abilityCooldown: 0,
    setBonuses: bonuses,
  })
})

test("a slot with no sell value recorded sells for nothing, rather than for the bare item's value", () => {
  expect(ownValuesOf({ ...MACE, requiredLevel: 0, requiredCP: 0 })).toEqual({ merchantValue: 0 })
})

test("a location a page names is shown by that page's title, and any other by its captured name", () => {
  const places = holdKeyedTitlesFromCheckout(temperLocationType.slug)
  const venues = holdKeyedTitlesFromCheckout(temperVenue.slug)
  const renamed = { ...places, titles: new Map([...places.titles, ["craftbag", "Renamed Bag"]]) }
  const at = (displayName: string) => ({ displayName, lastScanned: 0, bags: { 1: { 1: MACE } } })
  const summary = groupInventoryByLocation(
    {
      locations: { CraftBag: at("Crafting Bag"), FurnitureVault: at("stale"), Bank: at("Bank") },
      meta: { displayName: "", worldName: "", lastFullScan: 0 },
    },
    renamed,
    venues
  )
  const names = new Map(summary.groups.map((one) => [one.locationKey, one.displayName]))
  expect(names.get("CraftBag")).toBe("Renamed Bag")
  expect(names.get("FurnitureVault")).toBe(venues.titles.get("furniture-vault"))
  expect(names.get("Bank")).toBe("Bank")
})

test("a slot whose own link has no trait gives no trait text, rather than the bare item's", () => {
  expect(ownValuesOf({ ...MACE, traitType: 0 })).toEqual({
    requiredLevel: 50,
    requiredCp: 160,
    merchantValue: 0,
    traitType: 0,
    traitDescription: "",
  })
})
