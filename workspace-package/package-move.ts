import type { Moves, Repointed } from "../repoint/repoint.ts"
import type { Landed } from "./relocated-path.ts"
import { tsconfigRelocated } from "./tsconfig-relocated.ts"

const MANIFEST = "package.json"

const TSCONFIG = /(^|\/)tsconfig[^/]*\.json$/

export interface Relocations {
  readonly entries: readonly Repointed[]
  readonly renamed: number
  readonly refused: readonly string[]
}

export function within(dir: string, relPath: string): boolean {
  return relPath === dir || relPath.startsWith(`${dir}/`)
}

export function carriesManifest(tracked: readonly string[], dir: string): boolean {
  return tracked.includes(`${dir}/${MANIFEST}`)
}

export function innerPackages(fromDir: string, dirs: readonly string[]): readonly string[] {
  return dirs.filter((one) => one !== fromDir && within(fromDir, one))
}

export function movesForPackage(
  fromDir: string,
  toDir: string,
  tracked: readonly string[],
  inner: readonly string[]
): Moves {
  const moves = new Map<string, string>()
  for (const relPath of tracked) {
    if (!within(fromDir, relPath)) continue
    if (inner.some((one) => within(one, relPath))) continue
    moves.set(relPath, `${toDir}${relPath.slice(fromDir.length)}`)
  }
  return moves
}

export function namesTsconfig(relPath: string): boolean {
  return TSCONFIG.test(relPath)
}

export function withTsconfigsRelocated(
  entries: readonly Repointed[],
  fromDir: string,
  toDir: string,
  landed: readonly Landed[]
): Relocations {
  const out: Repointed[] = []
  const refused: string[] = []
  let renamed = 0
  for (const entry of entries) {
    if (!entry.moved || !namesTsconfig(entry.relPath)) {
      out.push(entry)
      continue
    }
    const held = tsconfigRelocated(entry.body, fromDir, toDir, landed)
    if (held === null) {
      out.push(entry)
      continue
    }
    for (const spec of held.refused) refused.push(`${entry.relPath}:${spec}`)
    renamed += held.renamed.length
    out.push({
      ...entry,
      body: held.body,
      notes: [...entry.notes, ...held.renamed.map((one) => `${one.spec} → ${one.to}`)],
    })
  }
  return { entries: out, renamed, refused }
}
