import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { z } from "zod"
import { watcherLogDir } from "../watcher-paths/watcher-paths.module.code.ts"

export const CURSOR_FILENAME = "temper-errors-cursor.json"

const CURSOR_SHAPE = z.record(z.string(), z.number())

export function cursorPath(): string {
  return join(watcherLogDir(), CURSOR_FILENAME)
}

export function parseErrorCursor(raw: string): ReadonlyMap<string, number> {
  try {
    const read = CURSOR_SHAPE.safeParse(JSON.parse(raw) as unknown)
    return read.success ? new Map(Object.entries(read.data)) : new Map()
  } catch {
    return new Map()
  }
}

export function serializeErrorCursor(seen: ReadonlyMap<string, number>): string {
  const record: Record<string, number> = {}
  for (const [key, value] of seen) record[key] = value
  return JSON.stringify(record)
}

export function loadErrorCursor(path: string = cursorPath()): ReadonlyMap<string, number> {
  if (!existsSync(path)) return new Map()
  try {
    return parseErrorCursor(readFileSync(path, "utf8"))
  } catch {
    return new Map()
  }
}

export function saveErrorCursor(
  seen: ReadonlyMap<string, number>,
  path: string = cursorPath()
): undefined {
  const dir = dirname(path)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(path, serializeErrorCursor(seen))
  return undefined
}
