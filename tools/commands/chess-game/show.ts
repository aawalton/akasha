export const summary = "Show one chess game — metadata and full PGN — for review"

import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { answer } from "../../lib/page-query.ts"
import { type Row } from "../../lib/page-derive-shape.ts"
import { textOf } from "../../lib/page-query-values.ts"
import { resolveRoots } from "../../../repo/roots/roots"

export const help: CommandHelp = {
  flags: [
    {
      name: "--id",
      argLabel: "<id>",
      valueShape: "token",
      required: true,
      description: "The game page id",
    },
    { name: "--json", description: "Emit a JSON envelope instead of human text" },
  ],
  positionals: [
    { name: "id", required: false, aliasOfFlag: "--id", description: "The game page id" },
  ],
  exits: [
    { code: 0, meaning: "game shown" },
    { code: 1, meaning: "missing id / not found / query failure" },
  ],
  examples: [
    "ops chess-game show 019f06b1-e65c-7cff-b0bd-e4ae56bf9c3b",
    "ops chess-game show --id <id> --json",
  ],
}

const CHESS_GAME = "chess-game"

const PGN = "pgn"

const SHOWN = [
  "id",
  "title",
  "source",
  "sourceUrl",
  "handle",
  "playerColor",
  "outcome",
  "white",
  "whiteRating",
  "black",
  "blackRating",
  "playedAt",
  "rated",
  "variant",
  "speed",
  "timeControl",
  "result",
  "winner",
  "openingEco",
  "openingName",
  "ply",
  "collection",
  "lesson",
  "fen",
  PGN,
] as const

function fieldStr(page: Row, key: string): string | undefined {
  return textOf(page.values, key) ?? undefined
}

function fieldNum(page: Row, key: string): number | undefined {
  const value = fieldStr(page, key)
  if (value === undefined) return undefined
  const n = Number(value)
  return Number.isFinite(n) ? n : undefined
}

function displayTitle(page: Row): string {
  return fieldStr(page, "title") ?? fieldStr(page, "id") ?? ""
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default async function chessGameShow(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.requireString("--id")
  const json = parsed.boolean("--json")

  if (!UUID.test(id)) {
    throw inputError(
      `\`${id}\` is not a page id. A chess-game id is a uuid, as \`ops chess-game list\` prints in its first column.`
    )
  }

  const got = answer(resolveRoots(), {
    pageType: CHESS_GAME,
    where: [{ key: "id", is: id }],
    keys: [...SHOWN],
  })
  if (got === null) throw dataError(`\`${CHESS_GAME}\` names no page type whose pages are files`)
  const page = got.rows[0]
  if (page === undefined) throw inputError(`no chess-game found with id: ${id}`)

  const meta = {
    id: fieldStr(page, "id") ?? id,
    title: displayTitle(page),
    source: fieldStr(page, "source") ?? null,
    sourceUrl: fieldStr(page, "sourceUrl") ?? null,
    handle: fieldStr(page, "handle") ?? null,
    playerColor: fieldStr(page, "playerColor") ?? null,
    outcome: fieldStr(page, "outcome") ?? null,
    white: fieldStr(page, "white") ?? null,
    whiteRating: fieldNum(page, "whiteRating") ?? null,
    black: fieldStr(page, "black") ?? null,
    blackRating: fieldNum(page, "blackRating") ?? null,
    playedAt: fieldStr(page, "playedAt") ?? null,
    rated: fieldStr(page, "rated") === "true",
    variant: fieldStr(page, "variant") ?? null,
    speed: fieldStr(page, "speed") ?? null,
    timeControl: fieldStr(page, "timeControl") ?? null,
    result: fieldStr(page, "result") ?? null,
    winner: fieldStr(page, "winner") ?? null,
    openingEco: fieldStr(page, "openingEco") ?? null,
    openingName: fieldStr(page, "openingName") ?? null,
    ply: fieldNum(page, "ply") ?? null,
    collection: fieldStr(page, "collection") ?? null,
    lesson: fieldStr(page, "lesson") ?? null,
    fen: fieldStr(page, "fen") ?? null,
    pgn: fieldStr(page, PGN) ?? "",
  }

  if (json) {
    process.stdout.write(`${JSON.stringify(meta)}\n`)
    return
  }

  process.stdout.write(`${meta.title}\n`)
  process.stdout.write(`  source       ${meta.source} (${meta.sourceUrl})\n`)
  process.stdout.write(`  handle       ${meta.handle} (${meta.playerColor ?? "?"})\n`)
  process.stdout.write(`  outcome      ${meta.outcome ?? "-"}  result ${meta.result ?? "-"}\n`)
  process.stdout.write(
    `  white        ${meta.white} (${meta.whiteRating ?? "?"})\n` +
      `  black        ${meta.black} (${meta.blackRating ?? "?"})\n`
  )
  process.stdout.write(`  played       ${meta.playedAt ?? "-"}\n`)
  process.stdout.write(
    `  format       ${meta.variant ?? "-"} ${meta.speed ?? ""} ${meta.timeControl ?? ""} ${meta.rated === true ? "rated" : "casual"}\n`
  )
  if (meta.openingName !== null || meta.openingEco !== null) {
    process.stdout.write(`  opening      ${meta.openingEco ?? ""} ${meta.openingName ?? ""}\n`)
  }
  if (meta.collection !== null) {
    process.stdout.write(`  collection   ${meta.collection}\n`)
  }
  if (meta.lesson !== null) {
    process.stdout.write(`  lesson       ${meta.lesson}\n`)
  }
  if (meta.fen !== null) {
    process.stdout.write(`  start FEN    ${meta.fen}\n`)
  }
  process.stdout.write("\nPGN:\n")
  process.stdout.write(`${meta.pgn}\n`)
}
