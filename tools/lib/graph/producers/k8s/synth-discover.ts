import { posix } from "node:path"
import { isSynthPath } from "@infra/k8s-synth/manifests"
import ts from "typescript"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { repoFiles } from "../lib/repo-files.ts"

export type SynthSourceFile = {
  readonly sourcePath: string
  readonly text: string
}

export type DiscoveredSynthFile = {
  readonly serviceDir: string
  readonly sources: readonly SynthSourceFile[]
  readonly sopsFiles: readonly string[]
}

const SYNTH_ENTRY = "synth.ts"

const MANIFEST_DIR = "k8s"

export const serviceRootOf = (serviceDir: string): string =>
  posix.basename(serviceDir) === MANIFEST_DIR ? posix.dirname(serviceDir) : serviceDir

const isSopsName = (name: string): boolean =>
  name.endsWith(".sops.yaml") || name.endsWith(".sops.yml")

const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0)

const relativeImports = (sourcePath: string, text: string): readonly string[] => {
  const sf = ts.createSourceFile(sourcePath, text, ts.ScriptTarget.Latest, true)
  const out: string[] = []
  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    const specifier = statement.moduleSpecifier
    if (!ts.isStringLiteral(specifier)) continue
    if (!specifier.text.startsWith(".")) continue
    out.push(specifier.text)
  }
  return out
}

const reachedFrom = (
  fromDir: string,
  specifier: string,
  standing: ReadonlySet<string>
): string | null => {
  const at = posix.normalize(posix.join(fromDir, specifier))
  for (const candidate of [at, `${at}.ts`, `${at}/index.ts`]) {
    if (candidate.endsWith(".ts") && standing.has(candidate)) return candidate
  }
  return null
}

const sourcesOf = (
  ctx: BuildContext,
  entryPath: string,
  standing: ReadonlySet<string>
): readonly SynthSourceFile[] => {
  const held = new Map<string, string>()
  const pending: string[] = [entryPath]
  while (pending.length > 0) {
    const at = pending.pop()
    if (at === undefined || held.has(at)) continue
    const text = readRepoFile(ctx, CODE_REPO, at)
    if (text === null) continue
    held.set(at, text)
    for (const specifier of relativeImports(at, text)) {
      const reached = reachedFrom(posix.dirname(at), specifier, standing)
      if (reached !== null && !held.has(reached)) pending.push(reached)
    }
  }
  const entryText = held.get(entryPath)
  if (entryText === undefined) return []
  const out: SynthSourceFile[] = [{ sourcePath: entryPath, text: entryText }]
  for (const at of [...held.keys()].filter((one) => one !== entryPath).sort(byName)) {
    const text = held.get(at)
    if (text === undefined) continue
    out.push({ sourcePath: at, text })
  }
  return out
}

export const discoverSynthFiles = (ctx: BuildContext): readonly DiscoveredSynthFile[] => {
  const paths = repoFiles(ctx, CODE_REPO)
  const standing = new Set(paths)
  const serviceDirs = paths
    .filter((relPath) => isSynthPath(relPath))
    .map((relPath) => posix.dirname(relPath))
    .sort(byName)
  const sopsPaths = paths.filter((relPath) => isSopsName(posix.basename(relPath))).sort(byName)
  const out: DiscoveredSynthFile[] = []
  for (const serviceDir of serviceDirs) {
    const sources = sourcesOf(ctx, `${serviceDir}/${SYNTH_ENTRY}`, standing)
    if (sources.length === 0) continue
    out.push({
      serviceDir,
      sources,
      sopsFiles: sopsPaths.filter((relPath) =>
        relPath.startsWith(`${serviceRootOf(serviceDir)}/`)
      ),
    })
  }
  return out
}
