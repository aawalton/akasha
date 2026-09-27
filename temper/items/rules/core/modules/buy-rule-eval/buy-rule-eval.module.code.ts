export function computeBuyShortfall(targetQuantity: number, currentTotal: number): number {
  return Math.max(0, targetQuantity - currentTotal)
}
