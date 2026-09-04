import { existsSync, readdirSync, readFileSync } from "node:fs"
import { basename, dirname, join, resolve } from "node:path"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"
import { addonManifestSchema } from "../addon-json/addon-json.module.code.ts"
import { addonManifestPathIn } from "../addon-manifest-file/addon-manifest-file.module.code.ts"
import {
  computeWorkspaceClosure,
  loadWorkspaceCatalog,
  repoRelOf,
} from "../workspace-closure/workspace-closure.module.code.ts"

const DEFAULT_REPO_ROOT = resolve(import.meta.dir, "..", "..", "..", "..")

export const ADDONS_REL_ROOT = "temper/addons"

export type AddonInfo = {
  readonly dir: string
  readonly canonicalName: string
  readonly repoRelDir: string
  readonly workspaceClosure: readonly string[]
}

export type ResolvedAddon = {
  readonly dir: string
  readonly canonicalName: string
}

export type ResolveOpts = {
  readonly repoRoot?: string
}

const addonNameSchema = addonManifestSchema.pick({ name: true }).partial().passthrough()

function readAddonJson(dir: string): { name?: string } | null {
  const path = addonManifestPathIn(dir)
  if (path === null) return null
  try {
    const raw: unknown = JSON.parse(readFileSync(path, "utf-8"))
    const parsed = addonNameSchema.safeParse(raw)
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export function listExternalAddonRelDirs(repoRoot: string): readonly string[] {
  const found: string[] = []
  for (const rel of listWorkspaceDirs(repoRoot)) {
    if (rel === ADDONS_REL_ROOT || rel.startsWith(`${ADDONS_REL_ROOT}/`)) continue
    if (readAddonJson(join(repoRoot, rel)) === null) continue
    found.push(rel)
  }
  return found.sort()
}

type Discovered = Omit<AddonInfo, "workspaceClosure">

function addonsUnderFlatRoot(repoRoot: string): readonly Discovered[] {
  const addonsRoot = join(repoRoot, ADDONS_REL_ROOT)
  if (!existsSync(addonsRoot)) return []
  const found: Discovered[] = []
  for (const entry of readdirSync(addonsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const dir = join(addonsRoot, entry.name)
    const said = readAddonJson(dir)
    if (said === null) continue
    found.push({
      dir,
      canonicalName: said.name ?? entry.name,
      repoRelDir: repoRelOf(repoRoot, dir),
    })
  }
  return found
}

function addonsElsewhere(repoRoot: string): readonly Discovered[] {
  const found: Discovered[] = []
  for (const rel of listExternalAddonRelDirs(repoRoot)) {
    const dir = join(repoRoot, rel)
    const said = readAddonJson(dir)
    if (said === null) continue
    found.push({
      dir,
      canonicalName: said.name ?? basename(dirname(dir)),
      repoRelDir: repoRelOf(repoRoot, dir),
    })
  }
  return found
}

export function listAllAddons(opts?: ResolveOpts): readonly AddonInfo[] {
  const repoRoot = opts?.repoRoot ?? DEFAULT_REPO_ROOT
  const catalog = loadWorkspaceCatalog(repoRoot)
  const discovered = [...addonsUnderFlatRoot(repoRoot), ...addonsElsewhere(repoRoot)]
  return discovered.map((one) => ({
    ...one,
    workspaceClosure: computeWorkspaceClosure(one.repoRelDir, repoRoot, catalog),
  }))
}

export function resolveAddon(name: string, opts?: ResolveOpts): ResolvedAddon {
  const repoRoot = opts?.repoRoot ?? DEFAULT_REPO_ROOT
  const flatRootAbs = join(repoRoot, ADDONS_REL_ROOT)
  for (const entry of listAllAddons({ repoRoot })) {
    const leafDir = basename(entry.dir)
    const parentDir = basename(dirname(entry.dir))
    const elsewhere = dirname(entry.dir) !== flatRootAbs
    const matched = elsewhere
      ? entry.canonicalName === name || leafDir === name || parentDir === name
      : entry.canonicalName === name || leafDir === name
    if (matched) return { dir: entry.dir, canonicalName: entry.canonicalName }
  }
  return { dir: join(repoRoot, ADDONS_REL_ROOT, name), canonicalName: name }
}
