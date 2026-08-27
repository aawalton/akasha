export const summary = "Print the live tower-session state (human summary, or full TowerState JSON with --json)"

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
    { name: "--json", description: "Emit the full TowerState as JSON" },
  ],
  positionals: [
    { name: "slug", required: false, aliasOfFlag: "--slug", description: "Session slug" },
  ],
  exits: [{ code: 2, meaning: "No session found for the slug" }],
  examples: ["ops tower state", "ops tower state the-tower --json"],
}

export default async function towerState(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const slug = parsed.string("--slug") ?? DEFAULT_SLUG
  const game = parsed.string("--game") ?? DEFAULT_GAME
  const json = parsed.boolean("--json")

  const record = await getTowerSession(game, slug)
  if (record === null) {
    throw dataError(`no tower-session found for slug "${slug}" under game "${game}"`)
  }
  const { session } = record

  if (json) {
    process.stdout.write(`${JSON.stringify(session)}\n`)
    return
  }

  const { hud } = session
  process.stdout.write(
    `${record.externalId} — turn ${session.turn}\n` +
      `  level ${hud.level}${hud.class !== undefined ? ` ${hud.class}` : ""}` +
      `  HP ${hud.hp}/${hud.hpMax}  Focus ${hud.focus}/${hud.focusMax}  Stamina ${hud.stamina}/${hud.stamMax}\n` +
      `  ${session.log.length} beat(s), ${session.chapters.length} chapter(s)\n`
  )
}
