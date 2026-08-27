export const summary = "Have the engine reply at a target strength (Skill Level or Elo)"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseFen } from "../../lib/chess-fen.ts"
import { codeModule } from "../../lib/code-import.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

const POSITION = "packages/alanwalton/chess/src/lib/position.ts"

export const help: CommandHelp = {
  positionals: [
    { name: "<fen>", required: true, description: "Position to move from, in FEN (quote it)" },
  ],
  flags: [
    {
      name: "--level",
      argLabel: "<0-20>",
      valueShape: "token",
      description: "Stockfish Skill Level 0–20",
    },
    {
      name: "--elo",
      argLabel: "<1320-3190>",
      valueShape: "token",
      description: "Target Elo via UCI_LimitStrength",
    },
    {
      name: "--movetime",
      argLabel: "<ms>",
      valueShape: "token",
      default: "1000",
      description: "Search budget in milliseconds",
    },
    { name: "--json", description: "Emit { move, resultingFen, status, strength } as JSON" },
  ],
  mutuallyExclusive: [["--level", "--elo"]],
  exits: [
    {
      code: 1,
      meaning: "input error: malformed FEN, out-of-range strength, or both --level and --elo",
    },
    { code: 3, meaning: "operational error: stockfish binary missing or unresponsive" },
  ],
  examples: [
    'ops chess play "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" --elo 1400',
    'ops chess play "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" --level 3 --json',
  ],
}

interface PlayStrength {
  readonly level?: number
  readonly elo?: number
  readonly movetimeMs?: number
}

interface PlayResult {
  readonly move: string | null
  readonly resultingFen: string | null
  readonly status: string | null
  readonly strength: { readonly mode: "level" | "elo"; readonly value: number }
}

interface Position {
  readonly playMove: (fen: string, strength: PlayStrength) => Promise<PlayResult>
}

export default async function chessPlay(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const raw = parsed.positionals[0]
  if (raw === undefined) {
    throw inputError("fen: required positional argument")
  }
  const fen = await parseFen(raw)
  const level = parsed.nonNegativeInt("--level")
  const elo = parsed.nonNegativeInt("--elo")
  const movetimeMs = parsed.nonNegativeInt("--movetime") ?? 1000

  const position = await codeModule<Position>(POSITION)
  const result = await position.playMove(fen, { level, elo, movetimeMs })

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(result)}\n`)
    return
  }
  if (result.move === null) {
    process.stdout.write("no move — position is terminal (checkmate or stalemate)\n")
    return
  }
  process.stdout.write(`move:     ${result.move}\n`)
  process.stdout.write(`strength: ${result.strength.mode} ${result.strength.value}\n`)
  process.stdout.write(`fen:      ${result.resultingFen}\n`)
  process.stdout.write(`status:   ${result.status}\n`)
}
