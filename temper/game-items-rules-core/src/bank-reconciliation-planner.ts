export interface StockReconcileSnapshot {
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

export function planStockReconcile(snap: StockReconcileSnapshot): StockReconcilePlan {
  const deficit = snap.selfTarget - snap.backpackCount
  if (deficit > 0) {
    const count = Math.max(0, Math.min(deficit, snap.withdrawableFromOpen))
    return count > 0 ? { direction: "withdraw", count } : NONE
  }

  const excess = snap.backpackCount - snap.selfTarget
  if (excess > 0) {
    let allowed = excess
    if (snap.openTierCap !== undefined) {
      const capRemaining = Math.max(0, snap.openTierCap - snap.openTierStorageCount)
      allowed = Math.min(allowed, capRemaining)
    }
    const count = Math.max(0, allowed)
    return count > 0 ? { direction: "deposit", count } : NONE
  }

  return NONE
}
