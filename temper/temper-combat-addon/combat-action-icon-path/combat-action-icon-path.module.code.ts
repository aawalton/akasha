export function normalizeIconPath(p: string): string {
  let path = p.toLowerCase()
  const prefix = prefixThroughThreeDigits(path)
  if (prefix !== undefined) {
    path = prefix
  }
  const index = path.indexOf(".dds")
  if (index > 0) {
    path = path.slice(0, index)
  }
  return path
}

const DIGITS = "0123456789"

export function isDigitChar(c: string): boolean {
  return c.length === 1 && DIGITS.includes(c)
}

function prefixThroughThreeDigits(path: string): string | undefined {
  for (let i = 0; i + 2 < path.length; i = i + 1) {
    if (
      isDigitChar(path.charAt(i)) &&
      isDigitChar(path.charAt(i + 1)) &&
      isDigitChar(path.charAt(i + 2))
    ) {
      return path.slice(0, i + 3)
    }
  }
  return undefined
}

export function matchIconPath(a: string, b: string): boolean {
  if (a === "" || a === "/" || b === "" || b === "/") {
    return false
  }
  if (a === b) {
    return true
  }
  const path1 = normalizeIconPath(a)
  const path2 = normalizeIconPath(b)
  return path1.includes(path2) || path2.includes(path1)
}
