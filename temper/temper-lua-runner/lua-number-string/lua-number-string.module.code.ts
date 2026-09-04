const SAFE_WHOLE = 2 ** 53

const LUA_DIGITS = 14

const FULL_DIGITS = 17

const LEAST_EXPONENT_DIGITS = 2

function trimmedExponent(text: string): string {
  const [mantissa, exponent] = text.split("e")
  if (mantissa === undefined || exponent === undefined) return text
  const kept = mantissa.includes(".") ? mantissa.replace(/\.?0+$/, "") : mantissa
  const size = Number(exponent)
  const sign = size < 0 ? "-" : "+"
  return `${kept}e${sign}${String(Math.abs(size)).padStart(LEAST_EXPONENT_DIGITS, "0")}`
}

function toSignificant(value: number, digits: number): string {
  const exponent = value === 0 ? 0 : Math.floor(Math.log10(Math.abs(value)))
  if (exponent < -4 || exponent >= digits) {
    return trimmedExponent(value.toExponential(digits - 1))
  }
  const fixed = value.toFixed(Math.max(0, digits - 1 - exponent))
  return fixed.includes(".") ? fixed.replace(/\.?0+$/, "") : fixed
}

export function luaNumberString(value: number): string {
  if (Number.isInteger(value) && Math.abs(value) < SAFE_WHOLE) return value.toFixed(0)
  const short = toSignificant(value, LUA_DIGITS)
  if (Number(short) === value) return short
  return toSignificant(value, FULL_DIGITS)
}
