import { dirname, relative } from "node:path"
import { findFiles } from "./file-finder.ts"

export const ADDON_LIBRARIES_PREFIX = "temper/shared-addon-libraries-"

export const LCCC_REFERENCE_DIR = `${ADDON_LIBRARIES_PREFIX}lib-character-knowledge/src/lccc`

function isSharedModule(basename: string): boolean {
  if (basename === "index") return false
  return !basename.includes(".test") && !basename.includes(".spec")
}

export interface LcccVendorSites {
  readonly referenceDir: string
  readonly mirrorDirs: readonly string[]
  readonly basenames: readonly string[]
}

function siteOfFile(repoRoot: string, absPath: string): { dir: string; basename: string } {
  const rel = relative(repoRoot, absPath)
  return { dir: dirname(rel), basename: rel.slice(rel.lastIndexOf("/") + 1, -".ts".length) }
}

export function discoverLcccVendorSites(repoRoot: string): LcccVendorSites {
  const files = findFiles({
    cwd: repoRoot,
    patterns: [`${ADDON_LIBRARIES_PREFIX}*/src/lccc/*.ts`],
    absolute: true,
  })

  const dirs = new Set<string>()
  const basenames = new Set<string>()
  for (const absPath of files) {
    const { dir, basename } = siteOfFile(repoRoot, absPath)
    dirs.add(dir)
    if (isSharedModule(basename)) basenames.add(basename)
  }

  if (!dirs.has(LCCC_REFERENCE_DIR)) {
    throw new Error(
      `discoverLcccVendorSites: no vendored LCCC file found under the reference copy ${LCCC_REFERENCE_DIR}. Every comparison would be against nothing; repair the discovery rather than judging the mirrors without a reference.`
    )
  }
  const mirrorDirs = [...dirs].filter((dir) => dir !== LCCC_REFERENCE_DIR).sort()
  if (mirrorDirs.length === 0) {
    throw new Error(
      `discoverLcccVendorSites: only one vendored LCCC copy found among the ${ADDON_LIBRARIES_PREFIX}* workspaces, so there is nothing to compare it against. Repair the discovery rather than composing a gate over no mirrors.`
    )
  }

  return { referenceDir: LCCC_REFERENCE_DIR, mirrorDirs, basenames: [...basenames].sort() }
}
