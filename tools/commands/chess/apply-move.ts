export const summary = "Apply a UCI move to a FEN and report the resulting position + status"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseFen, parseUciMove } from "../../lib/chess-fen.ts"
import { codeModule } from "../../lib/code-import.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

const POSITION = "alanwalton/chess/src/lib/position.ts"

export const help: CommandHelp = {
  positionals: [
    { name: "<fen>", required: true, description: "Starting position in FEN (quote it)" },
    {
      name: "<move>",
      required: true,
      description: "Move in UCI long algebraic (e.g. e2e4, e7e8q)",
    },
  ],
  flags: [
    {
      name: "--json",
      description: "Emit { fen, status, sideToMove, checkers, legalMoveCount } as JSON",
    },
  ],
  exits: [
    { code: 1, meaning: "input error: malformed FEN/move, or move not legal in the position" },
    { code: 3, meaning: "operational error: stockfish binary missing or unresponsive" },
  ],
  examples: [
    'ops chess apply-move "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" e2e4',
    'ops chess apply-move "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1" a1a8 --json',
  ],
}

interface ApplyMoveResult {
  readonly fen: string
  readonly status: string
  readonly sideToMove: "w" | "b"
  readonly checkers: readonly string[]
}

interface Position {
  readonly applyMove: (fen: string, move: string) => Promise<ApplyMoveResult>
}

export default async function chessApplyMove(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const rawFen = parsed.positionals[0]
  const rawMove = parsed.positionals[1]
  if (rawFen === undefined) {
    throw inputError("fen: required positional argument")
  }
  if (rawMove === undefined) {
    throw inputError("move: required positional argument")
  }
  const fen = await parseFen(rawFen)
  const move = await parseUciMove(rawMove)

  const position = await codeModule<Position>(POSITION)
  const result = await position.applyMove(fen, move)

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(result)}\n`)
    return
  }
  process.stdout.write(`fen:    ${result.fen}\n`)
  process.stdout.write(`status: ${result.status}\n`)
  process.stdout.write(`to move: ${result.sideToMove === "w" ? "White" : "Black"}\n`)
  if (result.checkers.length > 0) {
    process.stdout.write(`checkers: ${result.checkers.join(" ")}\n`)
  }
}
