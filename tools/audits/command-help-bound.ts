import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import type { AsyncCheck } from "../lib/check.ts"
import { judge, over } from "@akasha/verdict/outcome"
import { refusalText } from "../../refusal/refusal.ts"
import { declaredCommands } from "../ops/declared.ts"

const NAME = "command-help-bound"

const UNIT = "command carrying a file of its own"

const QUOTED = "\"'`"

const OPENS = "({["

const CLOSES = ")}]"

const FLAG = /name:\s*"(--[a-z0-9-]+)"/g

const WORD = /[A-Za-z_$][\w$]*/g

const NOT_A_REFERENCE = new Set([
  "as",
  "const",
  "default",
  "false",
  "function",
  "new",
  "null",
  "readonly",
  "return",
  "satisfies",
  "true",
  "typeof",
  "undefined",
  "void",
])

interface Site {
  readonly at: string
  readonly name: string
}

export function read(at: string): string {
  try {
    return readFileSync(at, "utf8")
  } catch {
    return ""
  }
}

function pastQuoted(source: string, at: number): number {
  const quote = source[at]
  for (let i = at + 1; i < source.length; i += 1) {
    if (source[i] === "\\") i += 1
    else if (source[i] === quote) return i
  }
  return -1
}

export function closeOf(source: string, open: number): number {
  const stack: string[] = []
  for (let i = open; i < source.length; i += 1) {
    const c = source[i] as string
    if (QUOTED.includes(c)) {
      const close = pastQuoted(source, i)
      if (close === -1) return -1
      i = close
    } else if (OPENS.includes(c)) stack.push(c)
    else if (CLOSES.includes(c)) {
      stack.pop()
      if (stack.length === 0) return i
    }
  }
  return -1
}

export function withoutStrings(text: string): string {
  let out = ""
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i] as string
    if (!QUOTED.includes(c)) {
      out += c
      continue
    }
    const close = pastQuoted(text, i)
    if (close === -1) return out
    out += " ".repeat(close - i + 1)
    i = close
  }
  return out
}

export function boundValue(source: string, name: string): string | null {
  const declared = new RegExp(
    `(?:^|\\n)\\s*(?:export\\s+)?const\\s+${name.replaceAll("$", () => "\\$")}\\b[^=\\n]*=`
  ).exec(source)
  if (declared === null) return null
  let at = declared.index + (declared[0] as string).length
  while (at < source.length && (source[at] === " " || source[at] === "\n")) at += 1
  const head = source[at]
  if (head === "[" || head === "{") {
    const close = closeOf(source, at)
    return close === -1 ? null : source.slice(at, close + 1)
  }
  const end = source.indexOf("\n", at)
  return source.slice(at, end === -1 ? source.length : end)
}

function importedFrom(source: string, from: string, name: string): Site | null {
  for (const one of source.matchAll(/import\s*\{([^}]*)\}\s*from\s*"(\.[^"]*)"/g)) {
    for (const part of (one[1] as string).split(",")) {
      const named = part.trim().split(/\s+as\s+/)
      const local = (named[1] ?? named[0] ?? "").trim()
      const exported = (named[0] ?? "").trim()
      if (local !== name || exported === "") continue
      const base = resolve(dirname(from), one[2] as string)
      for (const candidate of [base, `${base}.ts`, `${base}/index.ts`]) {
        if (candidate.endsWith(".ts") && existsSync(candidate)) {
          return { at: candidate, name: exported }
        }
      }
    }
  }
  return null
}

function siteOf(from: Site): Site {
  const source = read(from.at)
  const value = boundValue(source, from.name)
  if (value !== null && /^[A-Za-z_$][\w$]*$/.test(value.trim())) {
    const next = importedFrom(source, from.at, value.trim())
    if (next !== null) return siteOf(next)
    return { at: from.at, name: value.trim() }
  }
  const imported = value === null ? importedFrom(source, from.at, from.name) : null
  return imported === null ? from : siteOf(imported)
}

function flagsIn(text: string): Set<string> {
  return new Set([...text.matchAll(FLAG)].map((one) => one[1] as string))
}

function referencesIn(text: string): readonly string[] {
  const bare = withoutStrings(text)
  const found: string[] = []
  for (const one of bare.matchAll(WORD)) {
    const word = one[0] as string
    const after = bare.slice((one.index ?? 0) + word.length).trimStart()
    if (after.startsWith(":")) continue
    if (NOT_A_REFERENCE.has(word)) continue
    found.push(word)
  }
  return found
}

function gathered(at: string, text: string, seen: Set<string>): Set<string> {
  const found = flagsIn(text)
  const source = read(at)
  for (const word of referencesIn(text)) {
    const here = `${at}#${word}`
    if (seen.has(here)) continue
    seen.add(here)
    const local = boundValue(source, word)
    if (local !== null) {
      for (const flag of gathered(at, local, seen)) found.add(flag)
      continue
    }
    const imported = importedFrom(source, at, word)
    if (imported === null) continue
    const beyond = boundValue(read(imported.at), imported.name)
    if (beyond === null) continue
    for (const flag of gathered(imported.at, beyond, seen)) found.add(flag)
  }
  return found
}

export function declaredFlags(site: Site): Set<string> {
  const value = boundValue(read(site.at), site.name)
  if (value === null) return new Set()
  const marks = value.indexOf("flags:")
  if (marks === -1) return new Set()
  const opens = value.indexOf("[", marks)
  if (opens === -1) return new Set()
  const close = closeOf(value, opens)
  if (close === -1) return new Set()
  return gathered(site.at, value.slice(opens, close + 1), new Set())
}

export function kebabOf(key: string): string {
  return `--${key.replace(/[A-Z]/g, (one) => `-${one.toLowerCase()}`)}`
}

function keysOf(text: string): readonly string[] {
  const bare = withoutStrings(text)
  const found: string[] = []
  let depth = 0
  for (let i = 0; i < bare.length; i += 1) {
    const c = bare[i] as string
    if (OPENS.includes(c)) depth += 1
    else if (CLOSES.includes(c)) depth -= 1
    else if (depth === 1) {
      const rest = bare.slice(i)
      const named = /^([A-Za-z_$][\w$]*)\s*:/.exec(rest)
      if (named === null) continue
      found.push(named[1] as string)
      i += (named[0] as string).length - 1
    }
  }
  return found
}

interface Parser {
  readonly kind: "the help object" | "a spec of its own" | "unread"
  readonly flags: Set<string>
}

function parserIn(at: string, helpNames: ReadonlySet<string>): Parser | null {
  const source = read(at)
  let held: Parser | null = null
  for (let i = source.indexOf("parseArgs("); i !== -1; i = source.indexOf("parseArgs(", i + 1)) {
    const opens = i + "parseArgs(".length - 1
    const close = closeOf(source, opens)
    if (close === -1) continue
    const call = source.slice(opens + 1, close)
    const first = /^\s*([A-Za-z_$][\w$]*)/.exec(call)
    if (first !== null && helpNames.has(first[1] as string)) {
      return { kind: "the help object", flags: new Set() }
    }
    const spec = call.indexOf("{")
    if (spec === -1) continue
    const shut = closeOf(call, spec)
    if (shut === -1) continue
    held = {
      kind: "a spec of its own",
      flags: new Set(keysOf(call.slice(spec, shut + 1)).map(kebabOf)),
    }
  }
  return held
}

const listed = (names: readonly string[]): string => [...names].sort().join(" ")

export const commandHelpBound: AsyncCheck = async (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const commands = declaredCommands(root).filter((one) => one.source !== undefined)
  if (commands.length === 0) {
    return {
      ...judge(NAME, `${root} holds no command file to read`, [
        refusalText("command-help-unsearchable", { root }, root),
      ]),
      population: over(0, UNIT),
    }
  }

  const messages: string[] = []
  let byConstruction = 0
  let compared = 0
  let nothingClaimed = 0
  for (const one of commands) {
    const at = one.source as string
    const relative = at.slice(root.length + 1)
    const command = one.path.join(" ")
    const source = read(at)
    const declares = /(?:export\s+)?const\s+([A-Za-z_$][\w$]*)\s*:\s*CommandHelp\b/.exec(source)
    const local =
      declares !== null
        ? (declares[1] as string)
        : /export\s*\{\s*help\b/.test(source)
          ? "help"
          : null
    if (local === null) {
      nothingClaimed += 1
      continue
    }
    const site = siteOf({ at, name: local })
    const theirs = declaredFlags(site)
    const parser =
      parserIn(at, new Set([local, site.name])) ??
      (site.at === at ? null : parserIn(site.at, new Set([site.name])))
    if (parser === null || parser.kind === "unread") {
      if (theirs.size === 0) {
        nothingClaimed += 1
        continue
      }
      messages.push(
        refusalText(
          "command-help-parser-unread",
          { path: relative, command, flags: listed([...theirs]) },
          root
        )
      )
      continue
    }
    if (parser.kind === "the help object") {
      byConstruction += 1
      continue
    }
    compared += 1
    const ours = parser.flags
    const onlyDocumented = [...theirs].filter((flag) => !ours.has(flag)).sort()
    const onlyAccepted = [...ours].filter((flag) => !theirs.has(flag)).sort()
    if (onlyDocumented.length === 0 && onlyAccepted.length === 0) continue
    const difference = [
      onlyDocumented.length > 0 ? `documented and not accepted ${listed(onlyDocumented)}` : "",
      onlyAccepted.length > 0 ? `accepted and not documented ${listed(onlyAccepted)}` : "",
    ]
      .filter((part) => part !== "")
      .join("; ")
    messages.push(
      refusalText("command-help-flags-drift", { path: relative, command, difference }, root)
    )
  }

  return {
    ...judge(
      NAME,
      `${commands.length} command file(s) read, ${byConstruction} handing the help object itself to the parser, ` +
        `${compared} holding a second flag spec the parser reads instead, ${nothingClaimed} claiming no flag, ` +
        `${messages.length} refused. ` +
        "Only a command holding two declarations can drift, so a clean count over the rest says " +
        "nothing about them beyond that there is one authority to disagree with. Forwarder " +
        "commands build their help when called and carry no file, so they are outside this.",
      messages
    ),
    population: over(commands.length, UNIT),
  }
}
