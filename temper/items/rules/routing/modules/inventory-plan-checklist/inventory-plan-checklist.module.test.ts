import { expect, test } from "bun:test"
import type { ManagementPlan } from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"
import { formatPlanChecklist } from "akasha/temper/items/rules/routing/modules/inventory-plan-checklist/inventory-plan-checklist.module.code.ts"

const GEMS = {
  itemId: 33271,
  itemName: "Soul Gem (Empty)",
  stackCount: 14998,
  maxStackSize: 200,
  quality: 1,
  action: "fill",
} as const

test("every count a checklist says is a count of stacks, and its total is called stacks", () => {
  const plan: ManagementPlan = {
    sessions: [
      {
        characterId: "1",
        characterName: "Belavierr",
        venues: [
          {
            venue: "bank",
            label: "Bank",
            actionGroups: [{ label: "Withdraw", items: [GEMS], slotCount: 75 }],
            slotCount: 75,
          },
          {
            venue: "backpack",
            label: "Backpack",
            actionGroups: [{ label: "Fill", items: [GEMS], slotCount: 75 }],
            slotCount: 75,
          },
        ],
        totalSlots: 150,
      },
    ],
    totalCharacterSwitches: 0,
    totalVenueVisits: 2,
    totalSlots: 150,
  }

  expect(formatPlanChecklist(plan).split("\n")).toEqual([
    "[TemperItems] Checklist",
    "1 login · 2 stops · 150 stacks",
    "",
    "[ ] 1. Belavierr",
    "    [ ] Bank — Withdraw 75",
    "    [ ] Backpack — Fill 75",
    "",
  ])
})
