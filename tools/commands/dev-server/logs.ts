export const summary = "Tail the captured stdout+stderr log of a dev server (with --follow)"

import { existsSync, statSync, watch } from "node:fs"
import { open } from "node:fs/promises"
import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { APP_NAMES, logFilePath, lookupApp } from "../../lib/dev-server-ops.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--seq",
      argLabel: "<n>",
      valueShape: "token",
      required: true,
      description: "Branch sequence number (integer)",
    },
    {
      name: "--app",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      description: `App identifier (one of: ${APP_NAMES.join(", ")})`,
    },
    {
      name: "--tail",
      argLabel: "<n>",
      valueShape: "token",
      default: "100",
      description: "Number of trailing lines to emit before exit (or before --follow takes over)",
    },
    {
      name: "--follow",
      description: "Keep the stream open and emit new lines as they're appended (Ctrl+C to exit)",
    },
  ],
  positionals: [
    {
      name: "seq",
      required: false,
      aliasOfFlag: "--seq",
      description: "Branch sequence number (integer)",
    },
  ],
  exits: [
    { code: 1, meaning: "input error: missing flag, unknown app, --tail not a positive integer" },
    { code: 2, meaning: "data error: log file does not exist (server never started)" },
  ],
  examples: [
    "ops dev-server logs 8485 --app alanwalton",
    "ops dev-server logs --seq 8485 --app alanwalton",
    "ops dev-server logs --seq 8485 --app alanwalton --tail 500",
    "ops dev-server logs --seq 8485 --app alanwalton --follow",
  ],
}

const READ_CHUNK = 64 * 1024

async function readLastLines(path: string, lineCount: number): Promise<{ buffer: string }> {
  const handle = await open(path, "r")
  try {
    const stat = await handle.stat()
    let pos = stat.size
    let collected = ""
    let lines = 0
    while (pos > 0 && lines <= lineCount) {
      const chunkSize = Math.min(READ_CHUNK, pos)
      pos -= chunkSize
      const buf = Buffer.alloc(chunkSize)
      await handle.read(buf, 0, chunkSize, pos)
      collected = buf.toString("utf8") + collected
      lines = collected.match(/\n/g)?.length ?? 0
    }
    if (lines > lineCount) {
      const split = collected.split("\n")
      collected = split.slice(split.length - lineCount - 1).join("\n")
    }
    return { buffer: collected }
  } finally {
    await handle.close()
  }
}

export default async function devServerLogs(args: readonly string[]): Promise<void> {
  process.stdout.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EPIPE") process.exit(0)
    throw err
  })

  const parsed = parseArgs(help, args)
  const seq = parsed.requireNonNegativeInt("--seq")
  const appName = parsed.requireString("--app")
  const tailLines = parsed.nonNegativeInt("--tail") ?? 100
  if (tailLines === 0) {
    throw inputError("--tail must be a positive integer (got 0)")
  }
  const follow = parsed.boolean("--follow")

  await lookupApp(appName)
  const path = logFilePath(seq, appName)
  if (!existsSync(path)) {
    throw dataError(`log file does not exist: ${path} — has the server been started?`)
  }

  const { buffer } = await readLastLines(path, tailLines)
  process.stdout.write(buffer)
  if (!buffer.endsWith("\n") && buffer.length > 0) {
    process.stdout.write("\n")
  }

  if (!follow) return

  let position = statSync(path).size
  await new Promise<void>((resolve) => {
    const watcher = watch(path, async () => {
      try {
        const size = statSync(path).size
        if (size === position) return
        if (size < position) {
          position = 0
        }
        const handle = await open(path, "r")
        try {
          const buf = Buffer.alloc(size - position)
          await handle.read(buf, 0, buf.length, position)
          position = size
          process.stdout.write(buf.toString("utf8"))
        } finally {
          await handle.close()
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        process.stderr.write(`logs: follow error: ${msg}\n`)
      }
    })
    const onSig = (): undefined => {
      watcher.close()
      resolve()
    }
    process.once("SIGINT", onSig)
    process.once("SIGTERM", onSig)
  })
}
