
import { readFileSync } from "node:fs"

export type PidSnapshot = {
  pid: number
  ppid: number
  vmRssKb: number
  pssKb: number
  name: string
}

export const REDACTED = "[REDACTED]"

export const UNCLASSIFIED = "[UNCLASSIFIED]"

export const SAFE_VALUE_FLAGS: ReadonlySet<string> = new Set([
  "-a",
  "--account",
  "--agent-id",
  "--app",
  "--branch",
  "--config",
  "--content-file",
  "--cwd",
  "--dir",
  "--file",
  "--format",
  "--limit",
  "--log",
  "--log-file",
  "--model",
  "--name",
  "--out",
  "--output",
  "--page-type",
  "--profile",
  "--project",
  "--scope",
  "--seq",
  "--session-id",
  "--slug",
  "--status",
  "--system-prompt-file",
  "--tail",
  "--text-file",
  "--type",
])

const CREDENTIAL_FLAG_RE =
  /(token|secret|password|passwd|credential|auth|bearer|api-?key|private|signature|session-token|cookie|url)/i

const PATH_ROOT_RE =
  /^(\/(home|var|usr|opt|etc|tmp|proc|sys|bin|sbin|srv|run|mnt|media|nix|snap|dev|root)\/|\.{1,2}\/|~\/|(packages|apps|infra|docs|scripts|src|test|tests|node_modules|dist|build)\/)/

const PATH_CHARS_RE = /^[A-Za-z0-9._@+/-]+$/
const SUBCOMMAND_WORD_RE = /^[a-z][a-z0-9-]{0,31}$/
const SOURCE_EXT_RE =
  /\.(ts|tsx|js|jsx|mjs|cjs|md|json|jsonl|lua|sql|sh|yaml|yml|toml|txt|log|css|html|py)$/

export const MAX_TOKEN_CHARS = 200

export const MAX_ARGV_TOKENS = 64

const MAX_PATH_SEGMENT_CHARS = 128

export function isSafeSubcommandWord(token: string): boolean {
  return SUBCOMMAND_WORD_RE.test(token)
}

export function isSafePath(token: string): boolean {
  if (!token.includes("/") || !PATH_CHARS_RE.test(token)) return false
  if (!PATH_ROOT_RE.test(token) && !SOURCE_EXT_RE.test(token)) return false
  return token.split("/").every((seg) => seg.length <= MAX_PATH_SEGMENT_CHARS)
}

function truncate(token: string): string {
  return token.length <= MAX_TOKEN_CHARS ? token : `${token.slice(0, MAX_TOKEN_CHARS)}…`
}

function withheldFor(flagName: string): string {
  return CREDENTIAL_FLAG_RE.test(flagName) ? REDACTED : UNCLASSIFIED
}

function classifyValue(token: string): string {
  return isSafeSubcommandWord(token) || isSafePath(token) ? truncate(token) : UNCLASSIFIED
}

export function redactArgv(argv: readonly string[]): readonly string[] {
  const capped = argv.slice(0, MAX_ARGV_TOKENS)
  const out: string[] = []
  let pendingFlag: string | null = null
  let expectProgram = true

  for (const token of capped) {
    if (expectProgram && !token.startsWith("-")) {
      out.push(classifyValue(token))
      expectProgram = false
      continue
    }
    expectProgram = false
    if (token === "--") {
      out.push(token)
      pendingFlag = null
      expectProgram = true
      continue
    }
    if (token.startsWith("-")) {
      const eq = token.indexOf("=")
      if (eq > 0) {
        const name = token.slice(0, eq)
        out.push(SAFE_VALUE_FLAGS.has(name) ? truncate(token) : `${name}=${withheldFor(name)}`)
        pendingFlag = null
        continue
      }
      out.push(truncate(token))
      pendingFlag = token
      continue
    }
    if (pendingFlag !== null) {
      out.push(SAFE_VALUE_FLAGS.has(pendingFlag) ? truncate(token) : withheldFor(pendingFlag))
      pendingFlag = null
      continue
    }
    out.push(classifyValue(token))
  }

  const dropped = argv.length - capped.length
  if (dropped > 0) out.push(`+${dropped} more`)
  return out
}

export function redactProcCmdline(raw: string): readonly string[] {
  const argv = raw.split("\0").filter((t) => t !== "")
  return argv.length === 0 ? [] : redactArgv(argv)
}

export function isContainerCgroup(cgroupContent: string): boolean {
  return /libpod-/.test(cgroupContent)
}

export function readRedactedArgv(pid: number): readonly string[] | undefined {
  let raw: string
  try {
    raw = readFileSync(`/proc/${pid}/cmdline`, "utf8")
  } catch {
    return undefined
  }
  const argv = redactProcCmdline(raw)
  return argv.length === 0 ? undefined : argv
}

export function readContainerPids(snapshots: readonly PidSnapshot[]): readonly number[] {
  const pids: number[] = []
  for (const s of snapshots) {
    let cgroup: string
    try {
      cgroup = readFileSync(`/proc/${s.pid}/cgroup`, "utf8")
    } catch {
      continue
    }
    if (isContainerCgroup(cgroup)) pids.push(s.pid)
  }
  return pids
}
