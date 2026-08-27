import { z } from "zod"
import type { Repo } from "../../../../../../page/document/types.ts"
import { readRepoFile } from "../../../repos.ts"
import type { BuildContext } from "../../../types.ts"
import { repoFiles } from "../../lib/repo-files.ts"
import type { DbTriggerEvent, DbTriggerLevel, DbTriggerTiming } from "./types.ts"

const TRIGGER_RE =
  /^CREATE TRIGGER\s+([A-Za-z_][A-Za-z0-9_]*)\s+(BEFORE|AFTER|INSTEAD OF)\s+([A-Z]+(?:\s+OR\s+[A-Z]+)*)\s+ON\s+([A-Za-z_][A-Za-z0-9_]*)\.([A-Za-z_][A-Za-z0-9_]*)\s+FOR EACH (ROW|STATEMENT)\s+EXECUTE FUNCTION\s+([A-Za-z_][A-Za-z0-9_]*)\.([A-Za-z_][A-Za-z0-9_]*)\s*\([^)]*\)\s*;\s*$/

const TriggerMatchSchema: z.ZodType<
  readonly [string, string, string, string, string, string, string, string] | null
> = z.unknown().transform((v) => {
  if (v === null) return null
  if (!Array.isArray(v)) return null
  const captured: string[] = []
  for (let i = 1; i <= 8; i += 1) {
    const slot = v[i]
    if (typeof slot !== "string") return null
    captured.push(slot)
  }
  if (captured.length !== 8) return null
  const [a = "", b = "", c = "", d = "", e = "", f = "", g = "", h = ""] = captured
  return [a, b, c, d, e, f, g, h] as const
})

export type ParsedTrigger = {
  readonly schema: string
  readonly name: string
  readonly timing: DbTriggerTiming
  readonly events: readonly DbTriggerEvent[]
  readonly tableSchema: string
  readonly tableName: string
  readonly level: DbTriggerLevel
  readonly functionSchema: string
  readonly functionName: string
  readonly sourceFile: string
  readonly line: number
}

const EventArraySchema: z.ZodType<readonly DbTriggerEvent[]> = z.array(
  z.enum(["INSERT", "UPDATE", "DELETE", "TRUNCATE"])
)

const TimingNarrow: z.ZodType<DbTriggerTiming> = z.enum(["BEFORE", "AFTER", "INSTEAD OF"])
const LevelNarrow: z.ZodType<DbTriggerLevel> = z.enum(["ROW", "STATEMENT"])

const parseEvents = (raw: string): readonly DbTriggerEvent[] => {
  const parts = raw
    .split(/\s+OR\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
  return EventArraySchema.parse(parts)
}

export const parseTriggersFile = (
  schema: string,
  sourceFile: string,
  content: string
): readonly ParsedTrigger[] => {
  const out: ParsedTrigger[] = []
  const lines = content.split(/\r?\n/)
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? ""
    if (!line.startsWith("CREATE TRIGGER")) continue
    const m = TriggerMatchSchema.parse(TRIGGER_RE.exec(line))
    if (m === null) {
      throw new Error(
        `db-trigger producer: unrecognized CREATE TRIGGER shape at ${sourceFile}:${i + 1}\n  ${line}`
      )
    }
    const [
      name,
      timingRaw,
      eventsRaw,
      tableSchema,
      tableName,
      levelRaw,
      functionSchema,
      functionName,
    ] = m
    out.push({
      schema,
      name,
      timing: TimingNarrow.parse(timingRaw),
      events: parseEvents(eventsRaw),
      tableSchema,
      tableName,
      level: LevelNarrow.parse(levelRaw),
      functionSchema,
      functionName,
      sourceFile,
      line: i + 1,
    })
  }
  return out
}

const SCHEMA_DIR = "packages/shared/supabase/database/schema"
const TRIGGERS_FILE_NAME = "_triggers.sql"

export type DiscoveredTriggerFile = {
  readonly schema: string
  readonly relPath: string
  readonly content: string
}

export const discoverTriggerFiles = (
  ctx: BuildContext,
  repo: Repo
): readonly DiscoveredTriggerFile[] => {
  const out: DiscoveredTriggerFile[] = []
  for (const rel of repoFiles(ctx, repo)) {
    if (!rel.startsWith(`${SCHEMA_DIR}/`)) continue
    const parts = rel.slice(SCHEMA_DIR.length + 1).split("/")
    if (parts.length !== 2) continue
    const [schema = "", fileName = ""] = parts
    if (fileName !== TRIGGERS_FILE_NAME) continue
    if (schema === "") continue
    const content = readRepoFile(ctx, repo, rel)
    if (content === null) continue
    out.push({ schema, relPath: rel, content })
  }
  out.sort((a, b) => (a.schema < b.schema ? -1 : a.schema > b.schema ? 1 : 0))
  return out
}

export const discoverAllTriggers = (ctx: BuildContext, repo: Repo): readonly ParsedTrigger[] => {
  const out: ParsedTrigger[] = []
  for (const file of discoverTriggerFiles(ctx, repo)) {
    for (const t of parseTriggersFile(file.schema, file.relPath, file.content)) {
      out.push(t)
    }
  }
  return out
}
