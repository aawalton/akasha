const pendingUseDeposits = new LuaMap<
  number,
  readonly { readonly charId: string; readonly qty: number }[]
>()

function pendingKey(bagId: number, slotIndex: number): number {
  return bagId * 100000 + slotIndex
}

export function setPendingUseDeposits(
  bagId: number,
  slotIndex: number,
  deposits: readonly { readonly charId: string; readonly qty: number }[]
): undefined {
  pendingUseDeposits.set(pendingKey(bagId, slotIndex), deposits)
}

export function getPendingUseDeposits(
  bagId: number,
  slotIndex: number
): readonly { readonly charId: string; readonly qty: number }[] | undefined {
  return pendingUseDeposits.get(pendingKey(bagId, slotIndex))
}

export function clearPendingUseDeposits(bagId: number, slotIndex: number): undefined {
  pendingUseDeposits.delete(pendingKey(bagId, slotIndex))
}

export function clearAllPendingUseDeposits(): undefined {
  for (const [key] of pendingUseDeposits) {
    pendingUseDeposits.delete(key)
  }
}

export function applyMultiCharAllocation(
  bagId: number,
  slotIndex: number,
  action: "use",
  allocation: {
    readonly currentCharQty: number
    readonly otherCharDeposits: readonly { readonly charId: string; readonly qty: number }[]
  },
  targetQuantity: number | undefined,
  stockScope: string | undefined,
  setPendingActionFn: (
    bagId: number,
    slotIndex: number,
    action: "use" | "stock",
    destination?: string,
    targetQuantity?: number,
    stockScope?: string
  ) => undefined
): undefined {
  const currentCharStr = tostring(GetCurrentCharacterId())
  if (allocation.currentCharQty > 0) {
    setPendingActionFn(
      bagId,
      slotIndex,
      action,
      `character:${currentCharStr}`,
      targetQuantity,
      stockScope
    )
  } else if (allocation.otherCharDeposits.length > 0) {
    const firstDeposit = allocation.otherCharDeposits[0]
    if (firstDeposit !== undefined) {
      setPendingActionFn(
        bagId,
        slotIndex,
        action,
        `character:${firstDeposit.charId}`,
        targetQuantity,
        stockScope
      )
    }
  }
  if (allocation.otherCharDeposits.length > 0) {
    setPendingUseDeposits(bagId, slotIndex, allocation.otherCharDeposits)
  }
}
