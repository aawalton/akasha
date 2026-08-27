import { posix } from "node:path"
import ts from "typescript"
import type { Repo } from "../../../../../../page/document/types.ts"
import { readRepoFile } from "../../../repos.ts"
import type { BuildContext } from "../../../types.ts"
import { repoTree } from "../../lib/repo-tree.ts"
import { matchGlob } from "./globs.ts"

export type TsconfigParseResult = {
  readonly fileNames: readonly string[]
  readonly includeOnlyFileNames: readonly string[]
  readonly options: ts.CompilerOptions | null
}

const EMPTY_RESULT: TsconfigParseResult = {
  fileNames: [],
  includeOnlyFileNames: [],
  options: null,
}

const hasWildcard = (spec: string): boolean => spec.includes("*") || spec.includes("?")

const namesADirectory = (spec: string): boolean => {
  if (hasWildcard(spec)) return false
  const slash = spec.lastIndexOf("/")
  const last = slash === -1 ? spec : spec.slice(slash + 1)
  return !last.includes(".")
}

const specMatches = (spec: string, relPath: string): boolean => {
  const cleaned = spec.startsWith("./") ? spec.slice(2) : spec
  if (cleaned === "") return false
  if (namesADirectory(cleaned)) {
    return relPath === cleaned || relPath.startsWith(`${cleaned}/`)
  }
  return matchGlob(cleaned, relPath)
}

const anySpecMatches = (specs: readonly string[], relPath: string): boolean => {
  for (const spec of specs) {
    if (specMatches(spec, relPath)) return true
  }
  return false
}

const hasAnyExtension = (relPath: string, extensions: readonly string[]): boolean => {
  if (extensions.length === 0) return true
  for (const extension of extensions) {
    if (relPath.endsWith(extension)) return true
  }
  return false
}

const depthOf = (relPath: string): number => relPath.split("/").length - 1

export const snapshotParseConfigHost = (
  ctx: BuildContext,
  repo: Repo,
  repoRoot: string
): ts.ParseConfigHost => {
  const tree = repoTree(ctx, repo)
  const toRel = (absPath: string): string => {
    if (absPath === repoRoot) return ""
    if (absPath.startsWith(`${repoRoot}/`)) return absPath.slice(repoRoot.length + 1)
    return absPath.startsWith("/") ? absPath.slice(1) : absPath
  }
  const toAbs = (relPath: string): string =>
    relPath === "" ? repoRoot : `${repoRoot}/${relPath}`
  return {
    useCaseSensitiveFileNames: true,
    fileExists: (path) => tree.hasFile(toRel(path)),
    readFile: (path) => readRepoFile(ctx, repo, toRel(path)) ?? undefined,
    readDirectory: (rootDir, extensions, excludes, includes, depth) => {
      const rootRel = toRel(rootDir)
      const under = rootRel === "" ? "" : `${rootRel}/`
      const resolveSpec = (spec: string): string => {
        const cleaned = spec.startsWith("./") ? spec.slice(2) : spec
        if (cleaned.startsWith("/")) return toRel(cleaned)
        return posix.normalize(`${under}${cleaned}`)
      }
      const excludeSpecs = excludes === undefined ? [] : excludes.map(resolveSpec)
      const includeSpecs = includes.map(resolveSpec)
      const out: string[] = []
      for (const relPath of tree.paths) {
        if (includeSpecs.length === 0 && under !== "" && !relPath.startsWith(under)) continue
        if (!hasAnyExtension(relPath, extensions)) continue
        if (depth !== undefined && relPath.startsWith(under)) {
          if (depthOf(relPath.slice(under.length)) > depth) continue
        }
        if (anySpecMatches(excludeSpecs, relPath)) continue
        if (includeSpecs.length > 0 && !anySpecMatches(includeSpecs, relPath)) continue
        out.push(toAbs(relPath))
      }
      return out
    },
  }
}

export const parseTsconfig = (
  ctx: BuildContext,
  repo: Repo,
  repoRoot: string,
  tsconfigRelPath: string
): TsconfigParseResult => {
  const tree = repoTree(ctx, repo)
  if (!tree.hasFile(tsconfigRelPath)) return EMPTY_RESULT
  const host = snapshotParseConfigHost(ctx, repo, repoRoot)
  const basePath =
    posix.dirname(tsconfigRelPath) === "."
      ? repoRoot
      : `${repoRoot}/${posix.dirname(tsconfigRelPath)}`
  const configFile = ts.readConfigFile(
    `${repoRoot}/${tsconfigRelPath}`,
    (path) => host.readFile(path)
  )
  if (configFile.error) return EMPTY_RESULT
  const parsed = ts.parseJsonConfigFileContent(configFile.config, host, basePath)
  const rawExcludes: unknown = configFile.config?.exclude
  const hasExcludes = Array.isArray(rawExcludes) && rawExcludes.some((x) => typeof x === "string")

  let includeOnlyFileNames: readonly string[] = []
  if (hasExcludes) {
    const noExcludeConfig = { ...configFile.config, exclude: [] }
    const noExcludeParsed = ts.parseJsonConfigFileContent(noExcludeConfig, host, basePath)
    const includedSet = new Set(parsed.fileNames)
    includeOnlyFileNames = noExcludeParsed.fileNames.filter((f) => !includedSet.has(f))
  }

  return {
    fileNames: parsed.fileNames,
    includeOnlyFileNames,
    options: parsed.options,
  }
}
