import { isAttachmentFile } from "@akasha/markdown-pages/attachment-file"

export function noteUnreadable(
  faults: Set<string>,
  repo: string,
  relPath: string,
  kind: string
): void {
  if (isAttachmentFile(relPath)) return
  faults.add(
    `\`${repo}:${relPath}\` matches the glob for \`${kind}\` and does not read as a page, ` +
      `so it stands in no count`
  )
}
