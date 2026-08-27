import ts from "typescript"
import type { Repo } from "../../../../../../page/document/types.ts"
import { readRepoFile } from "../../../repos.ts"
import type { BuildContext } from "../../../types.ts"
import { repoTree } from "../../lib/repo-tree.ts"
import { parseTsconfig } from "./discover-tsconfig.ts"

export type Resolver = {
  readonly resolve: (specifier: string, fromRelPath: string) => string | null
}

const VENDOR_DIR = "node_modules"

const SEPARATOR = "/"

type Vantage =
  | { readonly kind: "repo"; readonly rel: string }
  | { readonly kind: "vendor-root" }
  | { readonly kind: "vendor-scope"; readonly scope: string }
  | { readonly kind: "unknown" }

const packageNameOf = (segments: readonly string[]): { name: string; used: number } | null => {
  const head = segments[0]
  if (head === undefined || head === "") return null
  if (!head.startsWith("@")) return { name: head, used: 1 }
  const second = segments[1]
  if (second === undefined) return null
  return { name: `${head}/${second}`, used: 2 }
}

const lookThrough = (rel: string, packageDirs: ReadonlyMap<string, string>): Vantage => {
  const segments = rel === "" ? [] : rel.split("/")
  let at = -1
  for (let i = segments.length - 1; i >= 0; i--) {
    if (segments[i] === VENDOR_DIR) {
      at = i
      break
    }
  }
  if (at === -1) return { kind: "repo", rel }
  const rest = segments.slice(at + 1)
  if (rest.length === 0) return { kind: "vendor-root" }
  const named = packageNameOf(rest)
  if (named === null) return { kind: "unknown" }
  const head = rest[0] ?? ""
  if (head.startsWith("@") && rest.length === 1) return { kind: "vendor-scope", scope: head }
  const dir = packageDirs.get(named.name)
  if (dir === undefined) return { kind: "unknown" }
  const tail = rest.slice(named.used)
  return { kind: "repo", rel: tail.length === 0 ? dir : `${dir}/${tail.join("/")}` }
}

const scopeIsKnown = (scope: string, packageDirs: ReadonlyMap<string, string>): boolean => {
  for (const name of packageDirs.keys()) {
    if (name.startsWith(`${scope}/`)) return true
  }
  return false
}

const withoutTrailingSeparator = (path: string): string => {
  let at = path.length
  while (at > 1 && path[at - 1] === SEPARATOR) at -= 1
  return at === path.length ? path : path.slice(0, at)
}

export const createWorkspaceResolver = (
  ctx: BuildContext,
  repo: Repo,
  repoRoot: string,
  tsconfigRelPath: string,
  packageDirs: ReadonlyMap<string, string>
): Resolver | null => {
  const parsed = parseTsconfig(ctx, repo, repoRoot, tsconfigRelPath)
  if (parsed.options === null) return null
  const options = { ...parsed.options }
  if (options.moduleResolution === undefined) {
    options.moduleResolution = ts.ModuleResolutionKind.Bundler
  }

  const tree = repoTree(ctx, repo)
  const toRel = (absPath: string): string => {
    const at = withoutTrailingSeparator(absPath)
    if (at === repoRoot) return ""
    if (at.startsWith(`${repoRoot}/`)) return at.slice(repoRoot.length + 1)
    return at.startsWith("/") ? at.slice(1) : at
  }
  const toAbs = (relPath: string): string => (relPath === "" ? repoRoot : `${repoRoot}/${relPath}`)
  const seenThrough = (absPath: string): Vantage => lookThrough(toRel(absPath), packageDirs)

  const host: ts.ModuleResolutionHost = {
    fileExists: (path) => {
      const seen = seenThrough(path)
      return seen.kind === "repo" && tree.hasFile(seen.rel)
    },
    readFile: (path) => {
      const seen = seenThrough(path)
      return seen.kind === "repo" ? (readRepoFile(ctx, repo, seen.rel) ?? undefined) : undefined
    },
    directoryExists: (path) => {
      const seen = seenThrough(path)
      if (seen.kind === "repo") return tree.hasDir(seen.rel)
      if (seen.kind === "vendor-root") return true
      if (seen.kind === "vendor-scope") return scopeIsKnown(seen.scope, packageDirs)
      return false
    },
    getDirectories: () => [],
    realpath: (path) => {
      const seen = seenThrough(path)
      return seen.kind === "repo" ? toAbs(seen.rel) : path
    },
    getCurrentDirectory: () => repoRoot,
    useCaseSensitiveFileNames: () => true,
  }

  return {
    resolve: (specifier, fromRelPath) => {
      const result = ts.resolveModuleName(specifier, toAbs(fromRelPath), options, host)
      const target = result.resolvedModule?.resolvedFileName
      if (target === undefined) return null
      const seen = seenThrough(target)
      if (seen.kind !== "repo") return null
      if (seen.rel.split("/").includes(VENDOR_DIR)) return null
      return seen.rel
    },
  }
}
