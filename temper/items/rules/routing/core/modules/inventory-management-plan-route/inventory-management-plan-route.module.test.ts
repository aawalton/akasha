import { describe, expect, test } from "bun:test"
import { makeContext } from "akasha/temper/items/rules/core/test-fixtures/inventory-rule-test-utils/inventory-rule-test-utils.test-fixture.code.ts"
import { resolveItemRoute } from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-route/inventory-management-plan-route.module.code.ts"
import type { RouteStep } from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"
import {
  makeAffected,
  makeInventory,
  makeItem,
  makeLocation,
} from "akasha/temper/items/rules/routing/test-fixtures/inventory-management-plan-test-utils/inventory-management-plan-test-utils.test-fixture.code.ts"

const ERIN = "8796093022338107"

const CERIA = "8796093045974297"

const WEALTH = "HouseBank:5462:4676"

const GUILD = "Walton Mountain"

const HOUSE_BANK_BAG = 10

const holdings = makeInventory(
  {
    [WEALTH]: makeLocation("Wealth", {}),
    [GUILD]: makeLocation(GUILD, {}),
    Bank: makeLocation("Bank", {}),
  },
  { [CERIA]: { displayName: "Ceria Springwater" }, [ERIN]: { displayName: "Erin Solstice" } }
)

const context = makeContext({}, [ERIN, CERIA])

function stops(steps: readonly RouteStep[]): readonly (readonly string[])[] {
  return steps.map((one) => [one.characterId, one.venue, one.operation])
}

describe("An item leaving shared storage for another storage is carried by the storage carrier.", () => {
  test("a mythic leaving a house chest for the bank is withdrawn and banked by the carrier", () => {
    const entry = makeAffected(makeItem("Gaze of Sithis", 6), WEALTH, "Wealth", HOUSE_BANK_BAG)
    expect(stops(resolveItemRoute(entry, "move-to", "bank", holdings, context))).toEqual([
      [ERIN, "house-storage", "retrieve"],
      [ERIN, "bank", "act"],
    ])
  })

  test("an item leaving a guild bank for the bank is carried by the carrier", () => {
    const entry = makeAffected(makeItem("Uncracked Geode", 1), GUILD, GUILD)
    expect(stops(resolveItemRoute(entry, "move-to", "bank", holdings, context))).toEqual([
      [ERIN, "guild-bank", "retrieve"],
      [ERIN, "bank", "act"],
    ])
  })

  test("an item a character carries is banked by that character", () => {
    const entry = makeAffected(makeItem("Gaze of Sithis", 6), CERIA, "Ceria Springwater")
    expect(stops(resolveItemRoute(entry, "move-to", "bank", holdings, context))).toEqual([
      [CERIA, "bank", "act"],
    ])
  })
})

describe("An item taken from storage to a venue goes to the first character the reading lists.", () => {
  test("a treasure leaving a house chest to be sold is withdrawn by that character", () => {
    const entry = makeAffected(makeItem("Dragon's Treasure", 4), WEALTH, "Wealth", HOUSE_BANK_BAG)
    expect(stops(resolveItemRoute(entry, "sell", undefined, holdings, context))).toEqual([
      [CERIA, "house-storage", "retrieve"],
      [CERIA, "vendor", "act"],
    ])
  })
})
