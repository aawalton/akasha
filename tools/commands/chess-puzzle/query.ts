export const summary = "Query chess puzzles by motif AND difficulty (graded drill path)"

import type { CommandHelp } from "../../ops/surface.ts"
import { dataError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { answer, listOf, type Test, textOf } from "../../lib/page-query.ts"
import { resolveRoots } from "../../../repo/roots/roots"

const CHESS_PUZZLE = "chess-puzzle"

const DEFAULT_LIMIT = 20

const SELECTED = ["puzzleId", "fen", "moves", "rating", "themes", "solverColor", "gameUrl"] as const

export const help: CommandHelp = {
  flags: [
    {
      name: "--motif",
      argLabel: "<theme>",
      valueShape: "prose",
      description: "Theme tag the puzzle must carry",
    },
    {
      name: "--min-rating",
      argLabel: "<n>",
      valueShape: "token",
      description: "Lower rating bound (inclusive)",
    },
    {
      name: "--max-rating",
      argLabel: "<n>",
      valueShape: "token",
      description: "Upper rating bound (inclusive)",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      description: "Max puzzles to return (default 20)",
    },
    { name: "--json", description: "Emit a JSON array instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "query ran (zero or more puzzles returned)" },
    { code: 1, meaning: "query failure" },
  ],
  examples: [
    "ops chess-puzzle query --motif-file ./motif.txt --min-rating 1200 --max-rating 1400 --limit 10",
    "ops chess-puzzle query --motif-file ./motif.txt --limit 5 --json",
  ],
}

interface PuzzleResult {
  readonly puzzleId: string
  readonly fen: string
  readonly moves: string
  readonly rating: number
  readonly themes: readonly string[]
  readonly solverColor: string | null
}

export default async function chessPuzzleQuery(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const motif = parsed.string("--motif")
  const minRating = parsed.nonNegativeInt("--min-rating")
  const maxRating = parsed.nonNegativeInt("--max-rating")
  const limit = parsed.nonNegativeInt("--limit")
  const json = parsed.boolean("--json")

  const where: Test[] = []
  if (motif !== undefined && motif.length > 0) where.push({ key: "themes", has: motif })

  const got = answer(resolveRoots(), {
    pageType: CHESS_PUZZLE,
    where,
    keys: [...SELECTED],
  })
  if (got === null) {
    throw dataError(`\`${CHESS_PUZZLE}\` names no page type whose pages are files`)
  }

  const puzzles = got.rows
    .map((row): PuzzleResult => {
      const rating = Number(textOf(row.values, "rating") ?? "")
      return {
        puzzleId: textOf(row.values, "puzzleId") ?? "",
        fen: textOf(row.values, "fen") ?? "",
        moves: textOf(row.values, "moves") ?? "",
        rating: Number.isFinite(rating) ? rating : 0,
        themes: listOf(row.values, "themes"),
        solverColor: textOf(row.values, "solverColor"),
      }
    })
    .filter((p) => (minRating === undefined || p.rating >= minRating) && (maxRating === undefined || p.rating <= maxRating))
    .sort((a, b) => a.rating - b.rating)
    .slice(0, limit ?? DEFAULT_LIMIT)

  if (json) {
    process.stdout.write(`${JSON.stringify(puzzles)}\n`)
    return
  }
  if (puzzles.length === 0) {
    process.stdout.write("no puzzles matched\n")
    return
  }
  for (const p of puzzles) {
    process.stdout.write(
      `${p.puzzleId}\t${p.rating}\t${p.solverColor ?? "?"}\t${p.fen}\t${p.moves}\t${p.themes.join(" ")}\n`
    )
  }
}
