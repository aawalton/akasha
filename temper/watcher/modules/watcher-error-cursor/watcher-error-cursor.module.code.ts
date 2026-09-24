import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { watcherLogDir } from "akasha/temper/watcher/modules/watcher-paths/watcher-paths.module.code.ts"
import { z } from "zod"

export const CURSOR_FILENAME = "temper-errors-cursor.json"

const CURSOR_SHAPE = z.record(z.string(), z.number())

export function cursorPath(): string {
  return join(watcherLogDir(), CURSOR_FILENAME)
}

export function unreadCursorWhy(path: string): string {
  return `the error cursor at ${path} is no record of counts by signature, so reading it as nothing carried up yet would drop the history it holds and send every error up again`
}

export function parseErrorCursor(path: string, raw: string): ReadonlyMap<string, number> {
  let read: ReturnType<typeof CURSOR_SHAPE.safeParse>
  try {
    read = CURSOR_SHAPE.safeParse(JSON.parse(raw))
  } catch {
    throw new Error(unreadCursorWhy(path))
  }
  if (!read.success) throw new Error(unreadCursorWhy(path))
  return new Map(Object.entries(read.data))
}

export function serializeErrorCursor(seen: ReadonlyMap<string, number>): string {
  const record: Record<string, number> = {}
  for (const [key, value] of seen) record[key] = value
  return JSON.stringify(record)
}

export function loadErrorCursor(path: string = cursorPath()): ReadonlyMap<string, number> {
  if (!existsSync(path)) return new Map()
  return parseErrorCursor(path, readFileSync(path, "utf8"))
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
