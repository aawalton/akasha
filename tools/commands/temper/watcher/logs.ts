export const summary = "Read workstation watcher.log + tray.log as JSONL ({timestamp, line, source, level}) — mirrors `ops loki logs`."

import { readFile } from "node:fs/promises"
import { join } from "node:path"
import type { CommandHelp } from "../../../ops/surface.ts"
import { dataError, inputError } from "../../../lib/exit.ts"
import { parseLokiDuration } from "../../../lib/loki-fetch.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { mergeNewestFirst } from "../../../lib/temper-watcher-merge-newest-first.ts"
import { watcherLogDir } from "@temper/shared-foundation-misc-eso-paths"
import {
  type LogSource,
  type ParsedLogLine,
  parseLogLine,
} from "../../../lib/temper-watcher-parse-log-line.ts"

const LOG_DIR_FLAG = "--log-dir"

export const help: CommandHelp = {
  flags: [
    {
      name: "--since",
      argLabel: "<duration>",
      valueShape: "token",
      default: "1h",
      description:
        "Filter to records newer than this duration ago (e.g., 30m, 1h, 7d). " +
        "Supported units: s, m, h, d.",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      default: "500",
      description: "Cap the merged newest-first set at the most-recent <n> records",
    },
    {
      name: "--json",
      description:
        "Emit a single aggregate object `{lines, count}` instead of the default JSONL stream",
    },
    {
      name: "--log-dir",
      argLabel: "<path>",
      valueShape: "token",
      default: "/home/walton/.local/state/temper-watcher",
      description:
        "Directory containing watcher.log + tray.log (default: /home/walton/.local/state/temper-watcher). " +
        "Primarily a test-only override; production callers use the default.",
    },
  ],
  examples: [
    "ops temper watcher logs",
    "ops temper watcher logs --since 30m --limit 200",
    "ops temper watcher logs --json",
  ],
}

async function readLogFile(
  path: string,
  source: LogSource
): Promise<{ readonly records: readonly ParsedLogLine[]; readonly missing: boolean }> {
  let raw: string
  try {
    raw = await readFile(path, "utf8")
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      return { records: [], missing: true }
    }
    throw err
  }

  const records: ParsedLogLine[] = []
  const lines = raw.split("\n")
  for (const line of lines) {
    if (line.trim() === "") continue
    const parsed = parseLogLine(line, source)
    if (parsed === null) {
      process.stderr.write(`warn: failed to parse ${source} log line: ${line}\n`)
      continue
    }
    records.push(parsed)
  }
  return { records, missing: false }
}

function supplied(args: readonly string[], flag: string): boolean {
  for (const token of args) {
    if (token === "--") return false
    if (token === flag || token.startsWith(`${flag}=`)) return true
  }
  return false
}

async function parsePositiveInt(flag: string, value: string): Promise<number> {
  const n = Number(value)
  if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 0) {
    throw inputError(`${flag} must be a positive integer, got: ${value}`)
  }
  return n
}

export default async function watcherLogs(args: readonly string[]): Promise<void> {
  process.stdout.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EPIPE") process.exit(0)
    throw err
  })

  const parsed = parseArgs(help, args)

  const since = parsed.string("--since") ?? "1h"
  const sinceMs = parseLokiDuration("--since", since)
  const limit = await parsePositiveInt("--limit", parsed.string("--limit") ?? "500")
  const json = parsed.boolean("--json")
  const logDir = supplied(args, LOG_DIR_FLAG)
    ? (parsed.string(LOG_DIR_FLAG) ?? watcherLogDir())
    : watcherLogDir()

  const watcherPath = join(logDir, "watcher.log")
  const trayPath = join(logDir, "tray.log")

  const [watcherResult, trayResult] = await Promise.all([
    readLogFile(watcherPath, "watcher"),
    readLogFile(trayPath, "tray"),
  ])

  if (watcherResult.missing && trayResult.missing) {
    throw dataError(
      `no log files found — looked for ${watcherPath} and ${trayPath} (set --log-dir to point at a directory containing watcher.log and/or tray.log)`
    )
  }
  if (watcherResult.missing) {
    process.stderr.write(`warn: missing log file (continuing without it): ${watcherPath}\n`)
  }
  if (trayResult.missing) {
    process.stderr.write(`warn: missing log file (continuing without it): ${trayPath}\n`)
  }

  const cutoffMs = Date.now() - sinceMs
  const merged = mergeNewestFirst(watcherResult.records, trayResult.records, cutoffMs)
  const capped = merged.slice(0, limit)

  if (json) {
    process.stdout.write(`${JSON.stringify({ lines: capped, count: capped.length })}\n`)
    return
  }
  for (const entry of capped) {
    process.stdout.write(`${JSON.stringify(entry)}\n`)
  }
}
