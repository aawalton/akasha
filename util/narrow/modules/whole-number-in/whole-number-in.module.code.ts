export function wholeNumberIn(said: string): number | null {
  if (!/^\d+$/.test(said)) return null
  const held = Number(said)
  return Number.isInteger(held) && held >= 0 ? held : null
}
