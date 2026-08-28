import { refusalText } from "../../refusal/refusal.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"
import { scanCommand } from "./substituting-backtick.ts"

const ALLOW = 0
const BLOCK = 2
const UNRESOLVED = 3

const WINDOW = 44

const repoRoot = (): string => rootFor(resolveRoots(), AKASHA)

function whereAt(position: string): string {
  if (position === "unquoted")
    return refusalText("block-substituting-backtick-where-unquoted", {}, repoRoot())
  if (position === "double-quoted")
    return refusalText("block-substituting-backtick-where-double-quoted", {}, repoRoot())
  if (position === "heredoc")
    return refusalText("block-substituting-backtick-where-heredoc", {}, repoRoot())
  return refusalText("block-substituting-backtick-where-unknown", {}, repoRoot())
}

function excerpt(command: string, index: number): string {
  const from = Math.max(0, index - WINDOW)
  const to = Math.min(command.length, index + WINDOW)
  const head = from === 0 ? "" : "..."
  const line = command.slice(from, to).replace(/\n/g, " ")
  const caret = " ".repeat(head.length + (index - from))
  return `      ${head}${line}${to === command.length ? "" : "..."}\n      ${caret}^`
}

export function renderRefusal(command: string, index: number, position: string): string {
  return refusalText(
    "block-substituting-backtick",
    { index: String(index), where: whereAt(position), excerpt: excerpt(command, index) },
    repoRoot()
  )
}

export function scopeReport(): string {
  return [
    "block-substituting-backtick — declared scope",
    "",
    "COVERS  every Bash tool call on this workstation, whatever the command. It reads no",
    "        CLI's flag surface, no generated artifact and no repository, so no command is",
    "        newer than it and nothing it covers can fall out of a checkout.",
    "",
    "DOES NOT COVER — each a known gap, not an untested area:",
    "  - $( ) and ${ }, which carry the same hazard and are REQUIRED syntax. A universal",
    "    guard cannot refuse them, and this is the coverage its ancestor had and it gives",
    "    up: inside a declared `ops` prose flag, those two were refused as well.",
    "  - Bare $NAME expansion. Data-loss only, never execution.",
    "  - Anything outside a Bash tool call: a child process a command spawns for itself, and",
    "    every non-Bash tool path. How many callers that exempts is NOT MEASURED.",
    "  - Constructs this scanner has no case for. It models QUOTING, not bash — five",
    "    states and a stack for $( ) — so a construct nobody thought of is judged by",
    "    whichever state the machine is in when it arrives, rather than on its own terms.",
    "  - A command it cannot parse to the end. Refuses nothing, by design, and says so.",
    "  - Authored data. It observes invocations, never stored data, so it can refuse a",
    "    command at the moment of use and can enumerate nothing.",
    "",
    "HEALTH  Only exit 2 blocks; every other exit lets the call through. So this closes",
    "        anything only WHILE HEALTHY. Its own failures, and every command it could",
    "        not parse, are appended to the health file the wrapper names and surfaced as",
    "        a systemMessage; nothing observes that file automatically.",
  ].join("\n")
}

function commandOf(payload: unknown): string | null {
  if (payload === null || typeof payload !== "object") return null
  const fields = payload as Record<string, unknown>
  const tool = fields.tool_name
  if (typeof tool === "string" && tool !== "Bash") return null
  const input = fields.tool_input
  if (input === null || typeof input !== "object") return null
  const command = (input as Record<string, unknown>).command
  return typeof command === "string" && command !== "" ? command : null
}

async function main(): Promise<number> {
  if (Bun.argv.includes("--scope")) {
    console.log(scopeReport())
    return ALLOW
  }
  let payload: unknown
  try {
    payload = JSON.parse(await Bun.stdin.text())
  } catch {
    return ALLOW
  }
  const command = commandOf(payload)
  if (command === null) return ALLOW

  const verdict = scanCommand(command)
  if (verdict.kind === "clear") return ALLOW
  if (verdict.kind === "unparseable") {
    process.stderr.write(`${verdict.reason}\n`)
    return UNRESOLVED
  }
  process.stderr.write(`${renderRefusal(command, verdict.hazard.index, verdict.hazard.position)}\n`)
  return BLOCK
}

if (import.meta.main) process.exit(await main())
