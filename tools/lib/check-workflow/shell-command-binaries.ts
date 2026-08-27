import { z } from "zod"

const SHELL_BUILTINS: ReadonlySet<string> = new Set([
  ".",
  "[",
  "[[",
  "alias",
  "break",
  "builtin",
  "case",
  "cd",
  "continue",
  "declare",
  "dirs",
  "done",
  "echo",
  "enable",
  "esac",
  "eval",
  "exit",
  "export",
  "false",
  "fi",
  "for",
  "getopts",
  "hash",
  "help",
  "in",
  "let",
  "local",
  "logout",
  "popd",
  "printf",
  "pushd",
  "read",
  "readonly",
  "return",
  "set",
  "shift",
  "source",
  "test",
  "times",
  "trap",
  "true",
  "type",
  "typeset",
  "ulimit",
  "umask",
  "unset",
  "wait",
])

const COMMAND_PREFIX_WORDS: ReadonlySet<string> = new Set([
  "!",
  "{",
  "}",
  "command",
  "do",
  "elif",
  "else",
  "exec",
  "if",
  "nohup",
  "sudo",
  "then",
  "time",
  "until",
  "while",
])

const PROJECT_BIN_PREFIXES = ["./node_modules/.bin/", "node_modules/.bin/"]

const HEREDOC_OPENER = /^<<-?\s*(['"]?)([A-Za-z_][A-Za-z0-9_]*)\1/
const REDIRECTION = /^[<>]{1,2}&?[0-9-]*\s*("[^"]*"|'[^']*'|[^\s;&|)]*)/

const HeredocCaptures = z.tuple([z.string(), z.string()])
const MatchedText = z.string()

interface HeredocOpener {
  readonly tag: string
  readonly length: number
}

function parseHeredocOpener(match: RegExpExecArray | null): HeredocOpener | null {
  if (match === null) return null
  const [, tag] = HeredocCaptures.parse(match.slice(1))
  return { tag, length: MatchedText.parse(match[0]).length }
}

function parseRedirectionSpan(match: RegExpExecArray | null): number | null {
  return match === null ? null : MatchedText.parse(match[0]).length
}

export function binaryNameOf(token: string): string {
  const lastSlash = token.lastIndexOf("/")
  return lastSlash === -1 ? token : token.slice(lastSlash + 1)
}

function isEnvAssignment(token: string): boolean {
  const eqIdx = token.indexOf("=")
  if (eqIdx <= 0) return false
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(token.slice(0, eqIdx))
}

function isNotABinary(token: string): boolean {
  const binary = binaryNameOf(token)
  if (binary === "") return true
  if (/^[0-9]+$/.test(binary)) return true
  if (token.startsWith("#")) return true
  if (token.startsWith("-")) return true
  if (token.startsWith("$")) return true
  if (token.startsWith("'") || token.startsWith('"')) return true
  if (token.startsWith("\\")) return true
  if (/^[A-Z][A-Z0-9_]*$/.test(token)) return true
  if (/\.(ya?ml|json|sh|ts|tsx|js|txt|conf|cfg|sql)$/.test(binary)) return true
  if (PROJECT_BIN_PREFIXES.some((p) => token.startsWith(p))) return true
  if (binary.includes("_") && /^[a-z][a-z0-9_]+$/.test(binary)) return true
  if (/[^a-zA-Z0-9_./-]/.test(binary)) return true
  return false
}

export function binaryOfSegment(tokens: readonly string[]): string | null {
  for (const token of tokens) {
    if (isEnvAssignment(token)) continue
    const binary = binaryNameOf(token)
    if (COMMAND_PREFIX_WORDS.has(binary)) continue
    if (SHELL_BUILTINS.has(binary)) return null
    if (isNotABinary(token)) return null
    return binary
  }
  return null
}

export function commandSegments(script: string): readonly (readonly string[])[] {
  const segments: string[][] = []
  let tokens: string[] = []
  let token = ""
  let depth = 0
  let i = 0
  const n = script.length
  const pendingHeredocs: string[] = []

  const endToken = (): undefined => {
    if (token !== "") tokens.push(token)
    token = ""
  }
  const endSegment = (): undefined => {
    endToken()
    if (tokens.length > 0) segments.push(tokens)
    tokens = []
  }
  const dropSegment = (): undefined => {
    token = ""
    tokens = []
  }

  const skipHeredocBody = (from: number, delim: string): number => {
    let p = from
    while (p < n) {
      const eol = script.indexOf("\n", p)
      const lineEnd = eol === -1 ? n : eol
      if (script.slice(p, lineEnd).trim() === delim) return eol === -1 ? n : eol + 1
      p = eol === -1 ? n : eol + 1
    }
    return n
  }

  while (i < n) {
    const c = script[i]

    if (c === "'") {
      const end = script.indexOf("'", i + 1)
      token += end === -1 ? script.slice(i) : script.slice(i, end + 1)
      i = end === -1 ? n : end + 1
      continue
    }

    if (c === '"') {
      let p = i + 1
      while (p < n && script[p] !== '"') p += script[p] === "\\" ? 2 : 1
      token += script.slice(i, Math.min(p + 1, n))
      i = p + 1
      continue
    }

    if (c === "\\") {
      if (script[i + 1] === "\n") endToken()
      else token += script.slice(i, i + 2)
      i += 2
      continue
    }

    if (c === "#" && token === "") {
      const eol = script.indexOf("\n", i)
      i = eol === -1 ? n : eol
      continue
    }

    if (c === "<" && script[i + 1] === "<" && script[i + 2] !== "<") {
      const opened = parseHeredocOpener(HEREDOC_OPENER.exec(script.slice(i)))
      if (opened !== null) {
        pendingHeredocs.push(opened.tag)
        endToken()
        i += opened.length
        continue
      }
    }

    if (c === ">" || c === "<") {
      endToken()
      i += parseRedirectionSpan(REDIRECTION.exec(script.slice(i))) ?? 1
      continue
    }

    if (c === "$" && script[i + 1] === "(" && script[i + 2] === "(") {
      const close = script.indexOf("))", i + 3)
      i = close === -1 ? n : close + 2
      endToken()
      continue
    }

    if (c === "\n") {
      endSegment()
      i++
      for (;;) {
        const tag = pendingHeredocs.shift()
        if (tag === undefined) break
        i = skipHeredocBody(i, tag)
      }
      continue
    }

    if (c === " " || c === "\t" || c === "\r") {
      endToken()
      i++
      continue
    }

    if (c === ";" || c === "&" || c === "|") {
      endSegment()
      while (i < n && (script[i] === ";" || script[i] === "&" || script[i] === "|")) i++
      continue
    }

    if (c === "$" && script[i + 1] === "(") {
      endSegment()
      depth++
      i += 2
      continue
    }
    if (c === "`" || c === "(") {
      endSegment()
      depth++
      i++
      continue
    }
    if (c === ")") {
      if (depth === 0) dropSegment()
      else {
        endSegment()
        depth--
      }
      i++
      continue
    }

    token += c
    i++
  }

  endSegment()
  return segments
}

export function commandBinaries(script: string): readonly string[] {
  const binaries: string[] = []
  for (const segment of commandSegments(script)) {
    const binary = binaryOfSegment(segment)
    if (binary !== null) binaries.push(binary)
  }
  return binaries
}
