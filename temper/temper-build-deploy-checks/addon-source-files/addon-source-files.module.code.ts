import { readdirSync, statSync } from "node:fs"
import { join, sep } from "node:path"

const OTHER_PACKAGES = "node_modules"

const WRITTEN_BY_A_BUILD = "dist"

const WRITTEN_BY_A_GENERATOR = "generated"

const LAYOUT_OUTSIDE_AKASHA = "src"

function relativePathsUnder(dir: string): readonly string[] {
  const found: string[] = []
  const visit = (at: string, prefix: string): undefined => {
    let entries: readonly string[]
    try {
      entries = readdirSync(at)
    } catch {
      return
    }
    for (const entry of entries) {
      if (entry === OTHER_PACKAGES) continue
      const path = join(at, entry)
      const rel = prefix === "" ? entry : `${prefix}${sep}${entry}`
      let isDir = false
      try {
        isDir = statSync(path).isDirectory()
      } catch {
        continue
      }
      if (isDir) visit(path, rel)
      else found.push(rel)
    }
  }
  visit(dir, "")
  return found
}

export function isMachineWritten(relPath: string): boolean {
  return /\.generated\.tsx?$/.test(relPath)
}

export function isAddonOwnTypeScript(relPath: string): boolean {
  if (!relPath.endsWith(".ts") && !relPath.endsWith(".tsx")) return false
  if (relPath.endsWith(".d.ts")) return false
  if (/\.test\.tsx?$/.test(relPath)) return false
  if (/\.module\.code\.tsx?$/.test(relPath)) return true
  if (isMachineWritten(relPath)) return true
  return relPath.split(sep).includes(LAYOUT_OUTSIDE_AKASHA)
}

export type AddonSourceFiles = {
  readonly code: readonly string[]
  readonly machineWritten: readonly string[]
}

export function addonSourceFiles(addonDir: string): AddonSourceFiles {
  const code: string[] = []
  const machineWritten: string[] = []
  for (const rel of relativePathsUnder(addonDir)) {
    if (rel.split(sep).includes(WRITTEN_BY_A_BUILD)) continue
    if (!isAddonOwnTypeScript(rel)) continue
    if (isMachineWritten(rel)) machineWritten.push(join(addonDir, rel))
    else code.push(join(addonDir, rel))
  }
  return { code, machineWritten }
}

export type AddonMarkupFiles = {
  readonly own: readonly string[]
  readonly copies: readonly string[]
}

export function addonMarkupFiles(addonDir: string): AddonMarkupFiles {
  const own: string[] = []
  const copies: string[] = []
  for (const rel of relativePathsUnder(addonDir)) {
    if (!rel.endsWith(".xml")) continue
    const parts = rel.split(sep)
    const copied = parts.includes(WRITTEN_BY_A_BUILD) || parts.includes(WRITTEN_BY_A_GENERATOR)
    if (copied) copies.push(join(addonDir, rel))
    else own.push(join(addonDir, rel))
  }
  return { own, copies }
}
