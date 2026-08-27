
import { chmodSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { recordReadBy } from "../../agent/record-read.ts"
import { blobId } from "../../repo/git/git.ts"
import {
  byteCount,
  carriesShebang,
  type Carry,
  type Commit,
  type Composing,
  type Landing,
  land as landAt,
  LandingRefused,
  recordOwnWrite,
  type SizeChange,
  sizeLines,
} from "../../repo/land/land.ts"
import { type Roots } from "../../page/page"
import { canonicalize, normalizeAbsolute, outOfBounds } from "../../repo/path/path"
import { targetRoot, targetRepo } from "../../repo/roots/roots"


export function fail(message: string): never {
  process.stderr.write(`error: ${message}\n`)
  process.exit(1)
}

export function operational(message: string): never {
  process.stderr.write(`error: ${message}\n`)
  process.exit(3)
}

export function toRelPath(filePath: string, roots: Roots, base: string = process.cwd()): string {
  const resolved = canonicalize(normalizeAbsolute(resolve(base, filePath)))
  const root = canonicalize(targetRoot(roots))
  if (resolved === root || !resolved.startsWith(`${root}/`)) {
    fail(
      `${filePath} does not land inside the ${targetRepo(roots)} root (${targetRoot(roots)}) — ` +
        `a path is taken against the repo this call addresses, and a relative one against ${base}`
    )
  }
  const relative = resolved.slice(root.length + 1)
  const bad = outOfBounds(relative)
  if (bad !== null) fail(bad)
  return relative
}

export function defaultMessage(roots: Roots, verb: string, paths: readonly string[]): string {
  const [only] = paths
  const repo = targetRepo(roots)
  if (paths.length === 1 && only !== undefined) return `${repo}: ${verb} ${only}`
  return `${repo}: ${verb} ${paths.length} files\n\n${paths.join("\n")}`
}

function whereOf(roots: Roots): { readonly repo: string; readonly root: string } {
  return { repo: targetRepo(roots), root: targetRoot(roots) }
}

export function land(
  roots: Roots,
  entries: readonly Landing[],
  message: string,
  dryRun: boolean,
  removing: readonly string[] = [],
  carrying: readonly Carry[] = [],
  mechanical: boolean | ReadonlySet<string> = false,
  goneElsewhere: readonly string[] = [],
  repointedElsewhere: ReadonlyMap<string, string> = new Map()
): void {
  try {
    landAt(
      whereOf(roots),
      entries,
      message,
      dryRun,
      removing,
      carrying,
      mechanical,
      goneElsewhere,
      repointedElsewhere
    )
  } catch (err) {
    if (err instanceof LandingRefused) operational(err.message)
    operational(err instanceof Error ? err.message : String(err))
  }
}

export function recordOwnRead(agent: string | null, relPath: string, roots: Roots): void {
  if (agent === null) return
  const absolute = `${targetRoot(roots)}/${relPath}`
  try {
    const bytes = readFileSync(absolute)
    recordReadBy(agent, canonicalize(absolute), Date.now(), blobId(bytes))
  } catch {
  }
}
