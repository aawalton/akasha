import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { watcherLogDir } from "../../../shared-foundation-misc-eso-paths/src/eso-paths"
import { z } from "zod"

const CURSOR_FILENAME = "temper-errors-cursor.json"

const cursorSchema = z.record(z.string(), z.number())

function cursorPath(): string {
  return join(watcherLogDir(), CURSOR_FILENAME)
}

export function loadErrorCursor(): ReadonlyMap<string, number> {
  const path = cursorPath()
  if (!existsSync(path)) return new Map()
  try {
    const raw: unknown = JSON.parse(readFileSync(path, "utf8"))
    const parsed = cursorSchema.safeParse(raw)
    if (!parsed.success) return new Map()
    return new Map(Object.entries(parsed.data))
  } catch {
    return new Map()
  }
}

export function saveErrorCursor(seen: ReadonlyMap<string, number>): undefined {
  const path = cursorPath()
  const dir = dirname(path)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  const record: Record<string, number> = {}
  for (const [key, value] of seen) record[key] = value
  writeFileSync(path, JSON.stringify(record))
}
