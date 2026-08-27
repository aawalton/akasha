export const summary = "Record a solved puzzle (flip `solved`) — the practice-record behind Erin's points source"

import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { patchRow } from "../../lib/page-rows-write.ts"
import { answer } from "../../lib/page-query.ts"
import { textOf } from "../../lib/page-query-values.ts"
import { resolveRoots } from "../../../repo/roots/roots"

const CHESS_PUZZLE = "chess-puzzle"

const WRITER = "ops chess-puzzle solve"

export const help: CommandHelp = {
  positionals: [
    { name: "<puzzleId>", required: true, description: "The Lichess puzzle id to mark solved" },
  ],
  flags: [{ name: "--json", description: "Emit a JSON result instead of a human line" }],
  exits: [
    { code: 0, meaning: "puzzle marked solved, or already solved" },
    { code: 1, meaning: "no puzzle id was given" },
    {
      code: 2,
      meaning:
        "no stored puzzle carries that id. A write that fails instead throws, and lands on whatever code the envelope classifies it as, never here",
    },
  ],
  examples: ["ops chess-puzzle solve 00sHx", "ops chess-puzzle solve 00sHx --json"],
}

type Outcome = "solved" | "already-solved"

function setNamedBy(at: string): string | null {
  const relPath = at.replace(/^[a-z]+:/, "").replace(/#\d+$/, "")
  const file = relPath.split("/").pop()
  if (file === undefined) return null
  const stem = file.replace(/\.[a-z0-9-]+\.jsonl$/, "")
  return stem === file ? null : stem
}

export default async function chessPuzzleSolve(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const puzzleId = parsed.positionals[0]
  if (puzzleId === undefined) {
    throw inputError("puzzleId: required positional argument")
  }
  const json = parsed.boolean("--json")

  const roots = resolveRoots()
  const got = answer(roots, {
    pageType: CHESS_PUZZLE,
    where: [{ key: "puzzleId", is: puzzleId }],
  })
  if (got === null) {
    throw dataError(`\`${CHESS_PUZZLE}\` names no page type whose pages are files`)
  }
  const page = got.rows[0]
  if (page === undefined) {
    throw dataError(`no stored chess-puzzle carries puzzleId '${puzzleId}'`)
  }

  const id = textOf(page.values, "id")
  if (id === null) {
    throw dataError(`the chess-puzzle carrying puzzleId '${puzzleId}' states no id`)
  }
  const setName = setNamedBy(page.at)
  if (setName === null) {
    throw dataError(`\`${page.at}\` does not name the puzzle set the puzzle stands in`)
  }

  const outcome: Outcome = textOf(page.values, "solved") === "true" ? "already-solved" : "solved"
  if (outcome === "solved") {
    const landed = patchRow(roots, CHESS_PUZZLE, setName, { id, solved: true }, WRITER)
    if (landed === null) {
      throw dataError(`\`${CHESS_PUZZLE}\` is not held beside a page this writes`)
    }
    if (landed.commitError !== null) {
      throw operationalError(
        `puzzle '${puzzleId}' was marked solved at ${landed.relPath} but its commit did not land: ${landed.commitError}`
      )
    }
  }

  if (json) {
    process.stdout.write(`${JSON.stringify({ puzzleId, outcome })}\n`)
    return
  }
  if (outcome === "already-solved") {
    process.stdout.write(`puzzle '${puzzleId}' was already solved (no change)\n`)
    return
  }
  process.stdout.write(`puzzle '${puzzleId}' marked solved\n`)
}
