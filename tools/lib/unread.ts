import { existsSync, readFileSync, statSync } from "node:fs"
import type { Repo } from "../../page/document/types.ts"
import { blobId } from "../../repo/git/git.ts"
import { countLines, ownRead, sameBody } from "./read-record.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { canonicalize } from "../../repo/path/path"

const OWED = "for this path"

function whenText(at: number): string {
  return new Date(at).toISOString().replace("T", " ").slice(0, 19)
}

function reading(repo: Repo, relPath: string, absolute: string, lines: number): string {
  if (repo !== "code") {
    const named = repo === "instructions" && !relPath.startsWith("/") ? relPath : absolute
    const command = `ops read --file-path ${named}`
    return `\`${command}\` prints what you are missing of it and records the read`
  }
  return `Read all ${lines} lines of ${absolute}`
}

export function remedyFor(
  agent: string,
  relPath: string,
  absolute: string,
  repo: Repo,
  root: string
): string | null {
  let bytes: Uint8Array
  let changedAt: number
  try {
    if (!existsSync(absolute)) return null
    bytes = readFileSync(absolute)
    changedAt = statSync(absolute).mtimeMs
  } catch (error) {
    return refusalText(
      "required-document-unopenable",
      { path: relPath, error: error instanceof Error ? error.message : String(error) },
      root
    )
  }
  const lines = countLines(new TextDecoder().decode(bytes))
  if (lines === 0) return null
  const canonical = canonicalize(absolute)
  const entry = ownRead(agent, canonical)
  if (entry === null) {
    return refusalText(
      "required-document-unread",
      { path: relPath, owed: OWED, route: reading(repo, relPath, absolute, lines) },
      root
    )
  }
  const oid = blobId(bytes)
  if (!sameBody(entry, oid)) {
    return refusalText(
      "required-document-changed",
      {
        path: relPath,
        owed: OWED,
        read: whenText(entry.seenAt),
        changed: whenText(changedAt),
        route: reading(repo, relPath, absolute, lines),
      },
      root
    )
  }
  return null
}

export function lead(
  relPath: string,
  repo: Repo,
  alreadyRead: readonly string[],
  count: number,
  record: string,
  root: string
): string {
  const read =
    alreadyRead.length === 0
      ? "none of them"
      : `${alreadyRead.length} of them (${alreadyRead.join(", ")})`
  if (repo === "instructions") {
    return refusalText(
      "required-reading-unread",
      { path: relPath, count: `${count}`, read, record },
      root
    )
  }
  return refusalText(
    "required-reading-unread-elsewhere",
    { path: relPath, repo, count: `${count}`, read, record },
    root
  )
}
