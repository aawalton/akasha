export const summary = "Emit the tower-session's latest pages state as TowerState JSON — the read half of a turn"

import type { CommandHelp } from "../../ops/surface.ts"
import { dataError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { getTowerSession } from "../../lib/tower-game-access.ts"

const DEFAULT_SLUG = "the-tower"
const DEFAULT_GAME = "the-tower"

export const help: CommandHelp = {
  flags: [
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
    { name: "--pretty", description: "Indent the emitted JSON for human reading" },
  ],
  positionals: [
    { name: "slug", required: false, aliasOfFlag: "--slug", description: "Session slug" },
  ],
  exits: [{ code: 2, meaning: "No session found for the slug" }],
  examples: ["ops tower snapshot", "ops tower snapshot the-tower --pretty"],
}

export default async function towerSnapshot(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const slug = parsed.string("--slug") ?? DEFAULT_SLUG
  const game = parsed.string("--game") ?? DEFAULT_GAME
  const pretty = parsed.boolean("--pretty")

  const record = await getTowerSession(game, slug)
  if (record === null) {
    throw dataError(`no tower-session found for slug "${slug}" under game "${game}"`)
  }
  process.stdout.write(`${JSON.stringify(record.session, null, pretty ? 2 : undefined)}\n`)
}
