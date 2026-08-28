import { statSync } from "node:fs"
import { rowsFileOf, rowsPartsOf } from "../../page/rows-file.ts"
import { carried } from "./page-carry.ts"
import type { Held, Values } from "./page-file-values.ts"
import { textAt } from "../../page/text/text.ts"
import { isMissing } from "../../missing/missing.ts"
import { type Roots } from "../../page/page.ts"
import { isAddressable, rootFor } from "../../repo/roots/roots.ts"

const NAMING: readonly string[] = ["slug", "id"]

export const HELD_RECORDS = 400_000

export interface RowsPage {
  readonly at: string
  readonly named: string
  readonly values: Values
}

export function heldOf(value: unknown): Held {
  return carried(value)
}

export function valuesOfLine(line: string): Values | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(line)
  } catch {
    return null
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return null
  const values: Record<string, Held> = {}
  for (const [key, value] of Object.entries(parsed)) values[key] = heldOf(value)
  return values
}

function namedIn(values: Values): string | null {
  for (const key of NAMING) {
    const held = values[key]
    if (typeof held === "string" && held.trim() !== "") return held.trim()
  }
  return null
}

interface Parsed {
  readonly stamp: string
  readonly pages: readonly RowsPage[]
  readonly faults: readonly string[]
}

const parsed = new Map<string, Parsed>()

function stampOf(path: string): string | null {
  try {
    const stat = statSync(path)
    return `${stat.size}:${stat.mtimeMs}`
  } catch (thrown) {
    if (!isMissing(thrown)) throw thrown
    return null
  }
}

export function forgetRowsPages(path?: string): void {
  if (path === undefined) parsed.clear()
  else parsed.delete(path)
}

export function heldRecords(): number {
  let held = 0
  for (const one of parsed.values()) held += one.pages.length
  return held
}

function bound(): void {
  while (heldRecords() > HELD_RECORDS) {
    const oldest = parsed.keys().next()
    if (oldest.done === true) return
    parsed.delete(oldest.value)
  }
}

function readParsed(root: string, repo: string, relPath: string, parentNamed: string, of: string): Parsed {
  const path = `${root}/${relPath}`
  const stamp = stampOf(path)
  const held = parsed.get(path)
  if (held !== undefined && stamp !== null && held.stamp === stamp) return held
  const text = textAt(root, relPath)
  if (text === null || stamp === null) return { stamp: "", pages: [], faults: [] }
  const pages: RowsPage[] = []
  const faults: string[] = []
  const lines = text.replace(/\r\n/g, "\n").split("\n")
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? ""
    if (line.trim() === "") continue
    const values = valuesOfLine(line)
    if (values === null) {
      faults.push(`line ${index + 1} of \`${repo}:${relPath}\` is not one JSON object, so it names no page`)
      continue
    }
    const whole = values[of] === undefined ? { ...values, [of]: parentNamed } : values
    pages.push({
      at: `${repo}:${relPath}#${index}`,
      named: namedIn(whole) ?? `${parentNamed}#${index}`,
      values: whole,
    })
  }
  const made: Parsed = { stamp, pages, faults }
  parsed.delete(path)
  parsed.set(path, made)
  bound()
  return made
}

export function rowsPagesIn(
  roots: Roots,
  parentAt: string,
  parentNamed: string,
  on: string,
  key: string,
  uncommitted: boolean,
  fault: (why: string) => void
): readonly RowsPage[] {
  const cut = parentAt.indexOf(":")
  const repo = parentAt.slice(0, cut)
  if (!isAddressable(repo)) return []
  const root = rootFor(roots, repo)
  const relPath = rowsFileOf(parentAt.slice(cut + 1), key, uncommitted)
  const parts = rowsPartsOf(`${root}/${relPath}`)
  const pages: RowsPage[] = []
  for (const path of parts.length === 0 ? [`${root}/${relPath}`] : parts) {
    const read = readParsed(root, repo, path.slice(root.length + 1), parentNamed, `${on}-slug`)
    for (const why of read.faults) fault(why)
    pages.push(...read.pages)
  }
  return pages
}
