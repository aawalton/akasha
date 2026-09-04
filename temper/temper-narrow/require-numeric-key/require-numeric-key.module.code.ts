import "@akasha/temper-eso-types/tstl-eso-sandbox"

export function requireNumericKey(s: string, label?: string): number {
  const n = tonumber(s)
  if (n === undefined) {
    throw new Error(
      `requireNumericKey: ${s} is not a number${label !== undefined ? ` in ${label}` : ""}`
    )
  }
  return n
}
