
export type Position = "unquoted" | "double-quoted" | "heredoc"

export interface Hazard {
  readonly index: number
  readonly position: Position
}

export type Verdict =
  | { readonly kind: "clear" }
  | { readonly kind: "hazard"; readonly hazard: Hazard }
  | { readonly kind: "unparseable"; readonly reason: string }

type Quoting = "unquoted" | "single" | "double" | "ansi"

interface PendingHeredoc {
  readonly delimiter: string
  readonly expands: boolean
  readonly stripTabs: boolean
}

const WORD_BREAK = new Set([" ", "\t", "\n", ";", "&", "|", "(", ")", "<", ">"])

function opensComment(command: string, at: number): boolean {
  if (at === 0) return true
  return WORD_BREAK.has(command[at - 1] ?? "")
}

export function readDelimiter(
  command: string,
  at: number
): { readonly delimiter: string; readonly expands: boolean; readonly end: number } {
  let i = at
  while (command[i] === " " || command[i] === "\t") i++
  let delimiter = ""
  let expands = true
  while (i < command.length) {
    const c = command[i] ?? ""
    if (c === "'" || c === '"') {
      expands = false
      const close = command.indexOf(c, i + 1)
      if (close === -1) {
        delimiter += command.slice(i + 1)
        i = command.length
        break
      }
      delimiter += command.slice(i + 1, close)
      i = close + 1
      continue
    }
    if (c === "\\") {
      expands = false
      delimiter += command[i + 1] ?? ""
      i += 2
      continue
    }
    if (WORD_BREAK.has(c)) break
    delimiter += c
    i++
  }
  return { delimiter, expands, end: i }
}

function readBody(
  command: string,
  at: number,
  heredoc: PendingHeredoc
): { readonly hazard: number | null; readonly end: number } {
  let i = at
  let hazard: number | null = null
  while (i <= command.length) {
    const newline = command.indexOf("\n", i)
    const stop = newline === -1 ? command.length : newline
    const line = command.slice(i, stop)
    if ((heredoc.stripTabs ? line.replace(/^\t+/, "") : line) === heredoc.delimiter) {
      return { hazard, end: newline === -1 ? command.length : newline + 1 }
    }
    if (heredoc.expands && hazard === null) {
      for (let k = i; k < stop; k++) {
        if (command[k] === "\\") {
          k++
          continue
        }
        if (command[k] === "`") {
          hazard = k
          break
        }
      }
    }
    if (newline === -1) return { hazard, end: command.length }
    i = newline + 1
  }
  return { hazard, end: command.length }
}

const UNTERMINATED: Readonly<Record<Exclude<Quoting, "unquoted">, string>> = {
  single: "an unterminated single quote",
  double: "an unterminated double quote",
  ansi: "an unterminated $'...' quote",
}

export function scanCommand(command: string): Verdict {
  const stack: Quoting[] = []
  let quoting: Quoting = "unquoted"
  let pending: PendingHeredoc[] = []
  let hazard: Hazard | null = null
  let i = 0
  while (i < command.length) {
    const c = command[i] ?? ""
    if (quoting === "single") {
      if (c === "'") quoting = "unquoted"
      i++
      continue
    }
    if (quoting === "ansi") {
      if (c === "\\") {
        i += 2
        continue
      }
      if (c === "'") quoting = "unquoted"
      i++
      continue
    }
    if (c === "\\") {
      i += 2
      continue
    }
    if (c === "`") {
      hazard ??= { index: i, position: quoting === "double" ? "double-quoted" : "unquoted" }
      i++
      continue
    }
    if (c === "$" && command[i + 1] === "(") {
      stack.push(quoting)
      quoting = "unquoted"
      i += 2
      continue
    }
    if (quoting === "double") {
      if (c === '"') quoting = "unquoted"
      i++
      continue
    }
    if (c === ")" && stack.length > 0) {
      quoting = stack.pop() ?? "unquoted"
      i++
      continue
    }
    if (c === '"') {
      quoting = "double"
      i++
      continue
    }
    if (c === "'") {
      quoting = "single"
      i++
      continue
    }
    if (c === "$" && command[i + 1] === "'") {
      quoting = "ansi"
      i += 2
      continue
    }
    if (c === "#" && opensComment(command, i)) {
      const newline = command.indexOf("\n", i)
      i = newline === -1 ? command.length : newline
      continue
    }
    if (c === "<" && command[i + 1] === "<" && command[i + 2] !== "<" && command[i - 1] !== "<") {
      const stripTabs = command[i + 2] === "-"
      const read = readDelimiter(command, i + (stripTabs ? 3 : 2))
      if (read.delimiter !== "") {
        pending.push({ delimiter: read.delimiter, expands: read.expands, stripTabs })
      }
      i = read.end
      continue
    }
    if (c === "\n" && pending.length > 0) {
      let at = i + 1
      for (const heredoc of pending) {
        const body = readBody(command, at, heredoc)
        if (body.hazard !== null) hazard ??= { index: body.hazard, position: "heredoc" }
        at = body.end
      }
      pending = []
      i = at
      continue
    }
    i++
  }
  if (quoting !== "unquoted") return { kind: "unparseable", reason: UNTERMINATED[quoting] }
  if (stack.length > 0) return { kind: "unparseable", reason: "an unclosed $( )" }
  return hazard === null ? { kind: "clear" } : { kind: "hazard", hazard }
}
