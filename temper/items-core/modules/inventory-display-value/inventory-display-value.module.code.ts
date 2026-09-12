export function computeValue(
  estimatedValue: number | undefined,
  merchantValue: number | undefined,
  replacementCost?: number | undefined
): number | undefined {
  if (estimatedValue === undefined && merchantValue === undefined && replacementCost === undefined)
    return undefined
  return Math.max(estimatedValue ?? 0, merchantValue ?? 0, replacementCost ?? 0)
}
