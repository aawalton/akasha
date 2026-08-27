import { readdir, readFile, stat } from "node:fs/promises"
import { join } from "node:path"
import { requireMatchPositional } from "@shared/utils-narrow/require-match-positional"
import { z } from "zod"
import type { InstalledAddon } from "./plan"

const VERSION_RE = /^##\s*Version:\s*(.+)$/im
const VERSION_SCHEMA = z.tuple([z.string()])

export function parseManifestVersion(manifest: string): string | undefined {
  if (!VERSION_RE.test(manifest)) return undefined
  const [version] = requireMatchPositional(VERSION_RE, VERSION_SCHEMA, manifest)
  return version.trim()
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isDirectory()
  } catch {
    return false
  }
}

const MANIFEST_EXTENSIONS = [".txt", ".addon"] as const

async function readManifestVersion(dirPath: string, dir: string): Promise<string | undefined> {
  for (const ext of MANIFEST_EXTENSIONS) {
    try {
      const manifest = await readFile(join(dirPath, `${dir}${ext}`), "utf8")
      return parseManifestVersion(manifest)
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
