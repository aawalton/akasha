export function computeCraftIterations(
  needed: number,
  yieldPerIter: number,
  maxIter: number
): number {
  if (needed <= 0) return 0
  if (yieldPerIter < 1) return 0
  if (maxIter < 1) return 0
  const itersNeeded = Math.ceil(needed / yieldPerIter)
  return Math.min(itersNeeded, maxIter)
}
