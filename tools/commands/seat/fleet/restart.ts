export const summary =
  "Cycle every seat whose client started before the settings standing now, so a registration change reaches the running fleet"

import { readdirSync, readFileSync, statSync } from "node:fs"
import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { operationalError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { seatsPresent } from "../../../lib/seat-roster.ts"

const SETTINGS =
  "akasha/seat-system/agent-settings/pages/agents/agents.agent-settings.harness-settings.json"

const CLI = new URL("../../../ops/cli.ts", import.meta.url).pathname

const CLIENT_MARK = "agent-settings"

const PROC = "/proc"

const DIGITS = /^\d+$/

export const help: CommandHelp = {
  flags: [
    { name: "--dry-run", description: "Name what is stale and cycle none of it" },
    { name: "--json", description: "Emit JSON records instead of the TSV summary" },
  ],
  examples: [
    "ops seat fleet restart",
    "ops seat fleet restart --dry-run",
    "ops seat fleet restart --json",
  ],
}

function settingsSettledAtMs(): number | null {
  const proc = Bun.spawnSync(["git", "log", "-1", "--format=%ct", "--", SETTINGS], {
    cwd: rootFor(resolveRoots(), AKASHA),
    stdout: "pipe",
    stderr: "ignore",
  })
  if ((proc.exitCode ?? 1) !== 0) return null
  const seconds = Number(new TextDecoder().decode(proc.stdout).trim())
  return Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : null
}

function clientStartedAtMs(agentId: string): number | null {
  const wanted = `AGENT_ID=${agentId}`
  for (const entry of readdirSync(PROC)) {
    if (!DIGITS.test(entry)) continue
    try {
      if (!readFileSync(`${PROC}/${entry}/cmdline`, "utf8").includes(CLIENT_MARK)) continue
      if (!readFileSync(`${PROC}/${entry}/environ`, "utf8").split("\0").includes(wanted)) continue
      return statSync(`${PROC}/${entry}`).mtimeMs
    } catch {}
  }
  return null
}

interface Reading {
  readonly name: string
  readonly agentId: string
  readonly startedAtMs: number | null
  readonly standing: "stale" | "current" | "unreadable"
}

function readFleet(settledAtMs: number): readonly Reading[] {
  return seatsPresent().map((seat) => {
    const startedAtMs = clientStartedAtMs(seat.id)
    const standing =
      startedAtMs === null ? "unreadable" : startedAtMs < settledAtMs ? "stale" : "current"
    return { name: seat.name ?? seat.id, agentId: seat.id, startedAtMs, standing }
  })
}

function cycle(name: string): string {
  const proc = Bun.spawnSync([process.execPath, CLI, "seat", "resume", name], {
    stdout: "pipe",
    stderr: "pipe",
  })
  const said = new TextDecoder().decode(proc.stdout).trim()
  if ((proc.exitCode ?? 1) !== 0) {
    const why = new TextDecoder().decode(proc.stderr).trim()
    return `refused: ${why === "" ? said : why}`
  }
  const columns = said.split("\n")[0]?.split("\t") ?? []
  return columns[columns.length - 1] ?? "restarted"
}

export default async function seatFleetRestart(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const dryRun = parsed.boolean("--dry-run")
  const json = parsed.boolean("--json")

  const settledAtMs = settingsSettledAtMs()
  if (settledAtMs === null) {
    throw operationalError(
      `no commit to ${SETTINGS} could be read, so nothing says which clients started behind it`
    )
  }

  const fleet = readFleet(settledAtMs)
  const own = process.env.AGENT_ID ?? ""
  const stale = fleet.filter((one) => one.standing === "stale")
  const ordered = [
    ...stale.filter((one) => one.agentId !== own),
    ...stale.filter((one) => one.agentId === own),
  ]

  const took = new Map<string, string>()
  if (!dryRun) {
    for (const one of ordered) took.set(one.agentId, cycle(one.name))
  }

  const records = fleet.map((one) => ({
    name: one.name,
    agentId: one.agentId,
    standing: one.standing,
    startedAtMs: one.startedAtMs,
    took: took.get(one.agentId) ?? (one.standing === "stale" ? "held" : one.standing),
  }))

  if (json) {
    process.stdout.write(`${JSON.stringify({ settledAtMs, seats: records }, null, 2)}\n`)
    return
  }
  for (const one of records) {
    process.stdout.write(`${one.name}\t${one.agentId}\t${one.took}\n`)
  }
  const unreadable = fleet.filter((one) => one.standing === "unreadable").length
  process.stdout.write(
    `${stale.length} of ${fleet.length} seat(s) behind ${SETTINGS}` +
      `${dryRun ? ", none cycled" : " cycled"}` +
      `${unreadable === 0 ? "" : `; ${unreadable} whose client could not be read, left alone`}\n`
  )
}
