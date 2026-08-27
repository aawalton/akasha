import { describe, expect, it } from "bun:test"
import { requireAt } from "../../../shared/utils-narrow/src/require-at"
import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { makeItem as makeBaseItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import { resolveItemRoute } from "./inventory-management-plan-route"
import { stepsForActor } from "./inventory-management-plan-route-actor"

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

function makeBackpackEntry(sourceCharId: string, item: InventoryItemData): AffectedItem {
  return {
    item,
    locationKey: sourceCharId,
    locationDisplayName: `Char ${sourceCharId}`,
    bagId: 1,
    alreadyAtDestination: false,
  }
}

describe("cross-char vendor routing contract + stepsForActor projection", () => {
  const SOURCE = "1000"
  const TARGET = "2000"

  it("routes cross-char list through bank: deposit@source, retrieve@target/bank, act@target/guild-store", () => {
    const entry = makeBackpackEntry(SOURCE, makeItem())
    const steps = resolveItemRoute(entry, "list", "character:2000", null)

    expect(steps).toHaveLength(3)

    const deposit = requireAt(steps, 0)
    const retrieve = requireAt(steps, 1)
    const act = requireAt(steps, 2)
    expect(deposit.operation).toBe("deposit")
    expect(deposit.characterId).toBe(SOURCE)
    expect(deposit.venue).toBe("bank")

    expect(retrieve.operation).toBe("retrieve")
    expect(retrieve.characterId).toBe(TARGET)
    expect(retrieve.venue).toBe("bank")

    expect(act.operation).toBe("act")
    expect(act.characterId).toBe(TARGET)
    expect(act.venue).toBe("guild-store")
  })

  it("projects cross-char list steps to the right actor+venue slices", () => {
    const entry = makeBackpackEntry(SOURCE, makeItem())
    const steps = resolveItemRoute(entry, "list", "character:2000", null)

    const sourceBank = stepsForActor(steps, SOURCE, "bank")
    expect(sourceBank).toHaveLength(1)
    expect(sourceBank[0]?.operation).toBe("deposit")

    const targetBank = stepsForActor(steps, TARGET, "bank")
    expect(targetBank).toHaveLength(1)
    expect(targetBank[0]?.operation).toBe("retrieve")

    const targetStore = stepsForActor(steps, TARGET, "guild-store")
    expect(targetStore).toHaveLength(1)
    expect(targetStore[0]?.operation).toBe("act")

    expect(stepsForActor(steps, SOURCE, "guild-store")).toEqual([])
  })

  it("routes same-char list as a single act@guild-store with no bank hop", () => {
    const entry = makeBackpackEntry(SOURCE, makeItem())
    const steps = resolveItemRoute(entry, "list", undefined, null)

    expect(steps).toHaveLength(1)
    const act = requireAt(steps, 0)
    expect(act.operation).toBe("act")
    expect(act.characterId).toBe(SOURCE)
    expect(act.venue).toBe("guild-store")

    expect(steps.some((s) => s.operation === "deposit")).toBe(false)
    expect(steps.some((s) => s.operation === "retrieve")).toBe(false)
  })

  it("routes cross-char fence-sell of a stolen item: deposit@source, retrieve@target/bank, act@target/fence", () => {
    const entry = makeBackpackEntry(SOURCE, makeItem({ stolen: true }))
    const steps = resolveItemRoute(entry, "fence-sell", "character:2000", null)

    expect(steps).toHaveLength(3)
    const deposit = requireAt(steps, 0)
    const retrieve = requireAt(steps, 1)
    const act = requireAt(steps, 2)

    expect(deposit.operation).toBe("deposit")
    expect(deposit.characterId).toBe(SOURCE)
    expect(deposit.venue).toBe("bank")

    expect(retrieve.operation).toBe("retrieve")
    expect(retrieve.characterId).toBe(TARGET)
    expect(retrieve.venue).toBe("bank")

    expect(act.operation).toBe("act")
    expect(act.characterId).toBe(TARGET)
    expect(act.venue).toBe("fence")
  })
})
