import {
  pathspecsForPrefix as pathspecsForPrefixBridge,
  pathspecsForPrefixes as pathspecsForPrefixesBridge,
} from "./tracking-modules.ts"

interface NetBytesAccumulator {
  readonly pushLine: (line: string) => undefined
  readonly total: () => number
}

const COMMIT_HEADER = /^commit [0-9a-f]/

function createNetBytesAccumulator(): NetBytesAccumulator {
  let total = 0
  let added = 0
  let removed = 0
  let inCommit = false
  return {
    pushLine: (line: string): undefined => {
      if (COMMIT_HEADER.test(line)) {
        if (inCommit) total += Math.max(0, added - removed)
        added = 0
        removed = 0
        inCommit = true
        return undefined
      }
      if (line.startsWith("+") && !line.startsWith("+++")) {
        added += Buffer.byteLength(line, "utf8")
      } else if (line.startsWith("-") && !line.startsWith("---")) {
        removed += Buffer.byteLength(line, "utf8")
      }
      return undefined
    },
    total: (): number => total + (inCommit ? Math.max(0, added - removed) : 0),
  }
}

export const pathspecsForPrefix = pathspecsForPrefixBridge as (
  pathPrefix: string
) => readonly string[]

const pathspecsForPrefixes = pathspecsForPrefixesBridge as (
  prefixes: string | readonly string[]
) => readonly string[]

export const FAITH_BOOKS_PREFIX = "all-about-alan/"
export const LEARN_BOOKS_PREFIX = "book-of-everything/"
export const MATH_BOOKS_PREFIX = "my-math/"
export const MY_FAITH_BOOKS_PREFIX = "my-faith/"

export interface DayWindow {
  readonly start: Date
  readonly end: Date
}

interface GitResult {
  readonly stdout: string
  readonly stderr: string
  readonly exitCode: number
}

async function runGit(args: readonly string[], cwd: string): Promise<GitResult> {
  const proc = Bun.spawn(["git", ...args], { cwd, stdout: "pipe", stderr: "pipe" })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? 1 }
}

export async function requireGit(args: readonly string[], cwd: string): Promise<string> {
  const result = await runGit(args, cwd)
  if (result.exitCode !== 0) {
    throw new Error(
      `git ${args[0] ?? ""} failed (exit ${result.exitCode}): ${result.stderr.trim()}`
    )
  }
  return result.stdout
}

async function streamNetBytes(args: readonly string[], cwd: string): Promise<number> {
  const proc = Bun.spawn(["git", ...args], { cwd, stdout: "pipe", stderr: "pipe" })
  const stderrPromise = new Response(proc.stderr).text()
  const acc = createNetBytesAccumulator()
  const decoder = new TextDecoder()
  const reader = proc.stdout.getReader()
  let carry = ""
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    const text = carry + decoder.decode(value, { stream: true })
    const lines = text.split("\n")
    carry = lines.pop() ?? ""
    for (const line of lines) acc.pushLine(line)
  }
  carry += decoder.decode()
  if (carry.length > 0) acc.pushLine(carry)
  const stderr = await stderrPromise
  await proc.exited
  if ((proc.exitCode ?? 1) !== 0) {
    throw new Error(`git ${args[0] ?? ""} failed (exit ${proc.exitCode}): ${stderr.trim()}`)
  }
  return acc.total()
}

export async function readNetBytesForWindow(
  repoRoot: string,
  window: DayWindow,
  pathPrefixes: string | readonly string[]
): Promise<number> {
  return streamNetBytes(
    [
      "log",
      "-p",
      "--no-renames",
      `--since=${window.start.toISOString()}`,
      `--until=${window.end.toISOString()}`,
      "--",
      ...pathspecsForPrefixes(pathPrefixes),
    ],
    repoRoot
  )
}

export async function readNetBytesCumulative(
  repoRoot: string,
  pathPrefixes: string | readonly string[],
  ref?: string
): Promise<number> {
  const refArgs = ref === undefined ? [] : [ref]
  return streamNetBytes(
    ["log", "-p", "--no-renames", ...refArgs, "--", ...pathspecsForPrefixes(pathPrefixes)],
    repoRoot
  )
}

export async function readRepoRoot(cwd: string): Promise<string> {
  return (await requireGit(["rev-parse", "--show-toplevel"], cwd)).trim()
}

export async function resolveLandedBase(repoRoot: string): Promise<string> {
  const result = await runGit(["rev-parse", "--verify", "--quiet", "origin/main"], repoRoot)
  return result.exitCode === 0 ? "origin/main" : "HEAD"
}

export async function readPendingNetBytes(
  repoRoot: string,
  pathPrefixes: string | readonly string[],
  base = "origin/main"
): Promise<number> {
  return streamNetBytes(
    ["log", "-p", "--no-renames", `${base}..HEAD`, "--", ...pathspecsForPrefixes(pathPrefixes)],
    repoRoot
  )
}
