import "./test-eso-load-globals"

import { describe, expect, test } from "bun:test"

import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { makeItem as makeBaseItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import type {
  ItemAction,
  MoveToDestination,
} from "@temper/game-items-rules-core/inventory-rule-types"
import { resolveItemRoute } from "@temper/game-items-rules-routing-core/inventory-management-plan-route"
import { stepsForActor } from "@temper/game-items-rules-routing-core/inventory-management-plan-route-actor"
import { type RouteStep, type VenueType } from "@temper/game-items-rules-routing-core/inventory-management-plan-types"
import { isVendorCrossCharDestination } from "./rules-cross-char"

const SELF = "1000"
const OTHER = "2000"

function setCurrentCharId(charId: string): undefined {
  Reflect.set(globalThis, "GetCurrentCharacterId", (): string => charId)
}
setCurrentCharId(SELF)

function makeItem(overrides: Partial<InventoryItemData> = {}): InventoryItemData {
  return makeBaseItem({
    itemId: 42,
    itemLink: "|H0:item:42|h|h",
    quality: 1,
    filterType: 0,
    itemType: 0,
    ...overrides,
  })
}

function makeBackpackEntry(item: InventoryItemData): AffectedItem {
  return {
    item,
    locationKey: SELF,
    locationDisplayName: `Char ${SELF}`,
    bagId: 1,
    alreadyAtDestination: false,
  }
}

function webRoutesThroughBank(steps: readonly RouteStep[]): boolean {
  return steps.some((s) => s.operation === "deposit")
}

function webActVenue(steps: readonly RouteStep[]): VenueType | undefined {
  return steps.find((s) => s.operation === "act")?.venue
}

const VENDOR_VENUE: Record<string, VenueType> = {
  list: "guild-store",
  sell: "vendor",
  "fence-sell": "fence",
  "fence-launder": "fence",
}

const VENDOR_ACTIONS: readonly ItemAction[] = ["list", "sell", "fence-sell", "fence-launder"]

const DESTINATIONS: readonly {
  label: string
  value: MoveToDestination | undefined
  crossChar: boolean
}[] = [
  { label: "undefined", value: undefined, crossChar: false },
  { label: "character:<self>", value: `character:${SELF}`, crossChar: false },
  { label: "character:<other>", value: `character:${OTHER}`, crossChar: true },
  { label: "bank (non-character)", value: "bank", crossChar: false },
]

function itemForAction(action: ItemAction): InventoryItemData {
  const stolen = action === "fence-sell" || action === "fence-launder"
  return makeItem({ stolen })
}

describe("routing-parity: addon cross-char predicate ≡ web bank-hop decision", () => {
  for (const action of VENDOR_ACTIONS) {
    for (const dest of DESTINATIONS) {
      test(`${action} @ ${dest.label}: addon predicate matches web bank-hop`, () => {
        const entry = makeBackpackEntry(itemForAction(action))
        const steps = resolveItemRoute(entry, action, dest.value, null)
        const webBankHop = webRoutesThroughBank(steps)

        const addonBankHop = isVendorCrossCharDestination(dest.value)

        expect(addonBankHop).toBe(webBankHop)

        expect(addonBankHop).toBe(dest.crossChar)

        if (dest.crossChar) {
          const expectedVenue = VENDOR_VENUE[action]
          expect(webActVenue(steps)).toBe(expectedVenue)

          const targetAct = stepsForActor(steps, OTHER, expectedVenue ?? "vendor")
          expect(targetAct).toHaveLength(1)
          expect(targetAct[0]?.operation).toBe("act")

          const sourceBank = stepsForActor(steps, SELF, "bank")
          expect(sourceBank).toHaveLength(1)
          expect(sourceBank[0]?.operation).toBe("deposit")
        } else {
          expect(steps.some((s) => s.operation === "deposit")).toBe(false)
        }
      })
    }
  }
})
