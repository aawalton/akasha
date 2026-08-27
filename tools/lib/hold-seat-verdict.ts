
import { existsSync, readFileSync, statSync } from "node:fs"
import { whenText } from "./hold-seat-words.ts"
import { blobId } from "../../repo/git/git.ts"
import { countLines, firstUnreadLine, ownRead, sameBody } from "./read-log.ts"
import { canonicalize } from "../../repo/path/path"

export type Verdict =
  | { readonly read: true }
  | { readonly gone: true }
  | { readonly remedy: string; readonly seen: boolean }

export function verdictOn(
  agent: string,
  claimed: string,
  named: string,
  absolute: string
): Verdict {
  if (!existsSync(absolute)) return { gone: true }
  let bytes: Uint8Array
  let changedAt: number
  try {
    bytes = readFileSync(absolute)
    changedAt = statSync(absolute).mtimeMs
  } catch {
    return { gone: true }
  }
  const body = new TextDecoder().decode(bytes)
  const lines = countLines(body)
  if (lines === 0) return { read: true }
  const canonical = canonicalize(absolute)
  const mark = blobId(bytes)
  const against = (reader: string): Verdict => {
    const reading = ownRead(reader, canonical)
    const readAt = reading === null ? null : reading.at
    if (reading === null || readAt === null) {
      return {
        seen: false,
        remedy:
          `NOT YET READ — \`${named}\` is part of your ${claimed}. ` +
          `Read all ${lines} lines of ${absolute}`,
      }
    }
    if (!sameBody(reading, mark)) {
      return {
        seen: true,
        remedy:
          `CHANGED SINCE YOU READ IT — \`${named}\` is part of your ${claimed}; you read it as it ` +
          `stood at ${whenText(readAt)} and it changed at ${whenText(changedAt)}. ` +
          `Re-read all ${lines} lines of ${absolute}`,
      }
    }
    const unread = firstUnreadLine(reader, canonical, mark, lines)
    if (unread === null) return { read: true }
    return {
      seen: true,
      remedy:
        `PARTLY READ — \`${named}\` is part of your ${claimed}; line ${unread} of ${lines} onward ` +
        `is unread. Read ${absolute} from line ${unread} (\`offset: ${unread}\`)`,
    }
  }
  return against(agent)
}
