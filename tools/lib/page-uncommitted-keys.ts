import type { FileTree } from "@akasha/markdown-pages/file-tree"
import { declarationsFor } from "./page-property-types.ts"

export function uncommittedKeysFor(tree: FileTree, pageType: string): ReadonlySet<string> {
  const keys = new Set<string>()
  for (const [key, one] of declarationsFor(tree, pageType)) if (one.uncommitted) keys.add(key)
  return keys
}
