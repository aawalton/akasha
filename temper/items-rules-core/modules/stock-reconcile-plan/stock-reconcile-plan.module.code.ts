export interface StockReconcileCounts {
  readonly selfTarget: number
  readonly backpackCount: number
  readonly openTierCap: number | undefined
  readonly openTierStorageCount: number
  readonly withdrawableFromOpen: number
}

export type ReconcileDirection = "withdraw" | "deposit" | "none"

export interface StockReconcilePlan {
  readonly direction: ReconcileDirection
  readonly count: number
}

const NONE: StockReconcilePlan = { direction: "none", count: 0 }

export function planStockReconcile(held: StockReconcileCounts): StockReconcilePlan {
  const deficit = held.selfTarget - held.backpackCount
  if (deficit > 0) {
    const count = Math.max(0, Math.min(deficit, held.withdrawableFromOpen))
    return count > 0 ? { direction: "withdraw", count } : NONE
  }

  const excess = held.backpackCount - held.selfTarget
  if (excess > 0) {
    let allowed = excess
    if (held.openTierCap !== undefined) {
      const capRemaining = Math.max(0, held.openTierCap - held.openTierStorageCount)
      allowed = Math.min(allowed, capRemaining)
    }
    const count = Math.max(0, allowed)
    return count > 0 ? { direction: "deposit", count } : NONE
  }

  return NONE
}
