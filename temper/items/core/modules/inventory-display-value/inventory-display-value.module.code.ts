export function computeValue(
  marketValue: number | undefined,
  merchantValue: number | undefined,
  replacementValue?: number | undefined
): number | undefined {
  if (marketValue === undefined && merchantValue === undefined && replacementValue === undefined)
    return undefined
  return Math.max(marketValue ?? 0, merchantValue ?? 0, replacementValue ?? 0)
}
