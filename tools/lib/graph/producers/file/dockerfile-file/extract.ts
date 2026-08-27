import { z } from "zod"
import type { DockerfileImageLine } from "./types.ts"

const FROM_LINE_PATTERN = /^\s*FROM\s+(.+?)\s*$/i
const AS_ALIAS_TAIL = /\s+AS\s+\S+\s*$/i

const FROM_MATCH_SCHEMA = z.tuple([z.string(), z.string()]).nullable()

const stripLeadingFlags = (rest: string): string => {
  let cursor = rest
  while (cursor.startsWith("--")) {
    const ws = cursor.search(/\s/)
    if (ws === -1) return ""
    cursor = cursor.slice(ws + 1).replace(/^\s+/, "")
  }
  return cursor
}

const parseFromBody = (rest: string): string | null => {
  const withoutAlias = rest.replace(AS_ALIAS_TAIL, "")
  const afterFlags = stripLeadingFlags(withoutAlias)
  if (afterFlags === "") return null
  const firstToken = afterFlags.split(/\s+/, 1)[0]
  if (firstToken === undefined || firstToken === "") return null
  return firstToken
}

export const parseFromLines = (text: string): readonly DockerfileImageLine[] => {
  const out: DockerfileImageLine[] = []
  const lines = text.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    if (raw === undefined) continue
    const stripped = raw.replace(/^\s+/, "")
    if (stripped === "" || stripped.startsWith("#")) continue
    const match = FROM_MATCH_SCHEMA.parse(FROM_LINE_PATTERN.exec(raw))
    if (match === null) continue
    const image = parseFromBody(match[1])
    if (image === null) continue
    out.push({ value: image, line: i + 1 })
  }
  return out
}
