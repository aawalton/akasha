import { readdir, readFile, stat } from "node:fs/promises"
import { join } from "node:path"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import type { InstalledAddon } from "../addon-update-plan/addon-update-plan.module.code.ts"

const VERSION_LINE = /^##\s*Version:\s*(.+)$/im

const VERSION_SHAPE = z.tuple([z.string()])

const MANIFEST_EXTENSIONS = [".txt", ".addon"] as const

export function parseManifestVersion(manifest: string): string | undefined {
  if (!VERSION_LINE.test(manifest)) return undefined
  const [version] = requireMatchPositional(VERSION_LINE, VERSION_SHAPE, manifest)
  return version.trim()
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isDirectory()
  } catch {
    return false
  }
}

async function readManifestVersion(dirPath: string, dir: string): Promise<string | undefined> {
  for (const extension of MANIFEST_EXTENSIONS) {
    try {
      return parseManifestVersion(await readFile(join(dirPath, `${dir}${extension}`), "utf8"))
    } catch {}
  }
  return undefined
}

export async function readInstalledAddons(addonsPath: string): Promise<readonly InstalledAddon[]> {
  const names = await readdir(addonsPath)
  const addons: InstalledAddon[] = []
  for (const dir of names.sort()) {
    const dirPath = join(addonsPath, dir)
    if (!(await isDirectory(dirPath))) continue
    addons.push({ dir, version: await readManifestVersion(dirPath, dir) })
  }
  return addons
}
