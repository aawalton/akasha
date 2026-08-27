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

export function withUncommitted(pagePath: string, read: Read): Read {
  const uncommitted = readUncommitted(pagePath)
  if (uncommitted === null) return read
  const values: Record<string, Held> = { ...read.values }
  for (const [key, value] of Object.entries(uncommitted)) values[key] = carried(value)
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
