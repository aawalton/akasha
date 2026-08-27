export const summary =
  "Rewrite the settings file every live seat is watching, so a hook or permission change reaches the running fleet without a restart"

import { readFileSync, writeFileSync } from "node:fs"
import { dataError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { liveSettingsPaths } from "../../lib/live-settings.ts"
import {
  AGENT_SETTINGS_PATH,
  readAgentSettingsBase,
  refreshedSettings,
} from "../../lib/supervisor-spawn-settings.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [{ name: "--json", description: "Emit a JSON record instead of TSV" }],
  exits: [
    { code: 0, meaning: "success (every live settings file read, and rewritten where it differed)" },
    { code: 1, meaning: "input error (unknown flag)" },
    { code: 2, meaning: "data error (the settings document could not be read, or no live seat was found)" },
  ],
  examples: ["ops seat refresh-settings", "ops seat refresh-settings --json"],
}

type Outcome = "refreshed" | "unchanged" | "unreadable"

interface Row {
  readonly path: string
  readonly outcome: Outcome
}

function objectIn(said: string): Record<string, unknown> | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(said)
  } catch {
    return null
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return null
  return parsed as Record<string, unknown>
}

function refresh(path: string, base: Record<string, unknown>): Row {
  let was: string
  try {
    was = readFileSync(path, "utf8")
  } catch {
    return { path, outcome: "unreadable" }
  }
  const existing = objectIn(was)
  if (existing === null) return { path, outcome: "unreadable" }
  const contents = JSON.stringify(refreshedSettings(existing, base))
  if (contents === was) return { path, outcome: "unchanged" }
  writeFileSync(path, contents)
  return { path, outcome: "refreshed" }
}

export default async function agentRefreshSettings(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const base = await readAgentSettingsBase()
  if (base.kind !== "loaded") {
    throw dataError(`${AGENT_SETTINGS_PATH} could not be read, so nothing can be written: ${base.reason}`)
  }
  const paths = liveSettingsPaths()
  if (paths.length === 0) {
    throw dataError(
      "no running process names a spawned settings file, which on this workstation means the scan " +
        "failed rather than that the fleet is empty"
    )
  }
  const rows: readonly Row[] = paths.map((path) => refresh(path, base.settings))
  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify({ rows })}\n`)
    return
  }
  for (const row of rows) process.stdout.write(`${row.path}\t${row.outcome}\n`)
}
