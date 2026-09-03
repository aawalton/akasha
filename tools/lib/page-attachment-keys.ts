import { isAttachmentExtension } from "@akasha/markdown-pages/attachment-file"
import type { FileTree } from "@akasha/markdown-pages/file-tree"
import { ATTACHMENT } from "@akasha/pages-system/page-value-key"
import { declarationsFor } from "./page-property-types.ts"

export { ATTACHMENT }

export function attachmentKeysFor(tree: FileTree, pageType: string): ReadonlyMap<string, string> {
  const keys = new Map<string, string>()
  for (const [key, one] of declarationsFor(tree, pageType)) {
    const extension = one.attachment
    if (extension !== null && isAttachmentExtension(extension)) keys.set(key, extension)
  }
  return keys
}
