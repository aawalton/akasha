const MAPPED = /\.map\(\s*\(?\s*([A-Za-z_$][\w$]*)\s*\)?\s*(?::[^=>]*)?=>/g

export interface Mapping {
  readonly from: number
  readonly param: string
  readonly over: string
}

export function through(source: string, from: number, closes: string): string {
  let depth = 0
  let out = ""
  for (let at = from; at < source.length; at++) {
    const one = source[at] as string
    if (one === '"' || one === "'" || one === "`") {
      const quote = one
      out += one
      at++
      while (at < source.length && source[at] !== quote) {
        if (source[at] === "\\") out += source[at++] as string
        out += source[at++] as string
      }
      out += source[at] ?? ""
      continue
    }
    if ("([{".includes(one)) depth++
    else if (")]}".includes(one)) {
      if (depth === 0) break
      depth--
    } else if (depth === 0 && closes.includes(one)) break
    out += one
  }
  return out.trim()
}

export function opens(source: string, at: number): number | null {
  let cursor = at
  const spaces = (): void => {
    while (cursor < source.length && /\s/.test(source[cursor] as string)) cursor++
  }
  spaces()
  if (source[cursor] === "<") {
    let depth = 0
    for (; cursor < source.length; cursor++) {
      const one = source[cursor] as string
      if (one === '"' || one === "'" || one === "`") {
        cursor++
        while (cursor < source.length && source[cursor] !== one) {
          if (source[cursor] === "\\") cursor++
          cursor++
        }
        continue
      }
      if (one === "<") depth++
      else if (one === ">" && source[cursor - 1] !== "=") {
        depth--
        if (depth === 0) {
          cursor++
          break
        }
      }
    }
    if (depth !== 0) return null
    spaces()
  }
  return source[cursor] === "(" ? cursor + 1 : null
}

export function commas(text: string): readonly string[] {
  const parts: string[] = []
  let at = 0
  while (at < text.length) {
    const part = through(text, at, ",")
    parts.push(part)
    at += part.length + 1
    while (at <= text.length && text[at - 1] !== "," && at < text.length) at++
  }
  return parts.filter((part) => part !== "")
}

export function evaluate(text: string, env: ReadonlyMap<string, string>): string | null {
  const source = text.trim()
  let at = 0
  const parts: string[] = []
  const spaces = (): void => {
    while (at < source.length && /\s/.test(source[at] as string)) at++
  }
  for (;;) {
    spaces()
    if (at >= source.length) break
    const one = source[at] as string
    if (one === '"' || one === "'") {
      at++
      let out = ""
      while (at < source.length && source[at] !== one) {
        if (source[at] === "\\") {
          out += source[at + 1] as string
          at += 2
        } else out += source[at++] as string
      }
      if (at >= source.length) return null
      at++
      parts.push(out)
    } else if (one === "`") {
      at++
      let out = ""
      for (;;) {
        if (at >= source.length) return null
        if (source[at] === "`") {
          at++
          break
        }
        if (source[at] === "$" && source[at + 1] === "{") {
          at += 2
          let named = ""
          while (at < source.length && source[at] !== "}") named += source[at++] as string
          if (at >= source.length) return null
          at++
          const held = env.get(named.trim())
          if (held === undefined) return null
          out += held
        } else out += source[at++] as string
      }
      parts.push(out)
    } else if (/[A-Za-z_$]/.test(one)) {
      let named = ""
      while (at < source.length && /[\w$]/.test(source[at] as string)) named += source[at++] as string
      const held = env.get(named)
      if (held === undefined) return null
      parts.push(held)
    } else return null
    spaces()
    if (at >= source.length) break
    if (source[at] !== "+") return null
    at++
  }
  return parts.length === 0 ? null : parts.join("")
}

export function mappingsIn(source: string): readonly Mapping[] {
  const found: Mapping[] = []
  for (const match of source.matchAll(MAPPED)) {
    let at = (match.index as number) - 1
    while (at >= 0 && /\s/.test(source[at] as string)) at--
    let over = ""
    if (source[at] === "]") {
      let depth = 0
      const to = at
      for (; at >= 0; at--) {
        const one = source[at] as string
        if (one === "]") depth++
        else if (one === "[") {
          depth--
          if (depth === 0) break
        }
      }
      over = source.slice(at + 1, to)
    } else {
      let named = ""
      while (at >= 0 && /[\w$]/.test(source[at] as string)) named = (source[at--] as string) + named
      over = named
    }
    found.push({
      from: (match.index as number) + (match[0] as string).length,
      param: match[1] as string,
      over,
    })
  }
  return found
}
