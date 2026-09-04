import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"
import { addonManifestSchema } from "../addon-json/addon-json.module.code.ts"
import { addonManifestPathIn } from "../addon-manifest-file/addon-manifest-file.module.code.ts"

export const SIBLING_ADDONS_DIR = "siblings"

export const SIBLING_MANIFEST_SUFFIX = ".eso-addon.sibling-manifest.json"

const siblingNamesSchema = addonManifestSchema.pick({ siblingAddons: true }).partial().passthrough()

const siblingManifestSchema = z.record(z.string(), z.string())

const SAFE_FOLDER_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

export function assertSafeSiblingName(name: string): undefined {
  if (!SAFE_FOLDER_NAME.test(name) || name === "." || name === "..") {
    throw new Error(
      `siblingAddons: ${JSON.stringify(name)} is no usable addon folder name — a sibling name becomes a path that is removed and made again, so it has to be a bare folder name matching /^[A-Za-z0-9][A-Za-z0-9._-]*$/`
    )
  }
  return undefined
}

export function readSiblingAddonNames(addonDir: string): readonly string[] {
  const path = addonManifestPathIn(addonDir)
  if (path === null) return []
  let raw: unknown
  try {
    raw = JSON.parse(readFileSync(path, "utf-8"))
  } catch {
    return []
  }
  const parsed = siblingNamesSchema.safeParse(raw)
  if (!parsed.success) return []
  const names = parsed.data.siblingAddons ?? []
  for (const name of names) assertSafeSiblingName(name)
  return names
}

export function siblingManifestsIn(addonDir: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  let entries: readonly string[]
  try {
    entries = readdirSync(addonDir)
  } catch {
    return found
  }
  const named = entries.filter((one) => one.endsWith(SIBLING_MANIFEST_SUFFIX)).sort()
  const first = named[0]
  if (first === undefined) return found
  let raw: unknown
  try {
    raw = JSON.parse(readFileSync(join(addonDir, first), "utf-8"))
  } catch {
    return found
  }
  const parsed = siblingManifestSchema.safeParse(raw)
  if (!parsed.success) return found
  for (const [name, body] of Object.entries(parsed.data)) {
    assertSafeSiblingName(name)
    found.set(name, body)
  }
  return found
}

export function siblingSourceDir(addonDir: string, siblingName: string): string {
  assertSafeSiblingName(siblingName)
  return join(addonDir, SIBLING_ADDONS_DIR, siblingName)
}

export function siblingDistDir(addonsRoot: string, siblingName: string): string {
  assertSafeSiblingName(siblingName)
  return join(addonsRoot, "dist", siblingName)
}
