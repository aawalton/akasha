import { isAttachmentExtension } from "../../page/attachment-file.ts"
import type { FileTree } from "../../page/file-tree.ts"
import { declarationsFor } from "./page-property-types.ts"

export const ATTACHMENT = "attachment"

export function attachmentKeysFor(tree: FileTree, pageType: string): ReadonlyMap<string, string> {
  const keys = new Map<string, string>()
  for (const [key, one] of declarationsFor(tree, pageType)) {
    const extension = one.attachment
    if (extension !== null && isAttachmentExtension(extension)) keys.set(key, extension)
  }
  return keys
}
