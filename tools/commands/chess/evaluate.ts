export const summary = "Evaluate a FEN position: score, best move, and principal variation"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseFen } from "../../lib/chess-fen.ts"
import { inputError } from "../../lib/exit.ts"
import { evaluate, type EvaluateResult } from "../../../alanwalton/chess/src/lib/position.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<fen>",
      required: true,
      description: "Position in FEN (quote it — FENs contain spaces)",
    },
  ],
  flags: [
    {
      name: "--depth",
      argLabel: "<n>",
      valueShape: "token",
      default: "18",
      description: "Search depth (plies)",
    },
    { name: "--json", description: "Emit the full structured evaluation as JSON" },
  ],
  exits: [
    { code: 1, meaning: "input error: malformed FEN or --depth not a positive integer" },
    { code: 3, meaning: "operational error: stockfish binary missing or unresponsive" },
  ],
  examples: [
    'ops chess evaluate "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"',
    'ops chess evaluate "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1" --depth 22 --json',
  ],
}

function formatScore(result: EvaluateResult): string {
  if (result.scoreKind === "mate") {
    const n = Math.abs(result.scoreWhitePov)
    if (n === 0) {
      return "mate (no legal moves)"
    }
    const who = result.scoreWhitePov > 0 ? "White" : "Black"
    return `mate in ${n} for ${who}`
  }
  const pawns = result.scoreWhitePov / 100
  const sign = pawns > 0 ? "+" : ""
  return `${sign}${pawns.toFixed(2)} (White POV)`
}

export default async function chessEvaluate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const raw = parsed.positionals[0]
  if (raw === undefined) {
    throw inputError("fen: required positional argument")
  }
  const fen = await parseFen(raw)
  const depth = parsed.nonNegativeInt("--depth") ?? 18
  if (depth === 0) {
    throw inputError("--depth must be a positive integer")
  }

  const result = await evaluate(fen, depth)

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(result)}\n`)
    return
  }
  process.stdout.write(`position:  ${result.fen}\n`)
  process.stdout.write(`to move:   ${result.sideToMove === "w" ? "White" : "Black"}\n`)
  process.stdout.write(`score:     ${formatScore(result)}  [depth ${result.depth}]\n`)
  process.stdout.write(`best move: ${result.bestMove ?? "(none — terminal)"}\n`)
  if (result.pv.length > 0) {
    process.stdout.write(`pv:        ${result.pv.join(" ")}\n`)
  }
}
