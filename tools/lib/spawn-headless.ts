#!/usr/bin/env bun

import { openSync, writeSync } from "node:fs"
import { type BunPtyTerminal, spawnPty } from "./bun-pty.ts"
import {
  createRisingEdgeDetector,
  DEV_CHANNEL_MARKER,
  INJECT_DELAY_MS,
} from "./pty-proxy-detector.ts"

const COLS = 120
const ROWS = 40

interface ParsedArgs {
  logPath: string
  command: readonly string[]
}

function parseArgs(argv: readonly string[]): ParsedArgs {
  let logPath: string | undefined
  let i = 0
  while (i < argv.length && argv[i] !== "--") {
    if (argv[i] === "--log") {
      logPath = argv[i + 1]
      i += 2
      continue
    }
    process.stderr.write(`spawn-headless: unexpected argument "${argv[i]}"\n`)
    process.exit(2)
  }
  if (argv[i] === "--") i += 1
  const command = argv.slice(i)
  if (logPath == null || logPath.length === 0) {
    process.stderr.write("spawn-headless: missing --log <path>\n")
    process.exit(2)
  }
  if (command.length === 0) {
    process.stderr.write(
      "spawn-headless: no command given (usage: spawn-headless --log <path> -- <command> [args...])\n"
    )
    process.exit(2)
  }
  return { logPath, command }
}

async function main(): Promise<number> {
  const { logPath, command } = parseArgs(process.argv.slice(2))

  const logFd = openSync(logPath, "a")
  const detector = createRisingEdgeDetector(DEV_CHANNEL_MARKER)

  const proc = spawnPty(command, {
    cwd: process.cwd(),
    env: process.env,
    terminal: {
      cols: COLS,
      rows: ROWS,
      data(term: BunPtyTerminal, chunk: Uint8Array): undefined {
        try {
          writeSync(logFd, chunk)
        } catch {
        }
        if (detector.push(chunk)) {
          setTimeout(() => {
            try {
              term.write("\r")
            } catch {
            }
          }, INJECT_DELAY_MS)
        }
      },
    },
  })

  const term = proc.terminal

  const forward = (): undefined => {
    try {
      proc.kill()
    } catch {
      try {
        term.close()
      } catch {
      }
    }
  }
  process.on("SIGTERM", forward)
  process.on("SIGHUP", forward)

  return await proc.exited
}

const code = await main()
process.exit(code)
