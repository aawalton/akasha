type Piece =
  | { readonly kind: "text"; readonly text: string }
  | { readonly kind: "number"; readonly slot: number }
  | { readonly kind: "decimal"; readonly slot: number }
  | { readonly kind: "word" }
  | { readonly kind: "any" }
  | { readonly kind: "edge" }
  | { readonly kind: "choice"; readonly options: readonly (readonly Piece[])[] }
  | { readonly kind: "maybe"; readonly pieces: readonly Piece[] }

type TextPattern = { readonly pieces: readonly Piece[] }

type Found = Readonly<Partial<Record<number, number>>>

type Parsing = { readonly source: string; at: number; slots: number }

type Next = (this: void, at: number) => boolean

const DIGITS = "0123456789"

const DECIMAL = "0123456789."

const WORD = "abcdefghijklmnopqrstuvwxyz0123456789_"

const SPACE = " \n\r\t"

function tokenPiece(name: string, parsing: Parsing): Piece {
  if (name === "n") {
    parsing.slots += 1
    return { kind: "number", slot: parsing.slots - 1 }
  }
  if (name === "d") {
    parsing.slots += 1
    return { kind: "decimal", slot: parsing.slots - 1 }
  }
  if (name === "w") return { kind: "word" }
  if (name === "*") return { kind: "any" }
  if (name === "b") return { kind: "edge" }
  throw new Error(`a text pattern names no token <${name}>`)
}

function parseChoice(parsing: Parsing): Piece {
  const options: Piece[][] = []
  let closed = false
  while (!closed) {
    options.push(parsePieces(parsing, "|}"))
    closed = parsing.source.charAt(parsing.at) === "}"
    parsing.at += 1
  }
  return { kind: "choice", options }
}

function parsePieces(parsing: Parsing, closers: string): Piece[] {
  const pieces: Piece[] = []
  let text = ""
  const flush = (): undefined => {
    if (text !== "") pieces.push({ kind: "text", text })
    text = ""
  }
  while (parsing.at < parsing.source.length) {
    const char = parsing.source.charAt(parsing.at)
    if (closers.includes(char)) break
    parsing.at += 1
    if (char === "<") {
      const end = parsing.source.indexOf(">", parsing.at)
      flush()
      pieces.push(tokenPiece(parsing.source.substring(parsing.at, end), parsing))
      parsing.at = end + 1
    } else if (char === "[") {
      flush()
      const inner = parsePieces(parsing, "]")
      parsing.at += 1
      pieces.push({ kind: "maybe", pieces: inner })
    } else if (char === "{") {
      flush()
      pieces.push(parseChoice(parsing))
    } else {
      text += char.toLowerCase()
    }
  }
  flush()
  return pieces
}

export function textPattern(source: string): TextPattern {
  return { pieces: parsePieces({ source, at: 0, slots: 0 }, "") }
}

function endsWord(char: string): boolean {
  return char === "" || !WORD.includes(char)
}

function runOf(text: string, at: number, chars: string): number {
  let end = at
  while (end < text.length && chars.includes(text.charAt(end))) end += 1
  return end
}

function matchRun(
  text: string,
  at: number,
  chars: string,
  found: Partial<Record<number, number>>,
  slot: number | undefined,
  rest: Next
): boolean {
  for (let end = runOf(text, at, chars); end > at; end -= 1) {
    if (slot !== undefined) found[slot] = Number(text.substring(at, end))
    if (rest(end)) return true
  }
  if (slot !== undefined) delete found[slot]
  return false
}

function matchPieces(
  pieces: readonly Piece[],
  index: number,
  text: string,
  at: number,
  found: Partial<Record<number, number>>,
  next: Next
): boolean {
  const piece = pieces[index]
  if (piece === undefined) return next(at)
  const rest: Next = (after) => matchPieces(pieces, index + 1, text, after, found, next)
  if (piece.kind === "text") {
    return text.substring(at, at + piece.text.length) === piece.text && rest(at + piece.text.length)
  }
  if (piece.kind === "number") return matchRun(text, at, DIGITS, found, piece.slot, rest)
  if (piece.kind === "decimal") return matchRun(text, at, DECIMAL, found, piece.slot, rest)
  if (piece.kind === "word") return matchRun(text, at, WORD, found, undefined, rest)
  if (piece.kind === "edge") return endsWord(text.charAt(at)) && rest(at)
  if (piece.kind === "any") {
    for (let end = at; end <= text.length; end += 1) {
      if (rest(end)) return true
    }
    return false
  }
  if (piece.kind === "choice") {
    return piece.options.some((option) => matchPieces(option, 0, text, at, found, rest))
  }
  return matchPieces(piece.pieces, 0, text, at, found, rest) || rest(at)
}

export function findIn(pattern: TextPattern, text: string): Found | undefined {
  const lower = text.toLowerCase()
  for (let start = 0; start <= lower.length; start += 1) {
    const found: Partial<Record<number, number>> = {}
    if (matchPieces(pattern.pieces, 0, lower, start, found, () => true)) return found
  }
  return undefined
}

export function plainText(description: string): string {
  let plain = ""
  let spaced = false
  let at = 0
  while (at < description.length) {
    const char = description.charAt(at)
    const marker = char === "|" ? description.charAt(at + 1).toLowerCase() : ""
    if (marker === "c") {
      at += 8
    } else if (marker === "r") {
      at += 2
    } else if (SPACE.includes(char)) {
      spaced = plain !== ""
      at += 1
    } else {
      if (spaced) plain += " "
      spaced = false
      plain += char
      at += 1
    }
  }
  return plain
}

export function sentencesOf(text: string): string[] {
  const sentences: string[] = []
  let start = 0
  let end = text.indexOf(". ", start)
  while (end >= 0) {
    sentences.push(text.substring(start, end + 1))
    start = end + 2
    end = text.indexOf(". ", start)
  }
  sentences.push(text.substring(start))
  return sentences
}
