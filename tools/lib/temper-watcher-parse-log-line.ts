import { requireMatchPositional } from "@shared/utils-narrow/require-match-positional"
import { z } from "zod"

const WATCHER_RE = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z) (INFO|ERROR) (.*)$/
const TRAY_RE = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z) \[(INFO|ERROR|WARN)\] (.*)$/

const WATCHER_MATCH_SCHEMA = z.tuple([z.string(), z.enum(["INFO", "ERROR"]), z.string()])
const TRAY_MATCH_SCHEMA = z.tuple([z.string(), z.enum(["INFO", "ERROR", "WARN"]), z.string()])

export type LogSource = "watcher" | "tray"
export type LogLevel = "INFO" | "ERROR" | "WARN"

export interface ParsedLogLine {
  readonly timestamp: string
  readonly line: string
  readonly source: LogSource
  readonly level: LogLevel
}

export function parseLogLine(line: string, source: LogSource): ParsedLogLine | null {
  const re = source === "watcher" ? WATCHER_RE : TRAY_RE
  const schema = source === "watcher" ? WATCHER_MATCH_SCHEMA : TRAY_MATCH_SCHEMA
  let captures: readonly [string, LogLevel, string]
  try {
    captures = requireMatchPositional(re, schema, line)
  } catch {
    return null
  }
  const [timestamp, level, message] = captures
  return { timestamp, line: message, source, level }
}
