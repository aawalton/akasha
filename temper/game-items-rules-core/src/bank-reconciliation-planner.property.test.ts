import { describe, expect, it } from "bun:test"
import fc from "fast-check"
import { planStockReconcile, type StockReconcileSnapshot } from "./bank-reconciliation-planner"

const snapshotArb: fc.Arbitrary<StockReconcileSnapshot> = fc.record({
  selfTarget: fc.integer({ min: 0, max: 200 }),
  backpackCount: fc.integer({ min: 0, max: 400 }),
  openTierCap: fc.option(fc.integer({ min: 0, max: 200 }), { nil: undefined }),
  openTierStorageCount: fc.integer({ min: 0, max: 200 }),
  withdrawableFromOpen: fc.integer({ min: 0, max: 400 }),
})

describe("planStockReconcile — signed-diff invariants", () => {
  it("emits at most one direction, equal to sign(target − backpackCount) when a move is emitted", () => {
    fc.assert(
      fc.property(snapshotArb, (snap) => {
        const plan = planStockReconcile(snap)
        if (plan.direction === "none") {
          expect(plan.count).toBe(0)
          return
        }
        expect(plan.count).toBeGreaterThan(0)
        if (plan.direction === "withdraw") expect(snap.backpackCount).toBeLessThan(snap.selfTarget)
        if (plan.direction === "deposit")
          expect(snap.backpackCount).toBeGreaterThan(snap.selfTarget)
      })
    )
  })

  it("never overshoots the target", () => {
    fc.assert(
      fc.property(snapshotArb, (snap) => {
        const plan = planStockReconcile(snap)
        const next =
          plan.direction === "withdraw"
            ? snap.backpackCount + plan.count
            : plan.direction === "deposit"
              ? snap.backpackCount - plan.count
              : snap.backpackCount
        if (plan.direction === "withdraw") expect(next).toBeLessThanOrEqual(snap.selfTarget)
        if (plan.direction === "deposit") expect(next).toBeGreaterThanOrEqual(snap.selfTarget)
      })
    )
  })

  it("every emitted move strictly reduces |backpackCount − target|", () => {
    fc.assert(
      fc.property(snapshotArb, (snap) => {
        const plan = planStockReconcile(snap)
        if (plan.direction === "none") return
        const before = Math.abs(snap.backpackCount - snap.selfTarget)
        const next =
          plan.direction === "withdraw"
            ? snap.backpackCount + plan.count
            : snap.backpackCount - plan.count
        const after = Math.abs(next - snap.selfTarget)
        expect(after).toBeLessThan(before)
      })
    )
  })

  it("is idempotent at the target (none, zero count)", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 200 }),
        fc.option(fc.integer({ min: 0, max: 200 }), { nil: undefined }),
        fc.integer({ min: 0, max: 200 }),
        fc.integer({ min: 0, max: 400 }),
        (target, cap, storageCount, withdrawable) => {
          const plan = planStockReconcile({
            selfTarget: target,
            backpackCount: target,
            openTierCap: cap,
            openTierStorageCount: storageCount,
            withdrawableFromOpen: withdrawable,
          })
          expect(plan.direction).toBe("none")
          expect(plan.count).toBe(0)
        }
      )
    )
  })
})

describe("planStockReconcile — closed-loop convergence (no 2-cycle)", () => {
  it("reaches the target in finite sweeps against a stocked sink, never reversing direction", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 200 }),
        fc.integer({ min: 0, max: 400 }),
        fc.integer({ min: 200, max: 1000 }),
        (target, startBackpack, sinkStart) => {
          let backpack = startBackpack
          let sink = sinkStart
          let prevDirection: "withdraw" | "deposit" | "none" = "none"
          let prevDistance = Math.abs(backpack - target)

          for (let sweep = 0; sweep < 1000; sweep++) {
            const plan = planStockReconcile({
              selfTarget: target,
              backpackCount: backpack,
              openTierCap: undefined,
              openTierStorageCount: 0,
              withdrawableFromOpen: sink,
            })
            if (plan.direction === "none") break

            if (prevDirection !== "none") expect(plan.direction).toBe(prevDirection)
            prevDirection = plan.direction

            if (plan.direction === "withdraw") {
              backpack += plan.count
              sink -= plan.count
            } else {
              backpack -= plan.count
              sink += plan.count
            }

            const distance = Math.abs(backpack - target)
            expect(distance).toBeLessThan(prevDistance)
            prevDistance = distance
          }

          expect(backpack).toBe(target)
        }
      )
    )
  })
})
