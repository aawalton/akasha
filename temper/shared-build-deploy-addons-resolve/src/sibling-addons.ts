import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { addonManifestSchema } from "./manifest"

export const SIBLING_ADDONS_DIR = "siblings"

const siblingNamesSchema = addonManifestSchema.pick({ siblingAddons: true }).partial().passthrough()

const SAFE_FOLDER_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

export function assertSafeSiblingName(name: string): void {
  if (!SAFE_FOLDER_NAME.test(name) || name === "." || name === "..") {
    throw new Error(
      `siblingAddons: ${JSON.stringify(name)} is not a usable addon folder name — ` +
        "a sibling name becomes a path that is removed and recreated, so it must be a bare " +
        "folder name matching /^[A-Za-z0-9][A-Za-z0-9._-]*$/"
    )
  }
}

export function readSiblingAddonNames(addonDir: string): readonly string[] {
  const path = join(addonDir, "addon.json")
  if (!existsSync(path)) return []
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

export function siblingSourceDir(addonDir: string, siblingName: string): string {
  assertSafeSiblingName(siblingName)
  return join(addonDir, SIBLING_ADDONS_DIR, siblingName)
}

export function siblingDistDir(addonsRoot: string, siblingName: string): string {
  assertSafeSiblingName(siblingName)
  return join(addonsRoot, "dist", siblingName)
}
