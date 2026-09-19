export function computeValue(
  estimatedValue: number | undefined,
  merchantValue: number | undefined,
  replacementValue?: number | undefined
): number | undefined {
  if (estimatedValue === undefined && merchantValue === undefined && replacementValue === undefined)
    return undefined
  return Math.max(estimatedValue ?? 0, merchantValue ?? 0, replacementValue ?? 0)
}
