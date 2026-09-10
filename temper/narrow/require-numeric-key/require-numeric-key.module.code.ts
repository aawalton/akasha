import "akasha/temper/eso-types/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"

export function requireNumericKey(s: string, label?: string): number {
  const n = tonumber(s)
  if (n === undefined) {
    throw new Error(
      `requireNumericKey: ${s} is not a number${label !== undefined ? ` in ${label}` : ""}`
    )
  }
  return n
}
