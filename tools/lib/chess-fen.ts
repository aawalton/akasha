import { inputError } from "./exit.ts"

const UCI_MOVE = /^[a-h][1-8][a-h][1-8][qrbn]?$/

export async function parseUciMove(raw: string): Promise<string> {
  const move = raw.trim().toLowerCase()
  if (!UCI_MOVE.test(move)) {
    throw inputError(
      `invalid move "${raw}": expected UCI long algebraic (e.g. e2e4, e7e8q), got something else`
    )
  }
  return move
}

export async function parseFen(raw: string): Promise<string> {
  const fen = raw.trim()
  const fields = fen.split(/\s+/)
  if (fields.length < 2) {
    throw inputError(
      `invalid FEN "${raw}": expected at least a piece-placement field and a side-to-move`
    )
  }
  const placement = fields[0] ?? ""
  const side = fields[1] ?? ""
  const ranks = placement.split("/")
  if (ranks.length !== 8) {
    throw inputError(
      `invalid FEN "${raw}": piece placement must have 8 ranks separated by "/"`
    )
  }
  for (const rank of ranks) {
    let count = 0
    for (const ch of rank) {
      if (/[1-8]/.test(ch)) {
        count += Number(ch)
      } else if (/[pnbrqkPNBRQK]/.test(ch)) {
        count += 1
      } else {
        throw inputError(
          `invalid FEN "${raw}": unexpected character "${ch}" in piece placement`
        )
      }
    }
    if (count !== 8) {
      throw inputError(
        `invalid FEN "${raw}": rank "${rank}" describes ${count} squares, expected 8`
      )
    }
  }
  if (side !== "w" && side !== "b") {
    throw inputError(`invalid FEN "${raw}": side-to-move must be "w" or "b", got "${side}"`)
  }
  return fen
}

export function fenSideToMove(fen: string): "w" | "b" {
  return (fen.trim().split(/\s+/)[1] ?? "w") === "b" ? "b" : "w"
}
