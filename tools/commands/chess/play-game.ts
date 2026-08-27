export const summary = "Play a full game vs Maia (human-like) and land it as a reviewable chess-game page"

import { createInterface } from "node:readline/promises"
import type { CommandHelp } from "../../ops/surface.ts"
import { parseFen, parseUciMove } from "../../lib/chess-fen.ts"
import { codeModule } from "../../lib/code-import.ts"
import { operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { type Value, writePage } from "../../lib/page-write.ts"
import { resolveRoots } from "../../../repo/roots/roots"

const GAME = "packages/alanwalton/chess/src/lib/game.ts"
const LOOP = "packages/alanwalton/chess/src/lib/loop.ts"
const MAIA = "packages/alanwalton/chess/src/lib/maia.ts"
const PERSIST = "packages/alanwalton/chess/src/lib/persist-game.ts"
const POSITION = "packages/alanwalton/chess/src/lib/position.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "fen",
      required: false,
      aliasOfFlag: "--fen",
      description: "Starting position in FEN (quote it); defaults to the standard start",
    },
  ],
  flags: [
    {
      name: "--fen",
      argLabel: "<fen>",
      valueShape: "token",
      description: "Starting position (default: standard start)",
    },
    {
      name: "--color",
      argLabel: "<white|black>",
      valueShape: "token",
      default: "white",
      choices: ["white", "black"],
      description: "The color you play",
    },
    {
      name: "--elo",
      argLabel: "<1100-1900>",
      valueShape: "token",
      default: "1500",
      description: "Maia rating band (rounded/clamped to the nearest 100)",
    },
    { name: "--json", description: "Emit a JSON result envelope instead of human text" },
  ],
  exits: [
    { code: 0, meaning: "game played and landed" },
    { code: 1, meaning: "input error: malformed FEN or out-of-range flag" },
    { code: 3, meaning: "operational error: stockfish/lc0 binary or Maia weights missing" },
  ],
  examples: [
    "ops chess play-game --elo 1500",
    'printf "e2e4\\ne7e5\\n" | ops chess play-game --color white --elo 1300',
  ],
}

type PlayerColor = "white" | "black"

interface AppliedMove {
  readonly fen: string
  readonly status: string
  readonly sideToMove: "w" | "b"
}

interface CompletedGame {
  readonly externalId: string
  readonly result: string
  readonly winner: string
  readonly endReason: string
  readonly outcome: string
  readonly plies: readonly unknown[]
  readonly pgn: string
}

interface Game {
  readonly STANDARD_START_FEN: string
}

interface Loop {
  readonly runGame: (args: {
    readonly startFen: string
    readonly alanColor: PlayerColor
    readonly band: number
    readonly playedAt: string
    readonly deps: {
      readonly readAlanMove: (fen: string) => Promise<string | null>
      readonly maiaMove: (fen: string) => Promise<string | null>
      readonly applyMove: (fen: string, move: string) => Promise<AppliedMove>
    }
  }) => Promise<CompletedGame>
}

interface Maia {
  readonly clampMaiaBand: (elo: number) => number
  readonly playMaiaMove: (fen: string, band: number) => Promise<string | null>
}

interface Persist {
  readonly CHESS_GAME_SLUG: string
  readonly chessGamePageName: (externalId: string) => string
  readonly chessGameValues: (game: CompletedGame) => Record<string, Value>
}

interface Position {
  readonly applyMove: (fen: string, move: string) => Promise<AppliedMove>
  readonly legalMoves: (fen: string) => Promise<readonly string[]>
}

interface LineReader {
  next: () => Promise<string | null>
  close: () => void
}

function makeStdinLineReader(): LineReader {
  const rl = createInterface({ input: process.stdin })
  const buffered: string[] = []
  const waiters: Array<(v: string | null) => void> = []
  let closed = false
  rl.on("line", (line) => {
    const w = waiters.shift()
    if (w !== undefined) {
      w(line)
    } else {
      buffered.push(line)
    }
  })
  rl.on("close", () => {
    closed = true
    for (const w of waiters.splice(0)) {
      w(null)
    }
  })
  return {
    next: () => {
      const head = buffered.shift()
      if (head !== undefined) {
        return Promise.resolve(head)
      }
      if (closed) {
        return Promise.resolve(null)
      }
      return new Promise<string | null>((resolve) => waiters.push(resolve))
    },
    close: () => rl.close(),
  }
}

export default async function chessPlayGame(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const gameModule = await codeModule<Game>(GAME)
  const loop = await codeModule<Loop>(LOOP)
  const maia = await codeModule<Maia>(MAIA)
  const persist = await codeModule<Persist>(PERSIST)
  const position = await codeModule<Position>(POSITION)

  const rawFen = parsed.string("--fen")
  const startFen =
    rawFen === undefined ? gameModule.STANDARD_START_FEN : await parseFen(rawFen)
  const alanColor: PlayerColor = parsed.string("--color") === "black" ? "black" : "white"
  const band = maia.clampMaiaBand(parsed.nonNegativeInt("--elo") ?? 1500)
  const json = parsed.boolean("--json")

  const reader = makeStdinLineReader()
  const write = (s: string): undefined => {
    process.stdout.write(s)
  }
  if (!json) {
    write(`Playing ${alanColor} vs Maia ${band}. Moves are UCI (e2e4); 'resign' to concede.\n`)
    write(`Start: ${startFen}\n`)
  }

  const readAlanMove = async (fen: string): Promise<string | null> => {
    for (;;) {
      if (!json) {
        write("Your move: ")
      }
      const line = await reader.next()
      if (line === null) {
        return null
      }
      const raw = line.trim().toLowerCase()
      if (raw === "resign" || raw === "quit") {
        return null
      }
      if (raw.length === 0) {
        continue
      }
      let move: string
      try {
        move = await parseUciMove(raw)
      } catch {
        if (!json) {
          write("  not a UCI move (e.g. e2e4) — try again\n")
        }
        continue
      }
      const legal = await position.legalMoves(fen)
      if (!legal.includes(move)) {
        if (!json) {
          write("  illegal in this position — try again\n")
        }
        continue
      }
      return move
    }
  }

  const maiaMove = async (fen: string): Promise<string | null> => {
    const move = await maia.playMaiaMove(fen, band)
    if (!json && move !== null) {
      write(`Maia ${band} plays ${move}\n`)
    }
    return move
  }

  const applyMoveEcho = async (fen: string, move: string): Promise<AppliedMove> => {
    const r = await position.applyMove(fen, move)
    if (!json) {
      write(`  -> ${r.fen} [${r.status}]\n`)
    }
    return r
  }

  const game = await loop.runGame({
    startFen,
    alanColor,
    band,
    playedAt: new Date().toISOString(),
    deps: { readAlanMove, maiaMove, applyMove: applyMoveEcho },
  })
  reader.close()

  const id = Bun.randomUUIDv7()
  const name = persist.chessGamePageName(game.externalId)
  const landed = writePage(
    resolveRoots(),
    persist.CHESS_GAME_SLUG,
    name,
    { id, ...persist.chessGameValues(game) },
    "alan"
  )
  if (landed === null) {
    throw operationalError(`\`${persist.CHESS_GAME_SLUG}\` names no page type whose pages are files`)
  }
  if (landed.commitError !== null) {
    throw operationalError(`the game landed at ${landed.relPath} but its commit did not: ${landed.commitError}`)
  }

  if (json) {
    write(
      `${JSON.stringify({
        id,
        at: landed.relPath,
        externalId: game.externalId,
        result: game.result,
        winner: game.winner,
        endReason: game.endReason,
        outcome: game.outcome,
        plies: game.plies.length,
      })}\n`
    )
    return
  }
  write(`\nGame over: ${game.result} (${game.endReason}) — you ${game.outcome}.\n`)
  write(`Saved chess-game ${landed.relPath}\n`)
  write(`Review:  ops chess-game show ${id}\n`)
  write('Analyze: ops chess evaluate "<fen from the game>"\n')
}
