import { type FileTree } from "../../page/file-tree.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { type Roots } from "../../page/page.ts"
import { uncommittedKeysFor } from "./page-uncommitted-keys.ts"
import { attachmentKeysFor } from "./page-attachment-keys.ts"
import {
  asDeclared,
  bodyKeyFor,
  rowsHoldingsFor,
  type Rendered,
  typesFor,
} from "./page-property-types.ts"

export type Value = string | number | boolean | readonly string[]

export interface Attachment {
  readonly extension: string
  readonly text: string
}

export interface Split {
  readonly front: Record<string, Rendered>
  readonly uncommitted: Record<string, Value>
  readonly attachments: Record<string, Attachment>
  readonly body: string | null
}

function textOf(value: Value): string {
  if (typeof value === "string") return value
  return Array.isArray(value) ? value.join("\n") : String(value)
}

export function splitValues(
  roots: Roots,
  pageType: string,
  values: Readonly<Record<string, Value>>,
  tree: FileTree = diskFileTree(roots)
): Split {
  const uncommittedKeys = uncommittedKeysFor(tree, pageType)
  const rowsKeys = new Set(rowsHoldingsFor(tree, pageType).map((holding) => holding.key))
  const largeKeys = attachmentKeysFor(tree, pageType)
  const bodyKey = bodyKeyFor(tree, pageType)
  const types = typesFor(tree, pageType)
  const front: Record<string, Rendered> = {}
  const uncommitted: Record<string, Value> = {}
  const attachments: Record<string, Attachment> = {}
  let body: string | null = null
  for (const [key, value] of Object.entries(values)) {
    const extension = largeKeys.get(key)
    if (extension !== undefined) attachments[key] = { extension, text: textOf(value) }
    else if (uncommittedKeys.has(key) && !rowsKeys.has(key)) uncommitted[key] = value
    else if (bodyKey !== null && key === bodyKey) body = textOf(value)
    else front[key] = asDeclared(value, types.get(key))
  }
  return { front, uncommitted: uncommitted, attachments: attachments, body }
}
