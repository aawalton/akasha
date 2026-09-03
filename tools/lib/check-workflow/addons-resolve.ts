import { existsSync, readdirSync, readFileSync } from "node:fs"
import { basename, dirname, join, relative, sep } from "node:path"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"
import { z } from "zod"

export const ADDONS_REL_ROOT = "temper/addons"

export const BUNDLE_REUSE_DIST_ENV = "TEMPER_ADDON_BUNDLE_REUSE_DIST"

const WORKSPACE_PROTOCOL_PREFIX = "workspace:"

export interface AddonInfo {
  dir: string
  canonicalName: string
  repoRelDir: string
  workspaceClosure: readonly string[]
}

export interface DeployableInfo {
  readonly name: string
  readonly workspaceClosure: readonly string[]
}

export function repoRelOf(repoRoot: string, dir: string): string {
  return relative(repoRoot, dir).split(sep).join("/")
}

const packageJsonSchema = z
  .object({
    name: z.string().optional(),
    dependencies: z.record(z.string(), z.string()).optional(),
    devDependencies: z.record(z.string(), z.string()).optional(),
    peerDependencies: z.record(z.string(), z.string()).optional(),
  })
  .passthrough()

type ParsedManifest = z.infer<typeof packageJsonSchema>

function readManifest(dir: string): ParsedManifest | null {
  const path = join(dir, "package.json")
  if (!existsSync(path)) return null
  try {
    const raw: unknown = JSON.parse(readFileSync(path, "utf-8"))
    const parsed = packageJsonSchema.safeParse(raw)
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export function loadWorkspaceCatalog(repoRoot: string): ReadonlyMap<string, string> {
  let dirs: readonly string[]
  try {
    dirs = listWorkspaceDirs(repoRoot)
  } catch {
    return new Map()
  }
  const catalog = new Map<string, string>()
  for (const rel of dirs) {
    const dir = join(repoRoot, rel)
    const manifest = readManifest(dir)
    if (manifest?.name === undefined) continue
    catalog.set(manifest.name, repoRelOf(repoRoot, dir))
  }
  return catalog
}

export function computeWorkspaceClosure(
  seedRepoRelDir: string,
  repoRoot: string,
  catalog: ReadonlyMap<string, string>
): readonly string[] {
  const visited = new Set<string>()
  const queue: string[] = [seedRepoRelDir]
  while (queue.length > 0) {
    const dir = queue.pop()
    if (dir === undefined) break
    if (visited.has(dir)) continue
    visited.add(dir)
    const manifest = readManifest(join(repoRoot, dir))
    if (manifest === null) continue
    const allDeps = {
      ...(manifest.dependencies ?? {}),
      ...(manifest.devDependencies ?? {}),
      ...(manifest.peerDependencies ?? {}),
    }
    for (const [name, version] of Object.entries(allDeps)) {
      if (!version.startsWith(WORKSPACE_PROTOCOL_PREFIX)) continue
      const depDir = catalog.get(name)
      if (depDir === undefined) continue
      if (!visited.has(depDir)) queue.push(depDir)
    }
  }
  return [...visited].sort()
}

const addonNameSchema = z.object({ name: z.string().optional() }).passthrough()

const PAGE_MANIFEST_SUFFIX = ".eso-addon.addon-manifest.json"

function addonManifestPathIn(dir: string): string | null {
  const gamePath = join(dir, "addon.json")
  if (existsSync(gamePath)) return gamePath
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return null
  }
  const named = entries.filter((one) => one.endsWith(PAGE_MANIFEST_SUFFIX)).sort()
  const first = named[0]
  return first === undefined ? null : join(dir, first)
}

function readAddonJson(dir: string): { name?: string } | null {
  const addonJsonPath = addonManifestPathIn(dir)
  if (addonJsonPath === null) return null
  try {
    const raw: unknown = JSON.parse(readFileSync(addonJsonPath, "utf-8"))
    const parsed = addonNameSchema.safeParse(raw)
    if (!parsed.success) return null
    return parsed.data
  } catch {
    return null
  }
}

export function listExternalAddonRelDirs(repoRoot: string): readonly string[] {
  const flatRootRel = ADDONS_REL_ROOT
  const result: string[] = []
  for (const rel of listWorkspaceDirs(repoRoot)) {
    if (rel === flatRootRel || rel.startsWith(`${flatRootRel}/`)) continue
    if (readAddonJson(join(repoRoot, rel)) === null) continue
    result.push(rel)
  }
  return result.sort()
}

export function listAllAddons(repoRoot: string): readonly AddonInfo[] {
  const addonsRoot = join(repoRoot, ADDONS_REL_ROOT)
  const catalog = loadWorkspaceCatalog(repoRoot)

  type DiscoveredAddon = Omit<AddonInfo, "workspaceClosure">
  const discovered: DiscoveredAddon[] = []

  if (existsSync(addonsRoot)) {
    for (const entry of readdirSync(addonsRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const dir = join(addonsRoot, entry.name)
      const config = readAddonJson(dir)
      if (config === null) continue
      discovered.push({
        dir,
        canonicalName: config.name ?? entry.name,
        repoRelDir: repoRelOf(repoRoot, dir),
      })
    }
  }

  for (const relDir of listExternalAddonRelDirs(repoRoot)) {
    const dir = join(repoRoot, relDir)
    const config = readAddonJson(dir)
    if (config === null) continue
    discovered.push({
      dir,
      canonicalName: config.name ?? basename(dirname(dir)),
      repoRelDir: repoRelOf(repoRoot, dir),
    })
  }

  return discovered.map((info) => ({
    ...info,
    workspaceClosure: computeWorkspaceClosure(info.repoRelDir, repoRoot, catalog),
  }))
}
