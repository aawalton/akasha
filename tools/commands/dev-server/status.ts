export const summary = "Report running/stopped status for one or all dev servers"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  APP_NAMES,
  type DevServerState,
  isPidAlive,
  listStateFiles,
  lookupApp,
  readStateFile,
} from "../../lib/dev-server-ops.ts"
import {
  type DevServerRecord,
  devServerTsvLine,
  recordFromState,
  stoppedRecord,
} from "../../lib/dev-server-record.ts"

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
    { name: "--json", description: "Emit JSON array instead of TSV" },
  ],
  examples: [
    "ops dev-server status",
    "ops dev-server status --seq 8485 --app alanwalton",
    "ops dev-server status --json",
  ],
}

export default async function devServerStatus(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const seqRaw = parsed.string("--seq")
  const appName = parsed.string("--app")
  const json = parsed.boolean("--json")

  const toRecord = (state: DevServerState): DevServerRecord =>
    recordFromState(state, isPidAlive(state.pid))

  let records: readonly DevServerRecord[]
  if (seqRaw !== undefined && appName !== undefined) {
    const seq = parsed.requireNonNegativeInt("--seq")
    await lookupApp(appName)
    const state = readStateFile(seq, appName)
    records = state ? [toRecord(state)] : [stoppedRecord(seq, appName)]
  } else if (seqRaw === undefined && appName === undefined) {
    records = listStateFiles().map(toRecord)
  } else {
    records = listStateFiles()
      .map(toRecord)
      .filter((record) =>
        seqRaw !== undefined ? String(record.seq) === seqRaw : record.app === appName
      )
  }

  if (json) {
    process.stdout.write(`${JSON.stringify(records)}\n`)
    return
  }
  if (records.length === 0) return
  for (const record of records) {
    process.stdout.write(`${devServerTsvLine(record)}\n`)
  }
}
