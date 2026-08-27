const LUA_SPACE = /^[ \t\n\v\f\r]+|[ \t\n\v\f\r]+$/g
const HEX = /^[+-]?0[xX][0-9a-fA-F]+$/
const STRTOD_SPECIAL = /^[+-]?(?:inf(?:inity)?|nan)$/i
const DECIMAL = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/

export function luaToNumber(v: unknown): number | undefined {
  if (typeof v === "number") return v
  if (typeof v !== "string") return undefined

  const s = v.replace(LUA_SPACE, "")
  if (s === "") return undefined

  const signed = s.startsWith("+") || s.startsWith("-")
  const negative = s.startsWith("-")

  if (HEX.test(s)) {
    const magnitude = Number.parseInt(s.slice(signed ? 3 : 2), 16)
    return negative ? -magnitude : magnitude
  }

  if (STRTOD_SPECIAL.test(s)) {
    if (s.toLowerCase().endsWith("nan")) return Number.NaN
    return negative ? -Infinity : Infinity
  }

  if (!DECIMAL.test(s)) return undefined
  return Number(s)
}
