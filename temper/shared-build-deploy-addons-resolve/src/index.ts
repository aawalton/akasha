import { existsSync, readdirSync, readFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { listWorkspaceDirs } from "@shared/workspace-paths"
import { computeWorkspaceClosure, loadWorkspaceCatalog, repoRelOf } from "./closure"
import { addonManifestSchema } from "./manifest"

const DEFAULT_REPO_ROOT = join(import.meta.dir, "..", "..", "..")

export const ADDONS_REL_ROOT = "temper/addons"

export interface AddonInfo {
  dir: string
  canonicalName: string
  repoRelDir: string
  workspaceClosure: readonly string[]
}

export interface ResolvedAddon {
  dir: string
  canonicalName: string
}

export interface ResolveOpts {
  repoRoot?: string
}

const addonNameSchema = addonManifestSchema.pick({ name: true }).partial().passthrough()

function readAddonJson(dir: string): { name?: string } | null {
  const addonJsonPath = join(dir, "addon.json")
  if (!existsSync(addonJsonPath)) return null
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

export function listAllAddons(opts?: ResolveOpts): readonly AddonInfo[] {
  const repoRoot = opts?.repoRoot ?? DEFAULT_REPO_ROOT
  const addonsRoot = join(repoRoot, ADDONS_REL_ROOT)
  const catalog = loadWorkspaceCatalog(repoRoot)

  type DiscoveredAddon = Omit<AddonInfo, "workspaceClosure">
  const discovered: DiscoveredAddon[] = []

  if (existsSync(addonsRoot)) {
    const flatEntries = readdirSync(addonsRoot, { withFileTypes: true })
    for (const entry of flatEntries) {
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

export function resolveAddon(name: string, opts?: ResolveOpts): ResolvedAddon {
  const repoRoot = opts?.repoRoot ?? DEFAULT_REPO_ROOT
  const all = listAllAddons({ repoRoot })
  const flatRootAbs = join(repoRoot, ADDONS_REL_ROOT)
  for (const entry of all) {
    const leafDir = basename(entry.dir)
    const parentDir = basename(dirname(entry.dir))
    const isExternal = dirname(entry.dir) !== flatRootAbs
    const matches = isExternal
      ? entry.canonicalName === name || leafDir === name || parentDir === name
      : entry.canonicalName === name || leafDir === name
    if (matches) {
      return { dir: entry.dir, canonicalName: entry.canonicalName }
    }
  }

  return { dir: join(repoRoot, ADDONS_REL_ROOT, name), canonicalName: name }
}
