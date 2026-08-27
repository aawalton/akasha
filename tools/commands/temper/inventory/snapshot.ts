
export const summary = "Reassemble a stored inventory snapshot (header + chunks) into the full InventoryDatabase JSON"

import { writeFile } from "node:fs/promises"
import type { CommandHelp } from "../../../ops/surface.ts"
import { dataError, inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import {
  assembleSnapshot,
  latestSnapshot,
  SNAPSHOT_PAGE_TYPE,
  snapshotChunks,
  snapshotWithId,
} from "../../../lib/temper-inventory/snapshot-read.ts"
import { USER_ID } from "../../../lib/user-id.ts"

const INDENT = 2

export const help: CommandHelp = {
  positionals: [
    {
      name: "<snapshot-id>",
      description: "Snapshot page id (UUID). Mutually exclusive with --latest.",
      required: false,
    },
  ],
  flags: [
    {
      name: "--latest",
      description: "Resolve to the newest snapshot on the account (ordered by data-timestamp desc).",
    },
    {
      name: "--out",
      argLabel: "<path>",
      valueShape: "token",
      description: "Write the reassembled JSON to this file instead of stdout.",
    },
    {
      name: "--json",
      description: "Emit single-line JSON (default is 2-space pretty-printed).",
    },
  ],
  envVars: [
    {
      name: "USER_ID",
      description: "Override the account --latest reads against (defaults to Alan's).",
    },
  ],
  exits: [
    { code: 2, meaning: "snapshot id not found, or --latest found no snapshots on the account" },
    { code: 2, meaning: "chunk reassembly failed (no chunks, or JSON.parse error)" },
  ],
  examples: [
    "ops temper inventory snapshot 019dbb6c-3632-7cdd-822b-a9a71f80c9d4",
    "ops temper inventory snapshot --latest",
    "ops temper inventory snapshot --latest --json",
    "ops temper inventory snapshot --latest --out /var/tmp/snap.json",
  ],
}

export default async function temperInventorySnapshot(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const snapshotIdArg = parsed.positionals[0]
  const latest = parsed.boolean("--latest")
  const outPath = parsed.string("--out")
  const jsonOneLine = parsed.boolean("--json")

  if (snapshotIdArg !== undefined && latest) {
    throw inputError("<snapshot-id> and --latest are mutually exclusive; pass one, not both")
  }
  if (snapshotIdArg === undefined && !latest) {
    throw inputError("either <snapshot-id> or --latest is required")
  }

  const header = latest
    ? await latestSnapshot(USER_ID)
    : await snapshotWithId(snapshotIdArg ?? "")

  if (header === null) {
    if (latest) {
      throw dataError(`no ${SNAPSHOT_PAGE_TYPE} pages found on account '${USER_ID}'`)
    }
    throw dataError(`${SNAPSHOT_PAGE_TYPE} with id='${snapshotIdArg}' not found`)
  }

  const chunks = await snapshotChunks(header.slug)
  const db = await assembleSnapshot(chunks)
  if (db === null) {
    throw dataError(
      `failed to reassemble inventory for snapshot id='${header.id}' (chunks=${chunks.length}, expected=${header["chunk-count"]})`
    )
  }

  const out = jsonOneLine ? JSON.stringify(db) : JSON.stringify(db, null, INDENT)
  if (outPath !== undefined) {
    await writeFile(outPath, `${out}\n`, "utf8")
    return
  }
  process.stdout.write(`${out}\n`)
}
