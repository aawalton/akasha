export const summary = "List every legal move in a FEN position (Stockfish-validated)"

import type { CommandHelp } from "../../ops/surface.ts"
import { fenSideToMove, parseFen } from "../../lib/chess-fen.ts"
import { codeModule } from "../../lib/code-import.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

const POSITION = "alanwalton/chess/src/lib/position.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<fen>",
      required: true,
      description: "Position in FEN (quote it — FENs contain spaces)",
    },
  ],
  flags: [{ name: "--json", description: "Emit { fen, sideToMove, count, moves } as JSON" }],
  exits: [
    { code: 1, meaning: "input error: malformed FEN" },
    { code: 3, meaning: "operational error: stockfish binary missing or unresponsive" },
  ],
  examples: [
    'ops chess legal-moves "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"',
    'ops chess legal-moves "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" --json',
  ],
}

interface Position {
  readonly legalMoves: (fen: string) => Promise<readonly string[]>
}

export default async function chessLegalMoves(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const raw = parsed.positionals[0]
  if (raw === undefined) {
    throw inputError("fen: required positional argument")
  }
  const fen = await parseFen(raw)

  const position = await codeModule<Position>(POSITION)
  const moves = await position.legalMoves(fen)

  if (parsed.boolean("--json")) {
    process.stdout.write(
      `${JSON.stringify({ fen, sideToMove: fenSideToMove(fen), count: moves.length, moves })}\n`
    )
    return
  }
  for (const move of moves) {
    process.stdout.write(`${move}\n`)
  }
}
