import { readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { attachmentFileOf } from "../../page/attachment-file.ts"
import { textField } from "../../page/frontmatter.ts"
import { carried, carriedIn } from "./page-carry.ts"
import { blockOf, textAt } from "../../page/text/text.ts"
export const BODY = "body"

export const ATTACHMENT = "attachment"

export type Held = string | readonly string[] | null

export type Values = Readonly<Record<string, Held>>

export interface Read {
  readonly values: Values
}

/**
 * One value the sidecar holds, and when it was stamped.
 *
 * The stamp is the sidecar's own frame rather than anything a page declares. It sits on `model` and
 * `cost-usd` for the same reason it sits on `turn-state` — because the stamper wraps whatever it is
 * handed. What a page type describes is the value, so the value is what a reader is handed.
 */
interface Stamped {
  readonly value: string | number | boolean
  readonly at: number
}

function stampedIn(value: unknown): Stamped | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null
  const keys = Object.keys(value)
  if (keys.length !== 2 || !keys.includes("value") || !keys.includes("at")) return null
  const held = (value as Record<string, unknown>)["value"]
  const at = (value as Record<string, unknown>)["at"]
  if (typeof at !== "number" || !Number.isFinite(at)) return null
  if (typeof held !== "string" && typeof held !== "number" && typeof held !== "boolean") return null
  return { value: held, at }
}

function stampedUnder(value: unknown): readonly (readonly [string, Stamped])[] | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null
  const entries = Object.entries(value)
  if (entries.length === 0) return null
  const found: (readonly [string, Stamped])[] = []
  for (const [name, one] of entries) {
    const stamped = stampedIn(one)
    if (stamped === null) return null
    found.push([name, stamped])
  }
  return found
}

function bodyIn(text: string, lineCount: number): string | null {
  const body = text.replace(/\r\n/g, "\n").split("\n").slice(lineCount).join("\n")
  return body.trim() === "" ? null : body
}

export function valuesIn(text: string, carryBody: boolean): Read | null {
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  const values: Record<string, Held> = {}
  for (const key of fm.keys) {
    const one = textField(fm, key)
    values[key] = one === null ? carriedIn(fm.fields.get(key)) : one
  }
  if (carryBody) values[BODY] = bodyIn(text, fm.lineCount)
  return { values }
}

/**
 * The page's values with the sidecar's over them, each stamped record opened out.
 *
 * A STAMP IS NOT PART OF THE VALUE. Left wrapped, each of these keys reaches a reader as the JSON
 * text of its envelope, so `model` answers `{"value":"...","at":...}` rather than naming a model.
 * Opening them here rather than at the writer leaves the stamp on disk, where the record parsers
 * still take it as a validity gate and `context-replaced`'s stamp still decides which readings
 * survive a context replacement.
 *
 * A record of records opens the same way, one key per component, joined by a hyphen: `turn-pending`
 * becomes `turn-pending-owed` and its four siblings. The whole is dropped rather than kept beside
 * the parts, because what a page type declares is the parts.
 *
 * `carried` is left alone deliberately. It also carries frontmatter maps and row values, where a
 * shape like this one is a value in its own right rather than an envelope around one.
 */
export function withUncommitted(pagePath: string, read: Read): Read {
  const uncommitted = readUncommitted(pagePath)
  if (uncommitted === null) return read
  const values: Record<string, Held> = { ...read.values }
  for (const [key, value] of Object.entries(uncommitted)) {
    const stamped = stampedIn(value)
    if (stamped !== null) {
      values[key] = String(stamped.value)
      continue
    }
    const under = stampedUnder(value)
    if (under !== null) {
      for (const [name, one] of under) values[`${key}-${name}`] = String(one.value)
      continue
    }
    values[key] = carried(value)
  }
  return { values }
}

export function withLarge(
  read: Read,
  keys: readonly string[],
  root: string,
  relPath: string,
  extensionOf: (key: string) => string | null,
  uncommittedOf: (key: string) => boolean = () => false
): Read {
  if (keys.length === 0) return read
  const values: Record<string, Held> = { ...read.values }
  for (const key of keys) {
    const extension = extensionOf(key)
    if (extension === null) continue
    values[key] = textAt(root, attachmentFileOf(relPath, key, extension, uncommittedOf(key)))
  }
  return { values }
}
