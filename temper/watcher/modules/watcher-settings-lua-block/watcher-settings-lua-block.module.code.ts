const DEFAULT_INDENT = "            "

const LONG_BRACKET = /\[(=*)\[/y

interface KeyAt {
  readonly name: string
  readonly start: number
  readonly end: number
  readonly table: number
  readonly depth: number
}

interface Span {
  readonly from: number
  readonly to: number
}

interface Scanned {
  readonly keys: readonly KeyAt[]
  readonly home: number | null
}

function isBlank(ch: string | undefined): boolean {
  return ch === " " || ch === "\t"
}

function isSpace(ch: string | undefined): boolean {
  return isBlank(ch) || ch === "\n" || ch === "\r"
}

function skipSpace(text: string, from: number): number {
  let at = from
  while (at < text.length && isSpace(text[at])) at++
  return at
}

function stringEnd(text: string, open: number): number {
  let at = open + 1
  while (at < text.length) {
    const ch = text[at]
    if (ch === "\\") at += 2
    else if (ch === '"') return at + 1
    else at++
  }
  return -1
}

function commentEnd(text: string, dashes: number): number {
  LONG_BRACKET.lastIndex = dashes + 2
  const opened = LONG_BRACKET.exec(text)
  if (opened !== null) {
    const close = `]${opened[1] ?? ""}]`
    const at = text.indexOf(close, LONG_BRACKET.lastIndex)
    return at === -1 ? text.length : at + close.length
  }
  const newline = text.indexOf("\n", dashes)
  return newline === -1 ? text.length : newline
}

function keyClose(text: string, open: number): number {
  let at = open + 2
  while (at < text.length) {
    const ch = text[at]
    if (ch === "\n") return -1
    if (ch === "\\") {
      at += 2
      continue
    }
    if (ch === '"' && text[at + 1] === "]" && text[skipSpace(text, at + 2)] === "=") return at
    at++
  }
  return -1
}

function atomEnd(text: string, at: number): number {
  const ch = text[at]
  if (ch === '"') {
    const end = stringEnd(text, at)
    return end === -1 ? text.length : end
  }
  if (ch === "-" && text[at + 1] === "-") return commentEnd(text, at)
  if (ch === "[" && text[at + 1] === '"') {
    const close = keyClose(text, at)
    if (close !== -1) return close + 2
  }
  return at + 1
}

function keysIn(text: string, names: ReadonlySet<string>): readonly KeyAt[] {
  const found: KeyAt[] = []
  const open: number[] = []
  let at = 0
  while (at < text.length) {
    const ch = text[at]
    if (ch === "{") open.push(at)
    else if (ch === "}") open.pop()
    else if (ch === "[" && text[at + 1] === '"') {
      const close = keyClose(text, at)
      if (close !== -1) {
        const name = text.slice(at + 2, close)
        if (names.has(name)) {
          found.push({
            name,
            start: at,
            end: close + 2,
            table: open.at(-1) ?? -1,
            depth: open.length,
          })
        }
        at = close + 2
        continue
      }
    }
    at = atomEnd(text, at)
  }
  return found
}

function tableEnd(text: string, open: number): number {
  let depth = 0
  let at = open
  while (at < text.length) {
    const ch = text[at]
    if (ch === "{") depth++
    if (ch === "}") {
      depth--
      if (depth === 0) return at + 1
    }
    at = atomEnd(text, at)
  }
  return -1
}

function valueEnd(text: string, key: KeyAt): number {
  const equals = skipSpace(text, key.end)
  if (text[equals] !== "=") return -1
  const at = skipSpace(text, equals + 1)
  const ch = text[at]
  if (ch === "{") return tableEnd(text, at)
  if (ch === '"') return stringEnd(text, at)
  let end = at
  while (end < text.length && !isSpace(text[end]) && text[end] !== "," && text[end] !== "}") end++
  return end === at ? -1 : end
}

function ownLineStart(text: string, at: number): number | null {
  let from = at
  while (from > 0 && isBlank(text[from - 1])) from--
  return from === 0 || text[from - 1] === "\n" ? from : null
}

function blockSpan(text: string, key: KeyAt): Span | null {
  const end = valueEnd(text, key)
  if (end === -1) return null
  let after = end
  while (isBlank(text[after])) after++
  return {
    from: ownLineStart(text, key.start) ?? key.start,
    to: text[after] === "," ? after + 1 : end,
  }
}

function insertedBefore(text: string, anchor: KeyAt, block: string): string {
  const lineStart = ownLineStart(text, anchor.start)
  if (lineStart === null) return text.slice(0, anchor.start) + block + text.slice(anchor.start)
  return `${text.slice(0, lineStart)}${block}\n${text.slice(lineStart)}`
}

function homeOf(keys: readonly KeyAt[], siblingKeys: readonly string[]): number | null {
  const held = new Map<number, { readonly names: Set<string>; readonly depth: number }>()
  for (const key of keys) {
    if (!siblingKeys.includes(key.name)) continue
    const table = held.get(key.table) ?? { names: new Set<string>(), depth: key.depth }
    table.names.add(key.name)
    held.set(key.table, table)
  }
  let best: { readonly table: number; readonly count: number; readonly depth: number } | null = null
  for (const [table, { names, depth }] of held) {
    const count = names.size
    if (best === null || count > best.count || (count === best.count && depth < best.depth)) {
      best = { table, count, depth }
    }
  }
  return best?.table ?? null
}

function scan(text: string, key: string, siblingKeys: readonly string[]): Scanned {
  const keys = keysIn(text, new Set([key, ...siblingKeys]))
  return { keys, home: homeOf(keys, siblingKeys) }
}

function heldBy(keys: readonly KeyAt[], name: string, table: number | null): KeyAt | undefined {
  if (table === null) return undefined
  return keys.find((one) => one.name === name && one.table === table)
}

function firstNamed(keys: readonly KeyAt[], name: string): KeyAt | undefined {
  return keys.find((one) => one.name === name)
}

function firstSibling(
  keys: readonly KeyAt[],
  siblingKeys: readonly string[],
  home: number | null
): KeyAt | undefined {
  for (const siblingKey of siblingKeys) {
    const at = heldBy(keys, siblingKey, home)
    if (at !== undefined) return at
  }
  return undefined
}

function indentOfLineAt(text: string, at: number): string {
  const lineStart = text.lastIndexOf("\n", at - 1) + 1
  let end = lineStart
  while (isBlank(text[end])) end++
  return text.slice(lineStart, end)
}

export function replaceOrInsertLuaBlockInText(
  content: string,
  key: string,
  newBlock: readonly string[],
  siblingKeys: readonly string[]
): string {
  const { keys, home } = scan(content, key, siblingKeys)
  const block = newBlock.join("\n")
  const held = home === null ? firstNamed(keys, key) : heldBy(keys, key, home)
  if (held !== undefined) {
    const span = blockSpan(content, held)
    if (span !== null) return content.slice(0, span.from) + block + content.slice(span.to)
    console.warn(
      `replaceOrInsertLuaBlock: the value at key=${JSON.stringify(key)} never closes; leaving content unchanged`
    )
    return content
  }

  const anchor = firstSibling(keys, siblingKeys, home)
  if (anchor !== undefined) return insertedBefore(content, anchor, block)

  console.warn(
    `replaceOrInsertLuaBlock: no anchor for key=${JSON.stringify(key)} (siblings=${JSON.stringify(siblingKeys)}); leaving content unchanged`
  )
  return content
}

export function replaceOrInsertLuaBlock(
  lines: readonly string[],
  key: string,
  newBlock: readonly string[],
  siblingKeys: readonly string[]
): readonly string[] {
  return replaceOrInsertLuaBlockInText(lines.join("\n"), key, newBlock, siblingKeys).split("\n")
}

export function detectIndentInText(
  content: string,
  key: string,
  siblingKeys: readonly string[]
): string {
  const { keys, home } = scan(content, key, siblingKeys)
  const at =
    heldBy(keys, key, home) ?? firstNamed(keys, key) ?? firstSibling(keys, siblingKeys, home)
  return at === undefined ? DEFAULT_INDENT : indentOfLineAt(content, at.start)
}

export function detectIndent(
  lines: readonly string[],
  key: string,
  siblingKeys: readonly string[]
): string {
  return detectIndentInText(lines.join("\n"), key, siblingKeys)
}
