import { expect, test } from "bun:test"
import type {
  InventoryItemData,
  InventoryLocationData,
} from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { AffectedItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import { placeInHouses } from "akasha/temper/items/rules/routing/modules/inventory-management-plan-house-placement/inventory-management-plan-house-placement.module.code.ts"
import {
  makeInventory,
  makeItem,
  makeLocation,
} from "akasha/temper/items/rules/routing/test-fixtures/inventory-management-plan-test-utils/inventory-management-plan-test-utils.test-fixture.code.ts"

const VAULT_BAG = 18

const GALLERY = 12732

const ALPINE = 8353

function houseAt(collectibleId: number, room: number, specialRoom = 0): InventoryLocationData {
  const location = makeLocation(`House ${collectibleId}`, {})
  location.house = {
    collectibleId,
    houseId: collectibleId,
    furnishingLimits: {
      0: { limit: 700, placed: 700 - room },
      1: { limit: 100, placed: 100 - specialRoom },
    },
  }
  return location
}

function stack(name: string, units: number, furnishingLimitType = 0): InventoryItemData {
  return { ...makeItem(name), stackCount: units, furnishingLimitType }
}

function inVault(item: InventoryItemData): AffectedItem {
  return {
    item,
    locationKey: "FurnitureVault",
    locationDisplayName: "Furniture Vault",
    bagId: VAULT_BAG,
    alreadyAtDestination: true,
  }
}

function inBackpack(item: InventoryItemData): AffectedItem {
  return {
    item,
    locationKey: "1001",
    locationDisplayName: "Erin Solstice",
    bagId: 1,
    alreadyAtDestination: false,
  }
}

function houseRule(...houses: number[]): CompiledOrderedRule {
  return {
    id: "gallery",
    categoryId: "all",
    action: "move-to",
    destination: "furniture-vault",
    destinationChain: [
      ...houses.map((one) => ({ destination: `house:${one}` as const })),
      { destination: "furniture-vault" as const },
    ],
  }
}

test("the smallest stacks go to a house first and the largest stay in the vault", () => {
  const items = [stack("Six", 6), stack("One", 1), stack("Three", 3), stack("Other One", 1)]
  const map = new Map([["gallery", items.map(inVault)]])
  const inventory = makeInventory({ [`House:${GALLERY}`]: houseAt(GALLERY, 5) })
  const placement = placeInHouses([houseRule(GALLERY)], map, inventory)
  const chosen = (map.get("gallery") ?? []).map((one) => [one.item.itemName, one.destination])
  expect(chosen).toEqual([
    ["Six", "furniture-vault"],
    ["One", `house:${GALLERY}`],
    ["Three", `house:${GALLERY}`],
    ["Other One", `house:${GALLERY}`],
  ])
  expect(placement.vaultSlotsFreed).toBe(3)
  expect(placement.placed).toEqual([{ collectibleId: GALLERY, stacks: 3, items: 5 }])
})

test("a stack staying in the vault stays where it is", () => {
  const map = new Map([["gallery", [inVault(stack("Big", 50))]]])
  const inventory = makeInventory({ [`House:${GALLERY}`]: houseAt(GALLERY, 5) })
  placeInHouses([houseRule(GALLERY)], map, inventory)
  expect(map.get("gallery")?.[0]?.alreadyAtDestination).toBe(true)
})

test("a house too full for a stack hands it to the next house in the chain", () => {
  const map = new Map([["gallery", [inVault(stack("Pair", 2))]]])
  const inventory = makeInventory({
    [`House:${GALLERY}`]: houseAt(GALLERY, 1),
    [`House:${ALPINE}`]: houseAt(ALPINE, 10),
  })
  placeInHouses([houseRule(GALLERY, ALPINE)], map, inventory)
  expect(map.get("gallery")?.[0]?.destination).toBe(`house:${ALPINE}`)
})

test("a house never scanned takes nothing and is named to scan first", () => {
  const map = new Map([["gallery", [inVault(stack("One", 1))]]])
  const placement = placeInHouses([houseRule(GALLERY)], map, makeInventory({}))
  expect(placement.housesToScan).toEqual([GALLERY])
  expect(map.get("gallery")?.[0]?.destination).toBe("furniture-vault")
  expect(map.get("gallery")?.[0]?.alreadyAtDestination).toBe(true)
})

test("a carried furnishing no house takes is bound for the vault", () => {
  const map = new Map([["gallery", [inBackpack(stack("One", 1))]]])
  placeInHouses([houseRule(GALLERY)], map, makeInventory({}))
  expect(map.get("gallery")?.[0]?.destination).toBe("furniture-vault")
  expect(map.get("gallery")?.[0]?.alreadyAtDestination).toBe(false)
})

test("a special furnishing takes room only under its own limit type", () => {
  const map = new Map([["gallery", [inVault(stack("Station", 1, 1))]]])
  const inventory = makeInventory({ [`House:${GALLERY}`]: houseAt(GALLERY, 50, 0) })
  placeInHouses([houseRule(GALLERY)], map, inventory)
  expect(map.get("gallery")?.[0]?.destination).toBe("furniture-vault")
})
