import { statSync } from "node:fs"
import { esoLiveDirCandidates, type PathOpts } from "../eso-paths/eso-paths.module.code.ts"

export interface ResolveOpts extends PathOpts {
  readonly exists?: (path: string) => boolean
}

function isDirectory(path: string): boolean {
  return statSync(path, { throwIfNoEntry: false })?.isDirectory() ?? false
}

export function esoLiveDir(opts?: ResolveOpts): string {
  const candidates = esoLiveDirCandidates(opts)
  if (candidates.length === 1) return candidates[0]

  const exists = opts?.exists ?? isDirectory
  for (const candidate of candidates) {
    if (exists(candidate)) return candidate
  }

  throw new Error(
    [
      "Could not find the Elder Scrolls Online 'live' directory. Probed, in order:",
      ...candidates.map((candidate) => `  - ${candidate}`),
      "None of them exists. Windows redirects Documents into OneDrive on many installs,",
      "so both layouts are probed. Set ESO_LIVE_DIR to the live directory if ESO keeps",
      "its files somewhere else.",
    ].join("\n")
  )
}

export function savedVarsDir(opts?: ResolveOpts): string {
  return `${esoLiveDir(opts)}/SavedVariables`
}

export function savedVarsFile(name: string, opts?: ResolveOpts): string {
  return `${savedVarsDir(opts)}/${name}`
}

export function addonsDir(opts?: ResolveOpts): string {
  return `${esoLiveDir(opts)}/AddOns`
}

export function addonsFile(relativePath: string, opts?: ResolveOpts): string {
  return `${addonsDir(opts)}/${relativePath}`
}
