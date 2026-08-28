export const summary = "Stop one (--seq + --app) or all (--all) running dev servers (idempotent)"

import { existsSync, unlinkSync } from "node:fs"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  APP_NAMES,
  type DevServerState,
  errnoCode,
  isPidAlive,
  listStateFiles,
  lookupApp,
  readStateFile,
  stateFilePath,
} from "../../lib/dev-server-ops.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--seq",
      argLabel: "<n>",
      valueShape: "token",
      description: "Branch sequence number (integer)",
    },
    {
      name: "--app",
      argLabel: "<name>",
      valueShape: "token",
      description: `App identifier (one of: ${APP_NAMES.join(", ")})`,
    },
    { name: "--all", description: "Stop every state-file-tracked dev server" },
    { name: "--json", description: "Emit JSON result instead of human-readable lines" },
  ],
  mutuallyExclusive: [
    ["--seq", "--all"],
    ["--app", "--all"],
  ],
  exits: [
    { code: 1, meaning: "input error: neither --all nor (--seq + --app) supplied" },
    { code: 3, meaning: "operational error: SIGKILL fallback failed" },
  ],
  examples: [
    "ops dev-server stop --seq 8485 --app alanwalton",
    "ops dev-server stop --all",
    "ops dev-server stop --all --json",
  ],
}

interface StopResult {
  readonly seq: number
  readonly app: string
  readonly pid: number
  readonly was_running: boolean
}

const TERM_POLL_MS = 100
const TERM_TIMEOUT_MS = 5000

async function stopOne(state: DevServerState): Promise<StopResult> {
  const { pid, seq, app } = state
  let was_running = false
  if (isPidAlive(pid)) {
    was_running = true
    try {
      process.kill(pid, "SIGTERM")
    } catch (err) {
      if (errnoCode(err) !== "ESRCH") {
        const msg = err instanceof Error ? err.message : String(err)
        throw operationalError(
          `failed to SIGTERM pid=${pid} for seq=${seq} app=${app}: ${msg}`
        )
      }
      was_running = false
    }
    const deadline = Date.now() + TERM_TIMEOUT_MS
    while (Date.now() < deadline) {
      if (!isPidAlive(pid)) break
      await new Promise((resolve) => setTimeout(resolve, TERM_POLL_MS))
    }
    if (isPidAlive(pid)) {
      try {
        process.kill(pid, "SIGKILL")
      } catch (err) {
        if (errnoCode(err) !== "ESRCH") {
          const msg = err instanceof Error ? err.message : String(err)
          throw operationalError(`SIGKILL failed for pid=${pid} seq=${seq} app=${app}: ${msg}`)
        }
      }
    }
  }
  const path = stateFilePath(seq, app)
  if (existsSync(path)) unlinkSync(path)
  return { seq, app, pid, was_running }
}

export default async function devServerStop(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const all = parsed.boolean("--all")
  const seqRaw = parsed.string("--seq")
  const appName = parsed.string("--app")
  const json = parsed.boolean("--json")

  let states: readonly DevServerState[]
  if (all) {
    states = listStateFiles()
  } else {
    if (seqRaw === undefined || appName === undefined) {
      throw inputError("either --all, or both --seq and --app, are required")
    }
    const seq = parsed.requireNonNegativeInt("--seq")
    await lookupApp(appName)
    const state = readStateFile(seq, appName)
    if (!state) {
      const result: StopResult = { seq, app: appName, pid: 0, was_running: false }
      if (json) {
        process.stdout.write(`${JSON.stringify({ stopped: [result] })}\n`)
      } else {
        process.stdout.write(`stopped seq=${seq} app=${appName} pid=0 (was stopped)\n`)
      }
      return
    }
    states = [state]
  }

  const results: StopResult[] = []
  for (const state of states) {
    results.push(await stopOne(state))
  }

  if (json) {
    process.stdout.write(`${JSON.stringify({ stopped: results })}\n`)
    return
  }
  if (results.length === 0) {
    process.stdout.write("no dev servers to stop\n")
    return
  }
  for (const result of results) {
    const status = result.was_running ? "was running" : "was stopped"
    process.stdout.write(`stopped seq=${result.seq} app=${result.app} pid=${result.pid} (${status})\n`)
  }
}
