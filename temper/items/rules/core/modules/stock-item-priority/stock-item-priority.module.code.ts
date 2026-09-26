export function stockPriorityRank(itemIds: readonly number[] | undefined, itemId: number): number {
  if (itemIds === undefined) return 0
  for (let at = 0; at < itemIds.length; at++) {
    if (itemIds[at] === itemId) return at
  }
  return itemIds.length
}
