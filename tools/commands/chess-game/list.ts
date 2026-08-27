export const summary = "List chess games for review (filter by source / outcome)"

import type { CommandHelp } from "../../ops/surface.ts"
import { dataError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { answer, type Test, textOf } from "../../lib/page-query.ts"
import { resolveRoots } from "../../../repo/roots/roots"

const CHESS_GAME = "chess-game"

const DEFAULT_LIMIT = 50

export const help: CommandHelp = {
  flags: [
    {
      name: "--handle",
      argLabel: "<handle>",
      valueShape: "token",
      description: "Filter to one account handle",
    },
    {
      name: "--source",
      argLabel: "<master-games>",
      valueShape: "token",
      description: "Filter to one source",
    },
    {
      name: "--outcome",
      argLabel: "<win|loss|draw>",
      valueShape: "token",
      description: "Filter to the imported player's result",
    },
    {
      name: "--collection",
      argLabel: "<endgame-classics|positional-masterpieces|closed-structures>",
      valueShape: "token",
      description: "Filter to one labelled sub-collection",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      description: `Max rows (default ${DEFAULT_LIMIT})`,
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "games listed" },
    { code: 1, meaning: "query failure" },
  ],
  examples: [
    "ops chess-game list",
    "ops chess-game list --collection endgame-classics",
    "ops chess-game list --source master-games --json",
  ],
}

export default async function chessGameList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const handle = parsed.string("--handle")
  const source = parsed.string("--source")
  const outcome = parsed.string("--outcome")
  const collection = parsed.string("--collection")
  const limit = parsed.nonNegativeInt("--limit") ?? DEFAULT_LIMIT
  const json = parsed.boolean("--json")

  const where: Test[] = []
  if (handle !== undefined) where.push({ key: "handle", is: handle })
  if (source !== undefined) where.push({ key: "source", is: source })
  if (outcome !== undefined) where.push({ key: "outcome", is: outcome })
  if (collection !== undefined) where.push({ key: "collection", is: collection })

  const got = answer(resolveRoots(), {
    pageType: CHESS_GAME,
    where,
    sortBy: "playedAt",
    descending: true,
    limit,
  })
  if (got === null) throw dataError(`\`${CHESS_GAME}\` names no page type whose pages are files`)

  const games = got.rows.map((row) => ({
    id: textOf(row.values, "id"),
    playedAt: textOf(row.values, "playedAt"),
    title: textOf(row.values, "title") ?? textOf(row.values, "slug") ?? "",
    outcome: textOf(row.values, "outcome"),
    result: textOf(row.values, "result"),
    source: textOf(row.values, "source"),
    sourceUrl: textOf(row.values, "sourceUrl"),
    collection: textOf(row.values, "collection"),
    lesson: textOf(row.values, "lesson"),
  }))

  if (json) {
    process.stdout.write(`${JSON.stringify({ count: games.length, games })}\n`)
    return
  }
  if (games.length === 0) {
    process.stdout.write("no games found\n")
    return
  }
  for (const game of games) {
    const date = game.playedAt?.slice(0, 10) ?? "?"
    process.stdout.write(
      `${game.id}\t${date}\t${game.outcome ?? "-"}\t${game.result ?? "-"}\t${game.source ?? "-"}\t${game.lesson ?? "-"}\t${game.title}\n`
    )
  }
}
