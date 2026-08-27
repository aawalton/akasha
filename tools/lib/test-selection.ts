import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"

const STATE_DIR = `${homedir()}/.instruction-checks`

const GREEN = `${STATE_DIR}/green`

const TS_UNDER_TOOLS = /^tools\/.+\.ts$/

const RELATIVE = /(?:^|[\s;])(?:import|export)\b[^"'`]*?from\s*["']([^"']+)["']/g

const BARE_IMPORT = /(?:^|[\s;])import\s*["']([^"']+)["']/g

const WALKS_DOCUMENTS = /listDocuments\(|repo\.documents|RepoView/

const HOLDS_ROOT = /resolveRoots\(|AKASHA_ROOT|import\.meta\.dir|\broots\.\w+|repo\.read\(/

const DECLARATION = /^\s*export\s+(?:async\s+)?(?:function|const|interface|type)\s/

export interface Selection {
  readonly files: readonly string[]
  readonly considered: readonly string[]
  readonly reason: string
}

export function readGreen(): string | null {
  if (!existsSync(GREEN)) return null
  const sha = readFileSync(GREEN, "utf8").trim()
  return /^[0-9a-f]{40}$/.test(sha) ? sha : null
}

export function writeGreen(sha: string): void {
  mkdirSync(STATE_DIR, { recursive: true })
  writeFileSync(GREEN, `${sha}\n`)
}

function git(root: string, args: readonly string[]): string | null {
  const run = Bun.spawnSync({ cmd: ["git", ...args], cwd: root, stdout: "pipe", stderr: "pipe" })
  if (run.exitCode !== 0) return null
  return run.stdout.toString()
}

export function headSha(root: string): string | null {
  const sha = git(root, ["rev-parse", "HEAD"])?.trim() ?? ""
  return /^[0-9a-f]{40}$/.test(sha) ? sha : null
}

export function changedSince(root: string, sha: string): readonly string[] | null {
  if (git(root, ["cat-file", "-e", `${sha}^{commit}`]) === null) return null
  const committed = git(root, ["diff", "--name-only", sha, "HEAD"])
  const working = git(root, ["status", "--porcelain", "-z"])
  if (committed === null || working === null) return null
  const changed = new Set(committed.split("\n").filter((line) => line.length > 0))
  for (const entry of working.split("\0")) {
    if (entry.length > 3) changed.add(entry.slice(3))
  }
  return [...changed].sort()
}

export function specifiers(source: string): readonly string[] {
  const found: string[] = []
  for (const match of source.matchAll(RELATIVE)) found.push(match[1] as string)
  for (const match of source.matchAll(BARE_IMPORT)) found.push(match[1] as string)
  return found
}

function resolved(from: string, specifier: string): string | null {
  if (!specifier.startsWith(".")) return null
  const parts = `${from.split("/").slice(0, -1).join("/")}/${specifier}`.split("/")
  const stack: string[] = []
  for (const part of parts) {
    if (part === "." || part === "") continue
    if (part === "..") stack.pop()
    else stack.push(part)
  }
  const path = stack.join("/")
  return path.endsWith(".ts") ? path : null
}

export function directories(root: string): readonly string[] {
  const out = git(root, ["ls-files"])
  if (out === null) return []
  const dirs = new Set<string>()
  for (const relPath of out.split("\n")) {
    const top = relPath.split("/")[0]
    if (top !== undefined && top.length > 0 && relPath.includes("/")) dirs.add(top)
  }
  return [...dirs].sort()
}

export interface Module {
  readonly imports: readonly string[]
  readonly walksDocuments: boolean
  readonly holdsRoot: boolean
  readonly directories: ReadonlySet<string>
}

function calls(source: string): string {
  return source
    .split("\n")
    .filter((line) => !DECLARATION.test(line))
    .join("\n")
}

export function modules(root: string, dirs: readonly string[] = directories(root)): ReadonlyMap<string, Module> {
  const named = dirs.map((dir) => [dir, new RegExp(`["'\`(/]${dir}/`)] as const)
  const found = new Map<string, Module>()
  for (const relPath of new Bun.Glob("tools/**/*.ts").scanSync({ cwd: root })) {
    const source = readFileSync(`${root}/${relPath}`, "utf8")
    const used = calls(source)
    const reached = specifiers(source)
      .map((specifier) => resolved(relPath, specifier))
      .filter((path): path is string => path !== null)
    found.set(relPath, {
      imports: reached,
      walksDocuments: WALKS_DOCUMENTS.test(used),
      holdsRoot: HOLDS_ROOT.test(used),
      directories: new Set(named.filter(([, at]) => at.test(source)).map(([dir]) => dir)),
    })
  }
  return found
}

export interface Reach {
  readonly modules: ReadonlySet<string>
  readonly walksDocuments: boolean
  readonly holdsRoot: boolean
  readonly directories: ReadonlySet<string>
}

export function reach(entry: string, graph: ReadonlyMap<string, Module>): Reach {
  const seen = new Set<string>()
  const dirs = new Set<string>()
  let walksDocuments = false
  let holdsRoot = false
  const pending = [entry]
  while (pending.length > 0) {
    const here = pending.pop() as string
    if (seen.has(here)) continue
    seen.add(here)
    const module = graph.get(here)
    if (module === undefined) continue
    if (module.walksDocuments) walksDocuments = true
    if (module.holdsRoot) holdsRoot = true
    for (const dir of module.directories) dirs.add(dir)
    for (const next of module.imports) pending.push(next)
  }
  return { modules: seen, walksDocuments: walksDocuments, holdsRoot, directories: dirs }
}

export function select(
  tests: readonly string[],
  changed: readonly string[],
  graph: ReadonlyMap<string, Module>
): readonly string[] {
  const touched = changed.filter((relPath) => TS_UNDER_TOOLS.test(relPath))
  const movedDirs = new Set(
    changed.filter((relPath) => !TS_UNDER_TOOLS.test(relPath)).map((relPath) => relPath.split("/")[0] as string)
  )
  const chosen: string[] = []
  for (const test of tests) {
    const reached = reach(test, graph)
    if (touched.some((relPath) => reached.modules.has(relPath))) {
      chosen.push(test)
      continue
    }
    if (movedDirs.size === 0) continue
    if (reached.walksDocuments || (reached.holdsRoot && reached.directories.size === 0)) {
      chosen.push(test)
      continue
    }
    if ([...movedDirs].some((dir) => reached.directories.has(dir))) chosen.push(test)
  }
  return chosen
}

export function selection(root: string, tests: readonly string[]): Selection {
  const all = { files: tests, considered: tests }
  const green = readGreen()
  if (green === null) return { ...all, reason: "no commit is on record as green, so every test runs" }
  const changed = changedSince(root, green)
  if (changed === null) {
    return { ...all, reason: `git could not read what changed since ${green.slice(0, 8)}, so every test runs` }
  }
  const dirs = directories(root)
  if (dirs.length === 0) return { ...all, reason: "git listed no directory, so every test runs" }
  const graph = modules(root, dirs)
  if (graph.size === 0) return { ...all, reason: "no module was read, so nothing says what a change reaches" }
  const chosen = select(tests, changed, graph)
  return {
    files: chosen,
    considered: tests,
    reason:
      `${changed.length} file(s) changed since ${green.slice(0, 8)}, ` +
      `reaching ${chosen.length} of ${tests.length} test file(s)`,
  }
}
