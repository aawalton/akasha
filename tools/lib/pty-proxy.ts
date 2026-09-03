#!/usr/bin/env bun

import { writeSync } from "node:fs"
import { applySttySane, TERMINAL_MODE_RESET } from "@akasha/seat-system/supervisor-terminal"
import { type BunPtyTerminal, spawnPty } from "./bun-pty.ts"
import {
  createRisingEdgeDetector,
  DEV_CHANNEL_MARKER,
  INJECT_DELAY_MS,
} from "./pty-proxy-detector.ts"
import { createTerminalDeathController } from "./pty-terminal-death.ts"
import { createTypingMinuteRecorder } from "./typing-minutes.ts"

const TERMINAL_DEATH_GRACE_MS = 15_000

function cols(): number {
  return process.stdout.columns ?? 80
}

function rows(): number {
  return process.stdout.rows ?? 24
}

function restoreTerminal(): undefined {
  try {
    if (process.stdin.isTTY === true) process.stdin.setRawMode(false)
  } catch {}
  try {
    writeSync(1, TERMINAL_MODE_RESET)
  } catch {}
  applySttySane()
}

async function main(): Promise<number> {
  let command = process.argv.slice(2)
  if (command[0] === "--") command = command.slice(1)
  if (command.length === 0) {
    process.stderr.write("pty-proxy: no command given (usage: pty-proxy -- <command> [args...])\n")
    return 2
  }

  const detector = createRisingEdgeDetector(DEV_CHANNEL_MARKER)

  let onTerminalDeath: ((reason: string) => void) | undefined

  const proc = spawnPty(command, {
    cwd: process.cwd(),
    env: process.env,
    terminal: {
      cols: cols(),
      rows: rows(),
      data(term: BunPtyTerminal, chunk: Uint8Array): undefined {
        try {
          process.stdout.write(chunk)
        } catch {
          onTerminalDeath?.("stdout-write-throw")
        }
        if (detector.push(chunk)) {
          setTimeout(() => {
            try {
              term.write("\r")
            } catch {}
          }, INJECT_DELAY_MS)
        }
      },
    },
  })

  const term = proc.terminal

  const typingMinutes = createTypingMinuteRecorder({ pid: proc.pid })

  if (process.stdin.isTTY === true) process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on("data", (d: Uint8Array) => {
    try {
      term.write(d)
    } catch {}
    typingMinutes.note(Date.now())
  })

  process.on("SIGWINCH", () => {
    try {
      term.resize(cols(), rows())
    } catch {}
  })

  const forward = (): undefined => {
    try {
      proc.kill()
    } catch {
      try {
        term.close()
      } catch {}
    }
  }
  process.on("SIGTERM", forward)
  process.on("SIGHUP", forward)

  const death = createTerminalDeathController({
    sigtermChild: forward,
    sigkillChild: (): undefined => {
      try {
        proc.kill(9)
      } catch {}
    },
    exit: (): undefined => process.exit(0),
    schedule: (onElapsed: () => void): (() => void) => {
      const timer = setTimeout(onElapsed, TERMINAL_DEATH_GRACE_MS)
      timer.unref()
      return () => clearTimeout(timer)
    },
  })
  onTerminalDeath = (reason: string): undefined => {
    if (!death.onDeath()) return
    try {
      process.stderr.write(
        `pty-proxy: controlling terminal died (${reason}); tearing down supervisor tree\n`
      )
    } catch {}
  }
  process.stdin.on("end", () => onTerminalDeath?.("stdin-end"))
  process.stdin.on("close", () => onTerminalDeath?.("stdin-close"))
  process.stdin.on("error", () => onTerminalDeath?.("stdin-error"))
  process.stdout.on("error", () => onTerminalDeath?.("stdout-error"))
  process.stderr.on("error", () => onTerminalDeath?.("stderr-error"))

  process.on("exit", restoreTerminal)

  const code = await proc.exited
  death.onChildExited()
  return code
}

const code = await main()
restoreTerminal()
process.exit(code)
