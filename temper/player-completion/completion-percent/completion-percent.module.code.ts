export function completionPercent(count: number, total: number): number {
  if (total <= 0 || count <= 0) return 0
  if (count >= total) return 100
  return Math.max(1, Math.floor((count / total) * 100))
}
