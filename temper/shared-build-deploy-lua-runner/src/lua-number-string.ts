export function luaNumberString(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 2 ** 53) return n.toFixed(0)
  const g14 = toG(n, 14)
  if (Number(g14) === n) return g14
  return toG(n, 17)
}

function toG(n: number, precision: number): string {
  const exp = n === 0 ? 0 : Math.floor(Math.log10(Math.abs(n)))
  if (exp < -4 || exp >= precision) return trimExp(n.toExponential(precision - 1))
  const fixed = n.toFixed(Math.max(0, precision - 1 - exp))
  return fixed.includes(".") ? fixed.replace(/\.?0+$/, "") : fixed
}

function trimExp(s: string): string {
  const [mant, e] = s.split("e")
  if (mant === undefined || e === undefined) return s
  const m = mant.includes(".") ? mant.replace(/\.?0+$/, "") : mant
  const expNum = Number(e)
  const sign = expNum < 0 ? "-" : "+"
  return `${m}e${sign}${String(Math.abs(expNum)).padStart(2, "0")}`
}
