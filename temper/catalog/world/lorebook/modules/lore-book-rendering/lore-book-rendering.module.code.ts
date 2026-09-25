export const PART_BYTES = 13983

export const CAPTURED_PART_BYTES = 13600

const WIDTH = 100

const SMALLEST_PLAIN = 1e-4

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/

const DIGITS = /^\d+$/

export function quoted(text: string): string {
  const doubles = (text.match(/"/g) ?? []).length
  const singles = (text.match(/'/g) ?? []).length
  const quote = doubles > singles ? "'" : '"'
  let out = ""
  for (const one of text) {
    if (one === "\\") out += "\\\\"
    else if (one === quote) out += `\\${one}`
    else if (one === "\n") out += "\\n"
    else if (one === "\t") out += "\\t"
    else out += one
  }
  return `${quote}${out}${quote}`
}

export function numeral(value: number): string {
  return value !== 0 && Math.abs(value) < SMALLEST_PLAIN ? value.toExponential() : String(value)
}

function keyed(key: string): string {
  if (DIGITS.test(key)) return `[${key}]`
  return IDENTIFIER.test(key) ? key : quoted(key)
}

function plain(value: unknown): boolean {
  return typeof value !== "object" || value === null
}

export function literal(value: unknown, indent: string): string {
  if (typeof value === "string") return quoted(value)
  if (typeof value === "number") return numeral(value)
  if (typeof value === "boolean") return String(value)
  const inner = `${indent}  `
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]"
    if (value.every(plain)) return `[${value.map((one) => literal(one, indent)).join(", ")}]`
    return `[\n${value.map((one) => `${inner}${literal(one, inner)},\n`).join("")}${indent}]`
  }
  const entries = Object.entries(value as Record<string, unknown>)
  if (entries.length === 0) return "{}"
  const lines = entries.map(([key, one]) => `${inner}${keyed(key)}: ${literal(one, inner)},\n`)
  return `{\n${lines.join("")}${indent}}`
}

export function tableOf(pairs: readonly (readonly [number, unknown])[]): Record<string, unknown> {
  const held: Record<string, unknown> = {}
  for (const [key, value] of pairs) held[String(key)] = value
  return held
}

export function splitOver<T>(
  items: readonly T[],
  ceiling: number,
  overhead: number,
  measured: (one: T) => number
): T[][] {
  const parts: T[][] = []
  let open: T[] = []
  let held = overhead
  for (const one of items) {
    const size = measured(one)
    if (open.length > 0 && held + size > ceiling) {
      parts.push(open)
      open = []
      held = overhead
    }
    open.push(one)
    held += size
  }
  if (open.length > 0) parts.push(open)
  return parts
}

const ENCODER = new TextEncoder()

export function bytesOf(text: string): number {
  return ENCODER.encode(text).length
}

export type Imported = { readonly name: string; readonly from: string }

export function importLines(
  parts: readonly Imported[],
  typeName: string,
  typeFrom: string
): string {
  const lines = parts.map((one) => `import { ${one.name} } from "${one.from}"\n`)
  return `${lines.join("")}import type { ${typeName} } from "${typeFrom}"\n`
}

export function partText(typeName: string, typeFrom: string, name: string, body: string): string {
  return `import type { ${typeName} } from "${typeFrom}"\n\nexport const ${name}: ${typeName} = ${body}\n`
}

export type Collection = {
  readonly collectionIndex: number
  readonly name: string
  readonly books: readonly { readonly bookIndex: number; readonly name: string }[]
}

function bookLine(book: { readonly bookIndex: number; readonly name: string }): string {
  const line = `      { bookIndex: ${String(book.bookIndex)}, name: ${quoted(book.name)} },`
  if (line.length <= WIDTH) return `${line}\n`
  return `      {\n        bookIndex: ${String(book.bookIndex)},\n        name: ${quoted(book.name)},\n      },\n`
}

export function collectionBlock(one: Collection): string {
  return (
    `  {\n    collectionIndex: ${String(one.collectionIndex)},\n    name: ${quoted(one.name)},\n` +
    `    books: [\n${one.books.map(bookLine).join("")}    ],\n  },\n`
  )
}

export function collectionsText(collections: readonly Collection[]): string {
  if (collections.length === 0) return "[]"
  return `[\n${collections.map(collectionBlock).join("")}]`
}

export function entryLine(key: number, value: unknown): string {
  return `  ${keyed(String(key))}: ${literal(value, "  ")},\n`
}

export function assignedText(target: string, names: readonly string[], group: number): string {
  const calls: string[] = []
  for (let at = 0; at < names.length; at += group) {
    const args = [target, ...names.slice(at, at + group)]
    const line = `Object.assign(${args.join(", ")})`
    calls.push(line.length <= WIDTH ? line : `Object.assign(\n  ${args.join(",\n  ")}\n)`)
  }
  return calls.join("\n")
}

export function spreadText(names: readonly string[], indent: string): string {
  return names.map((one) => `${indent}...${one},\n`).join("")
}

export function listSpreadText(names: readonly string[], lead: string): string {
  const line = `${lead}[${names.map((one) => `...${one}`).join(", ")}],`
  if (line.length <= WIDTH) return `${line}\n`
  return `${lead}[\n${names.map((one) => `      ...${one},\n`).join("")}    ],\n`
}
