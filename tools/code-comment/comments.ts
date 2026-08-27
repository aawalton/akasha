export interface Comment {
  readonly line: number
  readonly start: number
  readonly end: number
  readonly raw: string
}

export function without(body: string, comments: readonly Comment[]): string {
  let kept = ""
  let at = 0
  for (const comment of comments) {
    kept += body.slice(at, comment.start)
    at = comment.end
  }
  return kept + body.slice(at)
}

export class UnscannableFile extends Error {}

const C_STYLE = new Set(["ts", "tsx", "js", "jsx", "mjs", "cjs", "swift"])
const HASH = new Set(["sh", "bash", "service", "timer", "conf", "toml", "yaml", "yml", "py"])

export type Language = "c-style" | "hash" | "sql" | "lua" | "rust" | "css"

export function languageOf(relPath: string): Language {
  const base = relPath.slice(relPath.lastIndexOf("/") + 1)
  const ext = base.includes(".") ? base.slice(base.lastIndexOf(".") + 1) : ""
  if (C_STYLE.has(ext)) return "c-style"
  if (ext === "rs") return "rust"
  if (ext === "css") return "css"
  if (ext === "sql") return "sql"
  if (ext === "lua") return "lua"
  if (HASH.has(ext) || base.startsWith("Dockerfile")) return "hash"
  throw new UnscannableFile(`${relPath} — nothing here knows where a comment starts in this kind of file`)
}

const READERS: Record<Exclude<Language, "c-style">, (body: string) => readonly Comment[]> = {
  hash: hashComments,
  sql: sqlComments,
  lua: luaComments,
  rust: rustComments,
  css: cssComments,
}

const JSX = /\.(tsx|jsx)$/

export function commentsIn(relPath: string, body: string): readonly Comment[] {
  const language = languageOf(relPath)
  return language === "c-style" ? cStyleComments(body, JSX.test(relPath)) : READERS[language](body)
}

const OPERAND_AFTER = new Set("(,=:[!&|?{};+-*%~^<>".split(""))
const OPERAND_WORDS = new Set([
  "return",
  "typeof",
  "instanceof",
  "case",
  "in",
  "of",
  "do",
  "else",
  "yield",
  "await",
  "new",
  "delete",
  "void",
])

function isWordChar(ch: string): boolean {
  return /[A-Za-z0-9_$]/.test(ch)
}

function regexCanStart(last: string | null, word: string, jsx: boolean): boolean {
  if (last === null) return true
  if (jsx && last === "<") return false
  if (OPERAND_AFTER.has(last)) return true
  if (!isWordChar(last)) return false
  return OPERAND_WORDS.has(word)
}

function skipQuoted(body: string, at: number): number {
  const quote = body[at] as string
  let i = at + 1
  while (i < body.length) {
    const ch = body[i] as string
    if (ch === "\\") {
      i += 2
      continue
    }
    if (ch === quote) return i + 1
    if (ch === "\n") return i
    i++
  }
  return i
}

function skipRegex(body: string, at: number): number {
  let i = at + 1
  let inClass = false
  while (i < body.length) {
    const ch = body[i] as string
    if (ch === "\\") {
      i += 2
      continue
    }
    if (ch === "\n") return i
    if (ch === "[") inClass = true
    else if (ch === "]") inClass = false
    else if (ch === "/" && !inClass) return i + 1
    i++
  }
  return i
}

interface Frame {
  readonly template: boolean
  braces: number
}

function cStyleComments(body: string, jsx: boolean): readonly Comment[] {
  const found: Comment[] = []
  const frames: Frame[] = [{ template: false, braces: 0 }]
  let line = 1
  let i = 0
  let last: string | null = null
  let word = ""
  let contiguous = false
  const saw = (ch: string): void => {
    if (isWordChar(ch)) {
      word = contiguous ? word + ch : ch
      contiguous = true
    } else {
      word = ""
      contiguous = false
    }
    last = ch
  }
  const gap = (): void => {
    contiguous = false
  }
  while (i < body.length) {
    const frame = frames[frames.length - 1] as Frame
    const ch = body[i] as string
    if (ch === "\n") {
      line++
      gap()
      i++
      continue
    }
    if (frame.template) {
      if (ch === "\\") {
        i += 2
        continue
      }
      if (ch === "`") {
        frames.pop()
        saw("`")
        i++
        continue
      }
      if (ch === "$" && body[i + 1] === "{") {
        frames.push({ template: false, braces: 0 })
        saw("{")
        i += 2
        continue
      }
      i++
      continue
    }
    if (ch === "/" && body[i + 1] === "/") {
      const start = i
      while (i < body.length && body[i] !== "\n") i++
      found.push({ line, start, end: i, raw: body.slice(start, i) })
      continue
    }
    if (ch === "/" && body[i + 1] === "*") {
      const start = i
      const startLine = line
      i += 2
      while (i < body.length && !(body[i] === "*" && body[i + 1] === "/")) {
        if (body[i] === "\n") line++
        i++
      }
      i = Math.min(i + 2, body.length)
      found.push({ line: startLine, start, end: i, raw: body.slice(start, i) })
      continue
    }
    if (ch === '"' || ch === "'") {
      i = skipQuoted(body, i)
      saw('"')
      continue
    }
    if (ch === "`") {
      frames.push({ template: true, braces: 0 })
      i++
      continue
    }
    if (ch === "{") {
      frame.braces++
      saw("{")
      i++
      continue
    }
    if (ch === "}") {
      if (frame.braces === 0 && frames.length > 1) frames.pop()
      else frame.braces--
      saw("}")
      i++
      continue
    }
    if (ch === "/" && regexCanStart(last, word, jsx)) {
      i = skipRegex(body, i)
      saw("/")
      continue
    }
    if (/\s/.test(ch)) gap()
    else saw(ch)
    i++
  }
  return found
}

const RUST_CHAR = /^'(?:\\.|[^\\'\n])'/
const RUST_RAW = /^r(#*)"/

function skipRustString(body: string, at: number): number {
  let i = at + 1
  while (i < body.length) {
    const ch = body[i] as string
    if (ch === "\\") {
      i += 2
      continue
    }
    if (ch === '"') return i + 1
    i++
  }
  return i
}

function newlinesIn(text: string): number {
  let count = 0
  for (const ch of text) if (ch === "\n") count++
  return count
}

export function rustComments(body: string): readonly Comment[] {
  const found: Comment[] = []
  let line = 1
  let i = 0
  while (i < body.length) {
    const ch = body[i] as string
    if (ch === "\n") {
      line++
      i++
      continue
    }
    if (ch === "/" && body[i + 1] === "/") {
      const start = i
      while (i < body.length && body[i] !== "\n") i++
      found.push({ line, start, end: i, raw: body.slice(start, i) })
      continue
    }
    if (ch === "/" && body[i + 1] === "*") {
      const start = i
      const startLine = line
      let depth = 0
      while (i < body.length) {
        if (body[i] === "/" && body[i + 1] === "*") {
          depth++
          i += 2
          continue
        }
        if (body[i] === "*" && body[i + 1] === "/") {
          depth--
          i += 2
          if (depth === 0) break
          continue
        }
        if (body[i] === "\n") line++
        i++
      }
      found.push({ line: startLine, start, end: i, raw: body.slice(start, i) })
      continue
    }
    if (ch === "r") {
      const raw = RUST_RAW.exec(body.slice(i, i + 32))
      if (raw !== null) {
        const close = `"${raw[1] as string}`
        const opened = i + (raw[0] as string).length
        const closed = body.indexOf(close, opened)
        const end = closed === -1 ? body.length : closed + close.length
        line += newlinesIn(body.slice(i, end))
        i = end
        continue
      }
    }
    if (ch === '"') {
      const end = skipRustString(body, i)
      line += newlinesIn(body.slice(i, end))
      i = end
      continue
    }
    if (ch === "'") {
      const char = RUST_CHAR.exec(body.slice(i, i + 8))
      i += char === null ? 1 : (char[0] as string).length
      continue
    }
    i++
  }
  return found
}

export function cssComments(body: string): readonly Comment[] {
  const found: Comment[] = []
  let line = 1
  let i = 0
  while (i < body.length) {
    const ch = body[i] as string
    if (ch === "\n") {
      line++
      i++
      continue
    }
    if (ch === "/" && body[i + 1] === "*") {
      const start = i
      const startLine = line
      i += 2
      while (i < body.length && !(body[i] === "*" && body[i + 1] === "/")) {
        if (body[i] === "\n") line++
        i++
      }
      i = Math.min(i + 2, body.length)
      found.push({ line: startLine, start, end: i, raw: body.slice(start, i) })
      continue
    }
    if (ch === '"' || ch === "'") {
      i = skipQuoted(body, i)
      continue
    }
    i++
  }
  return found
}

const HEREDOC = /^<<-?\s*(['"]?)([A-Za-z_][A-Za-z0-9_]*)\1/

function hashComments(body: string): readonly Comment[] {
  const found: Comment[] = []
  const lines = body.split("\n")
  let quote: string | null = null
  let heredoc: string | null = null
  let lineStart = 0
  for (let n = 0; n < lines.length; n++) {
    const text = lines[n] as string
    const opensAt = lineStart
    lineStart += text.length + 1
    if (heredoc !== null) {
      if (text.trim() === heredoc) heredoc = null
      continue
    }
    let i = 0
    let atWordStart = true
    while (i < text.length) {
      const ch = text[i] as string
      if (quote !== null) {
        if (ch === "\\" && quote === '"') i += 2
        else if (ch === quote) {
          quote = null
          i++
        } else i++
        continue
      }
      if (ch === "'" || ch === '"') {
        quote = ch
        atWordStart = false
        i++
        continue
      }
      if (ch === "\\") {
        i += 2
        atWordStart = false
        continue
      }
      if (ch === "#" && atWordStart) {
        found.push({ line: n + 1, start: opensAt + i, end: opensAt + text.length, raw: text.slice(i) })
        break
      }
      if (ch === "<" && text[i + 1] === "<") {
        const opened = HEREDOC.exec(text.slice(i))
        if (opened !== null) {
          heredoc = opened[2] as string
          i += opened[0].length
          atWordStart = false
          continue
        }
      }
      atWordStart = /\s/.test(ch)
      i++
    }
  }
  return found
}

function longBracket(body: string, at: number): number | null {
  if (body[at] !== "[") return null
  let i = at + 1
  while (body[i] === "=") i++
  return body[i] === "[" ? i + 1 : null
}

function closingAt(body: string, opened: number, level: number): number {
  const close = `]${"=".repeat(level)}]`
  const found = body.indexOf(close, opened)
  return found === -1 ? body.length : found + close.length
}

export function luaComments(body: string): readonly Comment[] {
  const found: Comment[] = []
  let line = 1
  let i = 0
  while (i < body.length) {
    const ch = body[i] as string
    if (ch === "\n") {
      line++
      i++
      continue
    }
    if (ch === "-" && body[i + 1] === "-") {
      const start = i
      const startLine = line
      const opened = longBracket(body, i + 2)
      if (opened !== null) {
        const end = closingAt(body, opened, opened - i - 4)
        for (const each of body.slice(start, end)) if (each === "\n") line++
        found.push({ line: startLine, start, end, raw: body.slice(start, end) })
        i = end
        continue
      }
      while (i < body.length && body[i] !== "\n") i++
      found.push({ line: startLine, start, end: i, raw: body.slice(start, i) })
      continue
    }
    const opened = longBracket(body, i)
    if (opened !== null) {
      const end = closingAt(body, opened, opened - i - 2)
      for (const each of body.slice(i, end)) if (each === "\n") line++
      i = end
      continue
    }
    if (ch === '"' || ch === "'") {
      i = skipQuoted(body, i)
      continue
    }
    i++
  }
  return found
}

const DOLLAR_TAG = /^\$([A-Za-z_][A-Za-z0-9_]*)?\$/

export function sqlComments(body: string): readonly Comment[] {
  return sqlIn(body, 0, 1)
}

function sqlIn(body: string, base: number, from: number): readonly Comment[] {
  const found: Comment[] = []
  let line = from
  let i = 0
  while (i < body.length) {
    const ch = body[i] as string
    if (ch === "\n") {
      line++
      i++
      continue
    }
    if (ch === "-" && body[i + 1] === "-") {
      const start = i
      while (i < body.length && body[i] !== "\n") i++
      found.push({ line, start: base + start, end: base + i, raw: body.slice(start, i) })
      continue
    }
    if (ch === "/" && body[i + 1] === "*") {
      const start = i
      const startLine = line
      let depth = 0
      while (i < body.length) {
        if (body[i] === "/" && body[i + 1] === "*") {
          depth++
          i += 2
          continue
        }
        if (body[i] === "*" && body[i + 1] === "/") {
          depth--
          i += 2
          if (depth === 0) break
          continue
        }
        if (body[i] === "\n") line++
        i++
      }
      found.push({ line: startLine, start: base + start, end: base + i, raw: body.slice(start, i) })
      continue
    }
    const tag = ch === "$" ? DOLLAR_TAG.exec(body.slice(i, i + 64)) : null
    if (tag !== null) {
      const mark = tag[0] as string
      const opened = i + mark.length
      const closed = body.indexOf(mark, opened)
      const inner = closed === -1 ? body.length : closed
      found.push(...sqlIn(body.slice(opened, inner), base + opened, line))
      for (const each of body.slice(i, inner)) if (each === "\n") line++
      i = closed === -1 ? body.length : closed + mark.length
      continue
    }
    if (ch === "'" || ch === '"') {
      i++
      while (i < body.length) {
        if (body[i] === "\n") line++
        if (body[i] === ch) {
          if (body[i + 1] === ch) {
            i += 2
            continue
          }
          i++
          break
        }
        i++
      }
      continue
    }
    i++
  }
  return found
}
