import { z } from "zod"
import type { Repo } from "../../../../../../page/document/types.ts"
import { readRepoFile } from "../../../repos.ts"
import type { BuildContext } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { CURATION_FILE, curatedWorkspaces } from "../../lib/curation.ts"
import { repoFiles } from "../../lib/repo-files.ts"
import { workspaceDirsAt } from "../../lib/workspace-dirs.ts"
import { ADAPTER_PATTERNS } from "./adapters.ts"
import { scanFiles } from "./discover-scan.ts"
import { parseTsconfig } from "./discover-tsconfig.ts"
import { isUnder, walkTsFiles } from "./discover-workspace-walk.ts"
import type { TsFileDiscoveredVia } from "./types.ts"

const WORKSPACE_PACKAGE_JSON_SCHEMA = z
  .object({
    name: z.string().optional(),
  })
  .passthrough()

export type WorkspaceGlobs = {
  readonly project: readonly string[]
  readonly entry: readonly string[]
  readonly ignore: readonly string[]
}

export const DEFAULT_WORKSPACE_GLOBS: WorkspaceGlobs = {
  entry: ["src/**/*.{ts,tsx}"],
  project: ["**/*.{ts,tsx}"],
  ignore: [],
}

export type DiscoveredFile = {
  readonly repo: Repo
  readonly relPath: string
  readonly packageName: string
  readonly workspaceRoot: string
  readonly discoveredVia: TsFileDiscoveredVia
}

export type Workspace = {
  readonly root: string
  readonly packageName: string
}

export const codeRepoRoot = (ctx: BuildContext): string => {
  const root = ctx.repoRoots.get(CODE_REPO)
  if (root === undefined) {
    throw new Error(`graph: the snapshot holds no root for the ${CODE_REPO} repository`)
  }
  return root
}

export const readWorkspaces = (ctx: BuildContext, repo: Repo): readonly Workspace[] => {
  const out: Workspace[] = []
  for (const wsRoot of workspaceDirsAt(ctx, repo)) {
    const raw = readRepoFile(ctx, repo, `${wsRoot}/package.json`)
    if (raw === null) continue
    let name: string | undefined
    try {
      name = WORKSPACE_PACKAGE_JSON_SCHEMA.parse(JSON.parse(raw)).name
    } catch {
      continue
    }
    if (name === undefined) continue
    out.push({ root: wsRoot, packageName: name })
  }
  return out
}

const discoverPlainFiles = (
  paths: readonly string[],
  repo: Repo
): readonly DiscoveredFile[] => {
  const out: DiscoveredFile[] = []
  for (const relPath of paths) {
    if (!relPath.endsWith(`.ts`) && !relPath.endsWith(`.tsx`)) continue
    if (relPath.split(`/`).includes(`node_modules`)) continue
    out.push({
      repo,
      relPath,
      packageName: repo,
      workspaceRoot: ``,
      discoveredVia: `workspace-walk`,
    })
  }
  return out
}

const CURATED_GLOBS_SCHEMA = z
  .object({
    entry: z.array(z.string()).optional(),
    project: z.array(z.string()).optional(),
    ignore: z.array(z.string()).optional(),
  })
  .passthrough()

const curatedGlobs = (ctx: BuildContext, repo: Repo): ReadonlyMap<string, WorkspaceGlobs> => {
  if (repo !== CODE_REPO) return new Map()
  const merged = curatedWorkspaces(ctx)
  if (merged === null) return new Map()
  const read = z.record(z.string(), CURATED_GLOBS_SCHEMA).safeParse(merged)
  if (!read.success) {
    throw new Error(`graph: ${repo}:${CURATION_FILE} does not say what globs its workspaces take`)
  }
  const out = new Map<string, WorkspaceGlobs>()
  for (const [root, globs] of Object.entries(read.data)) {
    out.set(root, {
      entry: globs.entry ?? DEFAULT_WORKSPACE_GLOBS.entry,
      project: globs.project ?? DEFAULT_WORKSPACE_GLOBS.project,
      ignore: globs.ignore ?? [],
    })
  }
  return out
}

export const workspaceGlobsFor = (
  ctx: BuildContext,
  repo: Repo,
  workspaces: readonly Workspace[]
): ReadonlyMap<string, WorkspaceGlobs> => {
  const curated = curatedGlobs(ctx, repo)
  const out = new Map<string, WorkspaceGlobs>()
  for (const ws of workspaces) out.set(ws.root, curated.get(ws.root) ?? DEFAULT_WORKSPACE_GLOBS)
  return out
}

export const workspaceTsconfigPath = (workspaceRoot: string): string =>
  workspaceRoot === "" ? "tsconfig.json" : `${workspaceRoot}/tsconfig.json`

const relativeToRoot = (repoRoot: string, absPath: string): string | null => {
  if (absPath === repoRoot) return ""
  if (!absPath.startsWith(`${repoRoot}/`)) return null
  return absPath.slice(repoRoot.length + 1)
}

const collectFromTsconfig = (
  repoRoot: string,
  fileNames: readonly string[],
  rootRel: string,
  via: TsFileDiscoveredVia,
  seen: Map<string, TsFileDiscoveredVia>
): undefined => {
  for (const abs of fileNames) {
    const relPath = relativeToRoot(repoRoot, abs)
    if (relPath === null) continue
    if (!isUnder(relPath, rootRel)) continue
    if (relPath.split("/").includes("node_modules")) continue
    if (!seen.has(relPath)) seen.set(relPath, via)
  }
}

const collectMatches = (
  matches: readonly string[],
  via: TsFileDiscoveredVia,
  seen: Map<string, TsFileDiscoveredVia>
): undefined => {
  for (const relPath of matches) {
    if (!seen.has(relPath)) seen.set(relPath, via)
  }
}

const discoverWorkspaceFiles = (
  ctx: BuildContext,
  repo: Repo,
  repoRoot: string,
  ws: Workspace,
  paths: readonly string[],
  tracked: ReadonlySet<string>,
  globs: WorkspaceGlobs | undefined
): readonly DiscoveredFile[] => {
  const { fileNames, includeOnlyFileNames } = parseTsconfig(
    ctx,
    repo,
    repoRoot,
    workspaceTsconfigPath(ws.root)
  )

  const seen = new Map<string, TsFileDiscoveredVia>()
  collectFromTsconfig(repoRoot, fileNames, ws.root, "tsconfig", seen)
  collectMatches(scanFiles(paths, ws.root, "", ADAPTER_PATTERNS), "adapter", seen)
  collectMatches(scanFiles(paths, ws.root, ws.root, globs?.entry ?? []), "entry-glob", seen)
  collectFromTsconfig(repoRoot, includeOnlyFileNames, ws.root, "tsconfig-include-only", seen)
  collectMatches(walkTsFiles(paths, ws.root), "workspace-walk", seen)

  const out: DiscoveredFile[] = []
  for (const [relPath, via] of seen) {
    if (!tracked.has(relPath)) continue
    out.push({
      repo,
      relPath,
      packageName: ws.packageName,
      workspaceRoot: ws.root,
      discoveredVia: via,
    })
  }
  return out
}

const outsideEveryWorkspace = (
  paths: readonly string[],
  workspaces: readonly Workspace[]
): readonly string[] =>
  paths.filter((relPath) => !workspaces.some((ws) => isUnder(relPath, ws.root)))

const discoverTsFilesIn = (ctx: BuildContext, repo: Repo): readonly DiscoveredFile[] => {
  const repoRoot = ctx.repoRoots.get(repo)
  if (repoRoot === undefined) return []
  const workspaces = readWorkspaces(ctx, repo)
  const paths = repoFiles(ctx, repo, { includeFixtures: true, includeGenerated: true })
  const globsByRoot = workspaceGlobsFor(ctx, repo, workspaces)
  const tracked = new Set(paths)

  const collected: DiscoveredFile[] = []
  for (const ws of workspaces) {
    collected.push(
      ...discoverWorkspaceFiles(ctx, repo, repoRoot, ws, paths, tracked, globsByRoot.get(ws.root))
    )
  }
  collected.push(...discoverPlainFiles(outsideEveryWorkspace(paths, workspaces), repo))
  return collected
}

export const discoverTsFiles = (ctx: BuildContext): readonly DiscoveredFile[] => {
  const byFile = new Map<string, DiscoveredFile>()
  for (const repo of ctx.repoRoots.keys()) {
    for (const f of discoverTsFilesIn(ctx, repo)) {
      const at = `${f.repo}:${f.relPath}`
      const standing = byFile.get(at)
      if (standing === undefined || f.workspaceRoot.length > standing.workspaceRoot.length) {
        byFile.set(at, f)
      }
    }
  }
  return [...byFile.values()]
}
