export const ACHIEVEMENT_ITEMS: Record<number, Record<number, boolean>> = {
  [1250]: {},
  [1712]: {},
  [1958]: {},
  [2099]: {},
  [2320]: {},
  [2463]: {},
  [2534]: {},
  [2669]: {},
  [2759]: {},
}

export function markAchievementItem(this: void, achId: number, index: number): undefined {
  const inner = ACHIEVEMENT_ITEMS[achId]
  if (inner !== undefined) inner[index] = true
}
