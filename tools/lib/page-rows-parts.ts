import { appendFileSync, readFileSync, statSync } from "node:fs"
import { rowsPartOf, rowsPartsOf, PART_CEILING_BYTES, partNumberOf } from "../../page/rows-file.ts"
import { isMissing } from "../../missing/missing.ts"
import { writeWhole } from "../../write-whole/write-whole.ts"

export const NAMING: readonly string[] = ["slug", "id"]

export interface Part {
  readonly path: string
  readonly lines: string[]
  readonly from: number
  bytes: number
  touched: boolean
  grew: boolean
}

export function namedIn(values: Readonly<Record<string, unknown>>): string | null {
  for (const key of NAMING) {
    const one = values[key]
    if (typeof one === "string" && one.trim() !== "") return one.trim()
  }
  return null
}

export function objectOfLine(line: string): Record<string, unknown> | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(line)
  } catch {
    return null
  }
  return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
    ? (parsed as Record<string, unknown>)
    : null
}

export function linesIn(path: string): readonly string[] {
  let text: string
  try {
    text = readFileSync(path, "utf8")
  } catch (thrown) {
    if (!isMissing(thrown)) throw thrown
    return []
  }
  const split = text.replace(/\r\n/g, "\n").split("\n")
  return split.at(-1) === "" ? split.slice(0, -1) : split
}

export function standingAt(lines: readonly string[], named: string): number {
  return lines.findIndex((one) => {
    if (one.trim() === "") return false
    const held = objectOfLine(one)
    return held !== null && namedIn(held) === named
  })
}

export function standingIn(lines: readonly string[]): Map<string, number> {
  const at = new Map<string, number>()
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] as string
    if (line.trim() === "") continue
    const held = objectOfLine(line)
    const named = held === null ? null : namedIn(held)
    if (named !== null && !at.has(named)) at.set(named, index)
  }
  return at
}

export function byteLength(text: string): number {
  return new TextEncoder().encode(text).length
}

export function partsHeld(basePath: string): Part[] {
  const standing = rowsPartsOf(basePath)
  const paths = standing.length === 0 ? [basePath] : standing
  return paths.map((path) => {
    const lines = [...linesIn(path)]
    let bytes = 0
    for (const line of lines) bytes += byteLength(line) + 1
    return { path, lines, from: lines.length, bytes, touched: false, grew: false }
  })
}

export function appendable(basePath: string, parts: Part[], line: string): Part {
  const last = parts[parts.length - 1] as Part
  if (last.lines.length === 0 || last.bytes + byteLength(line) + 1 <= PART_CEILING_BYTES) return last
  const next: Part = {
    path: rowsPartOf(basePath, partNumberOf(last.path) + 1),
    lines: [],
    from: 0,
    bytes: 0,
    touched: false,
    grew: false,
  }
  parts.push(next)
  return next
}

export function lastPartOf(basePath: string): { readonly path: string; readonly bytes: number } {
  const standing = rowsPartsOf(basePath)
  const path = standing.length === 0 ? basePath : (standing[standing.length - 1] as string)
  try {
    return { path, bytes: statSync(path).size }
  } catch (thrown) {
    if (!isMissing(thrown)) throw thrown
    return { path, bytes: 0 }
  }
}

export function appendLines(basePath: string, lines: readonly string[]): readonly string[] {
  if (lines.length === 0) return []
  const held = lastPartOf(basePath)
  let path = held.path
  let bytes = held.bytes
  const paths: string[] = []
  let batch: string[] = []
  const flush = (): undefined => {
    if (batch.length === 0) return
    appendFileSync(path, `${batch.join("\n")}\n`, "utf8")
    if (!paths.includes(path)) paths.push(path)
    batch = []
  }
  for (const line of lines) {
    const size = byteLength(line) + 1
    if (bytes > 0 && bytes + size > PART_CEILING_BYTES) {
      flush()
      path = rowsPartOf(basePath, partNumberOf(path) + 1)
      bytes = 0
    }
    batch.push(line)
    bytes += size
  }
  flush()
  return paths
}

export function writeOutParts(parts: readonly Part[]): readonly string[] {
  const paths: string[] = []
  for (const part of parts) {
    if (!part.touched && !part.grew) continue
    if (part.touched) writeWhole(part.path, `${part.lines.join("\n")}\n`)
    else appendFileSync(part.path, `${part.lines.slice(part.from).join("\n")}\n`, "utf8")
    paths.push(part.path)
  }
  return paths
}
