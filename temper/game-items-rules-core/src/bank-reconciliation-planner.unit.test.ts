import { describe, expect, it } from "bun:test"
import { planStockReconcile } from "./bank-reconciliation-planner"

describe("planStockReconcile — direction is the sign of (target − backpackCount)", () => {
  it("withdraws the deficit when below target and the open storage holds the group", () => {
    const plan = planStockReconcile({
      selfTarget: 200,
      backpackCount: 50,
      openTierCap: undefined,
      openTierStorageCount: 0,
      withdrawableFromOpen: 500,
    })
    expect(plan.direction).toBe("withdraw")
    expect(plan.count).toBe(150)
  })

  it("caps the withdrawal at what the open storage physically holds", () => {
    const plan = planStockReconcile({
      selfTarget: 200,
      backpackCount: 50,
      openTierCap: undefined,
      openTierStorageCount: 0,
      withdrawableFromOpen: 40,
    })
    expect(plan.direction).toBe("withdraw")
    expect(plan.count).toBe(40)
  })

  it("withdraws nothing (direction none) when below target but the open storage is empty", () => {
    const plan = planStockReconcile({
      selfTarget: 200,
      backpackCount: 50,
      openTierCap: undefined,
      openTierStorageCount: 0,
      withdrawableFromOpen: 0,
    })
    expect(plan.direction).toBe("none")
    expect(plan.count).toBe(0)
  })

  it("deposits the excess to an uncapped tier when above target", () => {
    const plan = planStockReconcile({
      selfTarget: 200,
      backpackCount: 260,
      openTierCap: undefined,
      openTierStorageCount: 0,
      withdrawableFromOpen: 0,
    })
    expect(plan.direction).toBe("deposit")
    expect(plan.count).toBe(60)
  })

  it("clamps the deposit to the open tier's remaining account-wide capacity", () => {
    const plan = planStockReconcile({
      selfTarget: 5,
      backpackCount: 260,
      openTierCap: 200,
      openTierStorageCount: 190,
      withdrawableFromOpen: 0,
    })
    expect(plan.direction).toBe("deposit")
    expect(plan.count).toBe(10)
  })

  it("deposits nothing (direction none) when above target but the open tier is full", () => {
    const plan = planStockReconcile({
      selfTarget: 5,
      backpackCount: 260,
      openTierCap: 200,
      openTierStorageCount: 200,
      withdrawableFromOpen: 0,
    })
    expect(plan.direction).toBe("none")
    expect(plan.count).toBe(0)
  })

  it("is a fixpoint (none) exactly at target", () => {
    const plan = planStockReconcile({
      selfTarget: 200,
      backpackCount: 200,
      openTierCap: undefined,
      openTierStorageCount: 0,
      withdrawableFromOpen: 500,
    })
    expect(plan.direction).toBe("none")
    expect(plan.count).toBe(0)
  })

  it("deposits the whole backpack when the visiting character is ineligible (target 0)", () => {
    const plan = planStockReconcile({
      selfTarget: 0,
      backpackCount: 30,
      openTierCap: undefined,
      openTierStorageCount: 0,
      withdrawableFromOpen: 0,
    })
    expect(plan.direction).toBe("deposit")
    expect(plan.count).toBe(30)
  })
})
