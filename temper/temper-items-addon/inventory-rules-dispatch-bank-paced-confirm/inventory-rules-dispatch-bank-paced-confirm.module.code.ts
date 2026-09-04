export type PacedBankStep =
  | {
      readonly kind: "move"
      readonly sourceBag: number
      readonly sourceSlot: number
      readonly targetBag: number
      readonly targetSlot: number
      readonly count: number
    }
  | { readonly kind: "effect"; readonly run: (this: void) => void }

export function expectedRemainderAfterMove(sourceStackBefore: number, count: number): number {
  const remainder = sourceStackBefore - count
  return remainder > 0 ? remainder : 0
}

export function isPacedMoveConfirmed(
  observedSourceStack: number,
  expectedRemaining: number
): boolean {
  return observedSourceStack <= expectedRemaining
}

export function countPacedMoves(steps: readonly PacedBankStep[]): number {
  let n = 0
  for (const s of steps) if (s.kind === "move") n++
  return n
}
