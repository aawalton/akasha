export const COMPANION_ID_TO_INDEX: Record<number, number> = {
  [1]: 1,
  [2]: 2,
  [5]: 3,
  [6]: 4,
  [8]: 5,
  [9]: 6,
  [12]: 7,
  [13]: 8,
}

export const ALL_COMPANION_IDS: number[] = [9, 1, 5, 6, 2, 8, 12, 13]

export function getCompanionIndex(companionId: number): number {
  return COMPANION_ID_TO_INDEX[companionId] ?? 0
}
