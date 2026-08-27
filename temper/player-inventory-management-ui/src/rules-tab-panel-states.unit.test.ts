import { describe, expect, test } from "bun:test"
import {
  decideManagementPlanPanelState,
  decideUnmappedItemsPanelState,
} from "./rules-tab-panel-states"

describe("decideUnmappedItemsPanelState", () => {
  test("read in flight → loading, not an empty-coverage answer", () => {
    expect(
      decideUnmappedItemsPanelState({
        isInventoryLoading: true,
        hasInventory: false,
        visibleCount: 0,
        totalCount: 0,
      })
    ).toBe("loading")
  })

  test("REGRESSION: settled with no inventory → no-inventory, never all-covered", () => {
    expect(
      decideUnmappedItemsPanelState({
        isInventoryLoading: false,
        hasInventory: false,
        visibleCount: 0,
        totalCount: 0,
      })
    ).toBe("no-inventory")
  })

  test("REGRESSION: location filter excludes every unmapped item → hidden-by-filter", () => {
    expect(
      decideUnmappedItemsPanelState({
        isInventoryLoading: false,
        hasInventory: true,
        visibleCount: 0,
        totalCount: 7,
      })
    ).toBe("hidden-by-filter")
  })

  test("inventory present and nothing unmapped → all-covered", () => {
    expect(
      decideUnmappedItemsPanelState({
        isInventoryLoading: false,
        hasInventory: true,
        visibleCount: 0,
        totalCount: 0,
      })
    ).toBe("all-covered")
  })

  test("visible items outrank every empty branch", () => {
    expect(
      decideUnmappedItemsPanelState({
        isInventoryLoading: true,
        hasInventory: false,
        visibleCount: 3,
        totalCount: 3,
      })
    ).toBe("items")
  })
})

describe("decideManagementPlanPanelState", () => {
  test("read in flight → loading, not an empty-plan answer", () => {
    expect(
      decideManagementPlanPanelState({
        isInventoryLoading: true,
        hasInventory: false,
        sessionCount: 0,
      })
    ).toBe("loading")
  })

  test("REGRESSION: settled with no inventory → no-inventory, never no-actions", () => {
    expect(
      decideManagementPlanPanelState({
        isInventoryLoading: false,
        hasInventory: false,
        sessionCount: 0,
      })
    ).toBe("no-inventory")
  })

  test("inventory present and the plan is empty → no-actions", () => {
    expect(
      decideManagementPlanPanelState({
        isInventoryLoading: false,
        hasInventory: true,
        sessionCount: 0,
      })
    ).toBe("no-actions")
  })

  test("sessions outrank every empty branch", () => {
    expect(
      decideManagementPlanPanelState({
        isInventoryLoading: true,
        hasInventory: false,
        sessionCount: 2,
      })
    ).toBe("plan")
  })
})
