export function bitsNeeded(count: number): number {
  if (count <= 1) return 1
  return Math.ceil(Math.log2(count))
}
