const CHUNK_BYTES = 100_000

const NAME_START = /[A-Za-z_]/

const NAME_PART = /[A-Za-z0-9_]/

const SPACE = /\s/

const BARE_END = /[\s,;}\]]/

function trivia(source: string, from: number): number {
  let at = from
  for (;;) {
    while (at < source.length && SPACE.test(source.charAt(at))) at += 1
    if (!source.startsWith("--", at)) return at
    const level = longLevel(source, at + 2)
    if (level !== null) {
      at = longEnd(source, at + 2, level)
      continue
    }
    const line = source.indexOf("\n", at)
    at = line === -1 ? source.length : line + 1
  }
}

function longLevel(source: string, at: number): number | null {
  if (source.charAt(at) !== "[") return null
  let level = 0
  while (source.charAt(at + 1 + level) === "=") level += 1
  return source.charAt(at + 1 + level) === "[" ? level : null
}

function longEnd(source: string, at: number, level: number): number {
  const close = `]${"=".repeat(level)}]`
  const found = source.indexOf(close, at + level + 2)
  if (found === -1) throw new Error(`a long bracket opened at ${String(at)} never closes`)
  return found + close.length
}

function quotedEnd(source: string, at: number): number {
  const quote = source.charAt(at)
  let next = at + 1
  while (next < source.length) {
    const one = source.charAt(next)
    if (one === "\\") next += 2
    else if (one === quote) return next + 1
    else next += 1
  }
  throw new Error(`a string opened at ${String(at)} never closes`)
}

function tableEnd(source: string, at: number): number {
  let depth = 0
  let next = at
  while (next < source.length) {
    const one = source.charAt(next)
    if (one === '"' || one === "'") {
      next = quotedEnd(source, next)
      continue
    }
    if (one === "[") {
      const level = longLevel(source, next)
      if (level !== null) {
        next = longEnd(source, next, level)
        continue
      }
    }
    if (one === "-" && source.charAt(next + 1) === "-") {
      next = trivia(source, next)
      continue
    }
    if (one === "{") depth += 1
    if (one === "}") {
      depth -= 1
      if (depth === 0) return next + 1
    }
    next += 1
  }
  throw new Error(`a table opened at ${String(at)} never closes`)
}

function valueEnd(source: string, at: number): number {
  const one = source.charAt(at)
  if (one === "{") return tableEnd(source, at)
  if (one === '"' || one === "'") return quotedEnd(source, at)
  const level = longLevel(source, at)
  if (level !== null) return longEnd(source, at, level)
  let next = at
  while (next < source.length && !BARE_END.test(source.charAt(next))) next += 1
  if (next === at) throw new Error(`no value starts at ${String(at)}`)
  return next
}

function nameEnd(source: string, at: number): number {
  if (!NAME_START.test(source.charAt(at))) return at
  let next = at + 1
  while (next < source.length && NAME_PART.test(source.charAt(next))) next += 1
  return next
}

function assigns(source: string, at: number): boolean {
  return source.charAt(at) === "=" && source.charAt(at + 1) !== "="
}

type Entry = { readonly key: string; readonly start: number; readonly end: number }

function entriesOf(source: string, open: number, close: number): readonly Entry[] {
  const found: Entry[] = []
  let place = 0
  let at = trivia(source, open + 1)
  while (at < close - 1) {
    const one = source.charAt(at)
    if (one === "," || one === ";") {
      at = trivia(source, at + 1)
      continue
    }
    let key: string
    if (one === "[" && longLevel(source, at) === null) {
      const inner = trivia(source, at + 1)
      const shut = trivia(source, valueEnd(source, inner))
      if (source.charAt(shut) !== "]") throw new Error(`a key opened at ${String(at)} never closes`)
      key = source.slice(at, shut + 1)
      at = trivia(source, shut + 1)
      if (!assigns(source, at)) throw new Error(`a key at ${String(at)} is given no value`)
      at = trivia(source, at + 1)
    } else {
      const named = nameEnd(source, at)
      const after = trivia(source, named)
      if (named > at && assigns(source, after)) {
        key = `.${source.slice(at, named)}`
        at = trivia(source, after + 1)
      } else {
        place += 1
        key = `[${String(place)}]`
      }
    }
    const end = valueEnd(source, at)
    found.push({ key, start: at, end })
    at = trivia(source, end)
  }
  return found
}

function stated(
  source: string,
  path: string,
  start: number,
  end: number,
  most: number,
  out: string[]
): undefined {
  if (end - start <= most || source.charAt(start) !== "{") {
    out.push(`${path} = ${source.slice(start, end)}`)
    return undefined
  }
  out.push(`${path} = {}`)
  for (const entry of entriesOf(source, start, end)) {
    stated(source, `${path}${entry.key}`, entry.start, entry.end, most, out)
  }
  return undefined
}

export function savedChunks(source: string, most: number = CHUNK_BYTES): readonly string[] {
  const statements: string[] = []
  let at = trivia(source, 0)
  while (at < source.length) {
    const named = nameEnd(source, at)
    if (named === at) throw new Error(`no saved variable is named at ${String(at)}`)
    const equals = trivia(source, named)
    if (!assigns(source, equals)) throw new Error(`a saved variable at ${String(at)} is not set`)
    const start = trivia(source, equals + 1)
    const end = valueEnd(source, start)
    stated(source, source.slice(at, named), start, end, most, statements)
    at = trivia(source, end)
  }
  const chunks: string[] = []
  let held = ""
  for (const one of statements) {
    if (held !== "" && held.length + one.length > most) {
      chunks.push(held)
      held = ""
    }
    held = held === "" ? one : `${held}\n${one}`
  }
  if (held !== "") chunks.push(held)
  return chunks
}
