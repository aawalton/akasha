import { describe, expect, test } from "bun:test"
import {
  backpackSlotsFor,
  mergeCarrierHandoffs,
} from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-route-steps/inventory-management-plan-route-steps.module.code.ts"
import type {
  PlanItem,
  RouteStep,
} from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"

const ERIN = "8796093022338107"

const CERIA = "8796093045974297"

const MRSHA = "8796093045974298"

const CHEST = "HouseBank:5462:4674"

function elixir(stackCount: number): PlanItem {
  return {
    itemId: 64710,
    itemName: "Gold Coast Swift Survivor Elixir",
    stackCount,
    maxStackSize: 200,
    quality: 3,
    action: "stock",
  }
}

function handOff(target: string, units: number): readonly RouteStep[] {
  const item = elixir(units)
  return [
    {
      characterId: ERIN,
      venue: "house-storage",
      storageKey: CHEST,
      operation: "retrieve",
      item,
      itemId: item.itemId,
    },
    {
      characterId: ERIN,
      venue: "bank",
      storageKey: "Bank",
      operation: "deposit",
      item,
      itemId: item.itemId,
    },
    {
      characterId: target,
      venue: "bank",
      storageKey: "Bank",
      operation: "retrieve",
      item,
      itemId: item.itemId,
    },
  ]
}

describe("The carrier carries every hand-off of one stack out of a chest in one leg.", () => {
  test("two characters' shares of one stack are one withdrawal and one deposit for the carrier", () => {
    const merged = mergeCarrierHandoffs([handOff(CERIA, 20), handOff(MRSHA, 15)])
    expect(
      merged.map((route) =>
        route.map((one) => [one.characterId, one.venue, one.operation, one.item.stackCount])
      )
    ).toEqual([
      [
        [ERIN, "house-storage", "retrieve", 35],
        [ERIN, "bank", "deposit", 35],
      ],
      [[CERIA, "bank", "retrieve", 20]],
      [[MRSHA, "bank", "retrieve", 15]],
    ])
  })

  test("a route the carrier walks alone is left as it is", () => {
    const own = handOff(ERIN, 20).slice(0, 1)
    expect(mergeCarrierHandoffs([own])).toEqual([own])
  })
})

describe("A stackable step takes one backpack slot for each full stack it moves.", () => {
  test("units of one item share slots up to the item's stack size", () => {
    expect(backpackSlotsFor(elixir(1))).toBe(1)
    expect(backpackSlotsFor(elixir(200))).toBe(1)
    expect(backpackSlotsFor(elixir(1017))).toBe(6)
    expect(backpackSlotsFor({ ...elixir(1), maxStackSize: 1 })).toBe(1)
  })
})
