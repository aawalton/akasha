const escapeRegex = (s: string): string => s.replace(/[.+^$*?()|{}[\]\\]/g, "\\$&")

const globToRegex = (glob: string): RegExp => {
  let i = 0
  let out = "^"
  while (i < glob.length) {
    const c = glob[i]
    if (c === undefined) break
    if (c === "*" && glob[i + 1] === "*") {
      if (glob[i + 2] === "/") {
        out += "(?:.*/)?"
        i += 3
      } else {
        out += ".*"
        i += 2
      }
      continue
    }
    if (c === "*") {
      out += "[^/]*"
      i++
      continue
    }
    if (c === "?") {
      out += "[^/]"
      i++
      continue
    }
    if (c === "{") {
      const close = glob.indexOf("}", i)
      if (close > i) {
        const alts = glob
          .slice(i + 1, close)
          .split(",")
          .map(escapeRegex)
        out += `(?:${alts.join("|")})`
        i = close + 1
        continue
      }
    }
    if (/[.+^$()|\\]/.test(c)) {
      out += `\\${c}`
      i++
      continue
    }
    out += c
    i++
  }
  out += "$"
  return new RegExp(out)
}

export const matchGlob = (pattern: string, path: string): boolean => {
  const cleaned = pattern.endsWith("!") ? pattern.slice(0, -1) : pattern
  return globToRegex(cleaned).test(path)
}

export const matchAny = (patterns: readonly string[], path: string): boolean => {
  for (const p of patterns) {
    if (matchGlob(p, path)) return true
  }
  return false
}
