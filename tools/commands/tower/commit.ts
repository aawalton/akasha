export const summary = "Persist a TowerState JSON as the live tower-session — the write half of a turn"

import { readFile } from "node:fs/promises"
import { parseTowerState, type TowerState } from "@alanwalton/tower-core/state-schema"
import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { upsertTowerSession } from "../../lib/tower-game-access.ts"

const DEFAULT_SLUG = "the-tower"
const DEFAULT_GAME = "the-tower"

export const help: CommandHelp = {
  positionals: [
    {
      name: "state",
      required: false,
      aliasOfFlag: "--state",
      description: "TowerState JSON file ('-' for stdin)",
    },
  ],
  flags: [
    {
      name: "--state",
      argLabel: "<path|->",
      valueShape: "token",
      required: true,
      description: "TowerState JSON file ('-' for stdin)",
    },
    {
      name: "--slug",
      argLabel: "<session-slug>",
      valueShape: "token",
      description: `Session slug (default: ${DEFAULT_SLUG})`,
    },
    {
      name: "--game",
      argLabel: "<game-slug>",
      valueShape: "token",
      description: `Game holding the session (default: ${DEFAULT_GAME})`,
    },
    { name: "--json", description: "Emit the result envelope as JSON" },
  ],
  exits: [
    { code: 2, meaning: "Missing/malformed TowerState input" },
    { code: 3, meaning: "Session upsert failed" },
  ],
  examples: [
    "ops tower commit --state /tmp/next-state.json",
    "ops tower snapshot | jq '.turn += 1' | ops tower commit --state - --json",
  ],
}

export default async function towerCommit(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const statePath = parsed.requireString("--state")
  const slug = parsed.string("--slug") ?? DEFAULT_SLUG
  const game = parsed.string("--game") ?? DEFAULT_GAME
  const json = parsed.boolean("--json")

  let raw: string
  try {
    raw = statePath === "-" ? await Bun.stdin.text() : await readFile(statePath, "utf8")
  } catch (err) {
    throw dataError(
      `cannot read --state: ${err instanceof Error ? err.message : String(err)}`
    )
  }

  let session: TowerState
  try {
    session = parseTowerState(raw)
  } catch (err) {
    throw dataError(
      `invalid TowerState: ${err instanceof Error ? err.message : String(err)}`
    )
  }

  let record: { readonly id: string; readonly externalId: string }
  try {
    record = await upsertTowerSession({ game, externalId: slug, session })
  } catch (err) {
    throw operationalError(err instanceof Error ? err.message : String(err))
  }

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ id: record.id, externalId: record.externalId, turn: session.turn })}\n`
    )
    return
  }
  process.stdout.write(
    `committed tower-session "${record.externalId}" at turn ${session.turn} (${record.id})\n`
  )
}
