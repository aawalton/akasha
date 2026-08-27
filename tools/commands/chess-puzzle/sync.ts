export const summary = "Ingest the open Lichess puzzle database (CC0) into a chess-puzzle set's puzzles"

import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  DEFAULT_INGEST_LIMIT,
  type IngestCounts,
  type IngestSource,
  ingestLichessPuzzles,
  LICHESS_PUZZLE_URL,
  type ParsedPuzzle,
  puzzleToRow,
} from "../../lib/chess-puzzle-lichess.ts"
import { patchRows } from "../../lib/page-rows-write.ts"
import { load } from "../../lib/page-query.ts"
import { textOf } from "../../lib/page-query-values.ts"
import { resolveRoots } from "../../../repo/roots/roots"

const CHESS_PUZZLE = "chess-puzzle"

const WRITER = "ops chess-puzzle sync"

const DEFAULT_SET = "lichess"

export const help: CommandHelp = {
  flags: [
    {
      name: "--file",
      argLabel: "<path>",
      valueShape: "token",
      description: "Local source: a `.csv.zst` (piped through zstd) or plain `.csv`",
    },
    {
      name: "--set",
      argLabel: "<name>",
      valueShape: "token",
      description: `The \`chess-puzzle-set\` page to land the puzzles in (default \`${DEFAULT_SET}\`)`,
    },
    { name: "--limit", argLabel: "<n>", valueShape: "token", description: "Max puzzles to land" },
    { name: "--all", description: "Ingest every matching row (no cap) — large" },
    {
      name: "--min-rating",
      argLabel: "<n>",
      valueShape: "token",
      description: "Only ingest rating >= n",
    },
    {
      name: "--max-rating",
      argLabel: "<n>",
      valueShape: "token",
      description: "Only ingest rating <= n",
    },
    {
      name: "--themes",
      argLabel: "<csv>",
      valueShape: "token",
      description: "Only ingest rows carrying at least one of these themes",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    {
      code: 0,
      meaning:
        "the source was read to its end and every matching row landed. A run stopped by --limit reaches 0 too, having read only as far as the cap",
    },
    { code: 1, meaning: "a flag carried a value this cannot use, or --file names nothing" },
    {
      code: 2,
      meaning:
        "`chess-puzzle` names no page type whose pages are files, no set page is named, or a row the set holds would not be judged",
    },
    {
      code: 3,
      meaning:
        "the source could not be read to its end: the fetch failed, zstd exited nonzero, or a batch would not land. The counts are of what arrived before it stopped, so nothing here is a complete reading",
    },
  ],
  examples: [
    "ops chess-puzzle sync --limit 2000",
    "ops chess-puzzle sync --file /var/tmp/lichess_db_puzzle.csv.zst --themes fork --min-rating 1200 --max-rating 1400 --limit 500",
    "ops chess-puzzle sync --all --json",
  ],
}

function setNamedBy(at: string): string | null {
  const relPath = at.replace(/^[a-z]+:/, "").replace(/#\d+$/, "")
  const file = relPath.split("/").pop()
  if (file === undefined) return null
  const stem = file.replace(/\.[a-z0-9-]+\.jsonl$/, "")
  return stem === file ? null : stem
}

function idsBySetPuzzle(setName: string): ReadonlyMap<string, string> {
  const roots = resolveRoots()
  const rows = load(roots, CHESS_PUZZLE)
  if (rows === null) {
    throw dataError(`\`${CHESS_PUZZLE}\` names no page type whose pages are files`)
  }
  const ids = new Map<string, string>()
  for (const row of rows) {
    if (setNamedBy(row.at) !== setName) continue
    const puzzleId = textOf(row.values, "puzzleId")
    const id = textOf(row.values, "id")
    if (puzzleId !== null && id !== null) ids.set(puzzleId, id)
  }
  return ids
}

export default async function chessPuzzleSync(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const file = parsed.string("--file")
  const setName = parsed.string("--set") ?? DEFAULT_SET
  const limit = parsed.nonNegativeInt("--limit")
  const all = parsed.boolean("--all")
  const minRating = parsed.nonNegativeInt("--min-rating")
  const maxRating = parsed.nonNegativeInt("--max-rating")
  const themesArg = parsed.string("--themes")
  const json = parsed.boolean("--json")

  if (file !== undefined && !(await Bun.file(file).exists())) {
    throw inputError(`--file: ${file} is not there`)
  }
  const source: IngestSource | undefined =
    file !== undefined ? { kind: "file", path: file } : undefined
  const themes =
    themesArg !== undefined
      ? themesArg
          .split(",")
          .map((one) => one.trim())
          .filter((one) => one.length > 0)
      : undefined

  const roots = resolveRoots()
  const ids = idsBySetPuzzle(setName)

  const land = (puzzles: readonly ParsedPuzzle[]): void => {
    const rows = puzzles.map((puzzle) => {
      const values = puzzleToRow(puzzle)
      const standing = ids.get(puzzle.puzzleId)
      return standing === undefined ? values : { ...values, id: standing }
    })
    const landed = patchRows(roots, CHESS_PUZZLE, setName, rows, WRITER)
    if (landed === null) {
      throw dataError(`\`${CHESS_PUZZLE}\` is not held beside a page this writes`)
    }
    if (landed.refused !== undefined) throw dataError(landed.refused)
    if (landed.absent !== undefined) throw dataError(landed.absent)
    if (landed.commitError !== null) {
      throw operationalError(`the batch landed at ${landed.relPath} but its commit did not: ${landed.commitError}`)
    }
  }

  let counts: IngestCounts
  try {
    counts = await ingestLichessPuzzles({ source, limit, all, minRating, maxRating, themes }, land)
  } catch (thrown) {
    if (thrown instanceof Error && thrown.name === "ExitError") throw thrown
    throw operationalError(thrown instanceof Error ? thrown.message : String(thrown))
  }

  if (json) {
    process.stdout.write(`${JSON.stringify({ set: setName, ...counts })}\n`)
    return
  }
  process.stdout.write(
    `set\t${setName}\n` +
      `read\t${counts.read}\n` +
      `skipped\t${counts.skipped}\n` +
      `matched\t${counts.matched}\n` +
      `written\t${counts.written}\n`
  )
}
