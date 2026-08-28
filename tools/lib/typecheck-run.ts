import { existsSync, readFileSync, realpathSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { refusalText } from "../../refusal/refusal.ts"
import { AKASHA, resolveRoots, rootFor, VENDOR_ROOT } from "../../repo/roots/roots"
import { link } from "./sibling-link.ts"

const TSCONFIG = "tsconfig.json"

const ALWAYS_EXCLUDED = "node_modules"

export const BUILD_INFO = ".tsbuildinfo"

export const ABSENT =
  "no `tsc` with `@types/bun` beside it is reachable from PATH — run `bun install -g typescript @types/bun` (globally: a `node_modules` in this root would be swept into the repository scan)"

export interface Instrument {
  readonly tsc: string
  readonly typeRoot: string
}

export function instrument(): Instrument | null {
  const installed = `${process.env.HOME ?? "/nonexistent"}/.bun/bin/tsc`
  const found = existsSync(installed) ? installed : Bun.which("tsc")
  if (found === null || !existsSync(found)) return null
  const real = realpathSync(found)
  const segments = real.split("/")
  const at = segments.lastIndexOf("node_modules")
  if (at === -1) return null
  const typeRoot = `${segments.slice(0, at + 1).join("/")}/@types`
  if (!existsSync(`${typeRoot}/bun`)) return null
  return { tsc: real, typeRoot }
}

export interface RepoReach {
  readonly exists: (absolutePath: string) => boolean
  readonly read: (absolutePath: string) => string | null
}

export const FROM_DISK: RepoReach = {
  exists: (at) => existsSync(at),
  read: (at) => {
    try {
      return readFileSync(at, "utf8")
    } catch {
      return null
    }
  },
}

function packageDirOf(root: string, relPath: string, reach: RepoReach): string | null {
  let at = dirname(relPath)
  while (at !== "." && at !== "" && at !== "/") {
    if (reach.exists(`${root}/${at}/${TSCONFIG}`)) return at
    at = dirname(at)
  }
  return null
}

function excludedIn(root: string, packageDir: string, reach: RepoReach): readonly string[] {
  const body = reach.read(`${root}/${packageDir}/${TSCONFIG}`)
  if (body === null) return []
  try {
    const held: unknown = JSON.parse(body)
    if (held === null || typeof held !== "object") return []
    const stated = (held as { exclude?: unknown }).exclude
    if (!Array.isArray(stated)) return []
    return stated.filter((one): one is string => typeof one === "string")
  } catch {
    return []
  }
}

function reaches(glob: string, relPath: string): boolean {
  return new Bun.Glob(glob).match(relPath) || new Bun.Glob(`${glob}/**`).match(relPath)
}

export function excludesFor(
  root: string,
  relPaths: Iterable<string>,
  subjects: readonly string[],
  reach: RepoReach
): readonly string[] {
  const dirs = new Set<string>()
  for (const relPath of relPaths) {
    const at = packageDirOf(root, relPath, reach)
    if (at !== null) dirs.add(at)
  }
  const found = new Set<string>()
  for (const at of dirs) {
    for (const one of excludedIn(root, at, reach)) {
      const glob = `${at}/${one}`
      if (subjects.some((one) => reaches(glob, one))) continue
      found.add(glob)
    }
  }
  return [...found].sort()
}

export function writeTsconfig(dir: string, typeRoot: string, exclude: readonly string[]): void {
  writeFileSync(
    `${dir}/tsconfig.json`,
    JSON.stringify(
      {
        compilerOptions: {
          strict: true,
          noEmit: true,
          module: "Preserve",
          allowImportingTsExtensions: true,
          types: ["bun"],
          typeRoots: [typeRoot],
          skipLibCheck: true,
          incremental: true,
          tsBuildInfoFile: BUILD_INFO,
        },
        include: ["**/*.ts"],
        exclude: [ALWAYS_EXCLUDED, ...exclude.filter((one) => one !== ALWAYS_EXCLUDED)],
      },
      null,
      2
    )
  )
}

export function linkModules(dir: string): void {
  link(`${rootFor(resolveRoots(), AKASHA)}/${VENDOR_ROOT}`, `${dir}/${VENDOR_ROOT}`)
}

export interface TscRun {
  readonly output: string
  readonly exitCode: number
}

export function runTsc(found: Instrument, dir: string): TscRun {
  const run = Bun.spawnSync({
    cmd: [process.execPath, found.tsc, "--noEmit", "--pretty", "false", "-p", "tsconfig.json"],
    cwd: dir,
    stdout: "pipe",
    stderr: "pipe",
  })
  return {
    output: `${run.stdout.toString()}${run.stderr.toString()}`,
    exitCode: run.exitCode ?? 0,
  }
}

export interface Diagnostic {
  readonly relPath: string
  readonly line: string
  readonly text: string
}

const DIAGNOSTIC = /^(.+?)\((\d+),\d+\): error (TS\d+: .*)$/

export function diagnostics(output: string, into: string): readonly Diagnostic[] {
  const found: Diagnostic[] = []
  for (const raw of output.split("\n")) {
    const match = DIAGNOSTIC.exec(raw)
    if (match === null) continue
    const [, where, line, text] = match
    if (where === undefined || line === undefined || text === undefined) continue
    found.push({
      relPath: where.startsWith(`${into}/`) ? where.slice(into.length + 1) : where,
      line,
      text,
    })
  }
  return found
}

export function reported(errors: readonly Diagnostic[], ceiling: number): readonly string[] {
  const root = rootFor(resolveRoots(), AKASHA)
  const lines = errors
    .slice(0, ceiling)
    .map((e) =>
      refusalText(
        "typecheck-diagnostic",
        { path: e.relPath, line: String(e.line), text: e.text },
        root
      )
    )
  if (errors.length > lines.length) {
    lines.push(
      refusalText(
        "typecheck-diagnostics-elided",
        { more: String(errors.length - lines.length) },
        root
      )
    )
  }
  return lines
}
