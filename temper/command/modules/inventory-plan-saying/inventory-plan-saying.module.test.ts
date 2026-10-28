import { expect, test } from "bun:test"
import {
  housePlacementSaid,
  planSaid,
} from "akasha/temper/command/modules/inventory-plan-saying/inventory-plan-saying.module.code.ts"
import type { ManagementPlan } from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"

const LANTERN = {
  itemId: 94109,
  itemName: "Imperial Lantern, Wall",
  stackCount: 2,
  maxStackSize: 200,
  quality: 2,
  action: "move-to" as const,
}

test("a withdrawal from the vault and a placement in a house are said by their own words", () => {
  const plan: ManagementPlan = {
    sessions: [
      {
        characterId: "1",
        characterName: "Erin Solstice",
        venues: [
          {
            venue: "house-storage",
            label: "Furniture Vault",
            actionGroups: [
              { label: "Move", items: [{ ...LANTERN, note: "Withdraw" }], slotCount: 1 },
            ],
            slotCount: 1,
          },
          {
            venue: "house",
            label: "Fogbreak Lighthouse",
            actionGroups: [{ label: "Move", items: [{ ...LANTERN, note: "Place" }], slotCount: 1 }],
            slotCount: 1,
          },
        ],
        totalSlots: 2,
      },
    ],
    totalCharacterSwitches: 0,
    totalVenueVisits: 2,
    totalSlots: 2,
  }

  expect(planSaid(plan)).toEqual([
    "[TemperItems] Plan:",
    "  Furniture Vault — withdraw 1",
    "  Fogbreak Lighthouse — place 1",
  ])
})

test("the houses name each house to scan, each placement, and the slots freed and used", () => {
  const said = housePlacementSaid(
    {
      houseRuleIds: new Set(["lighting"]),
      housesToScan: [11172],
      placed: [{ collectibleId: 12732, stacks: 3, items: 5 }],
      vaultSlotsFreed: 3,
    },
    new Map([
      [11172, "Fogbreak Lighthouse"],
      [12732, "Grand Gallery of Tamriel"],
    ]),
    "Erin Solstice"
  )

  expect(said).toEqual([
    "[TemperItems] Houses:",
    "  Erin Solstice — scan Fogbreak Lighthouse first, entering it so its limits are read",
    "  Grand Gallery of Tamriel — place 3 stacks, 5 items",
    "  vault slots freed 3, house slots used 5",
  ])
})

test("a plan with no house rule says no house line", () => {
  const none = { houseRuleIds: new Set<string>(), housesToScan: [], placed: [], vaultSlotsFreed: 0 }
  expect(housePlacementSaid(none, new Map(), "Erin Solstice")).toEqual([])
})
