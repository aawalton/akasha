import { readFileSync } from "node:fs"
import type { InventoryConfigFileInputs } from "../watcher-config-file/watcher-config-file.module.code.ts"
import { serializeInventoryConfigFile } from "../watcher-config-file/watcher-config-file.module.code.ts"
import { writeFileAtomicWithRetry } from "../watcher-retry/watcher-retry.module.code.ts"
import { hashContent } from "../watcher-self-write-guard/watcher-self-write-guard.module.code.ts"

export type SideFileValues = Partial<InventoryConfigFileInputs>

export const REQUIRED_SIDE_FILE_VALUES = [
  "logging",
  "safety",
  "backpack",
  "currencyRates",
  "crownReplacementCosts",
] as const satisfies readonly (keyof InventoryConfigFileInputs)[]

export function absentSideFileValues(values: SideFileValues): readonly string[] {
  return REQUIRED_SIDE_FILE_VALUES.filter((key) => values[key] === undefined)
}

export function buildSideFileContent(values: SideFileValues): string {
  const absent = absentSideFileValues(values)
  if (absent.length > 0) {
    throw new Error(`the inventory side file was told nothing for ${absent.join(", ")}`)
  }
  return serializeInventoryConfigFile(values as InventoryConfigFileInputs)
}

export interface SideFileDisk {
  readonly read: (path: string) => string
  readonly write: (path: string, content: string) => undefined
}

const ADDON_FOLDER: SideFileDisk = {
  read: (path) => readFileSync(path, "utf-8"),
  write: writeFileAtomicWithRetry,
}

export function writeSideFileIfChanged(
  path: string,
  desired: string,
  disk: SideFileDisk = ADDON_FOLDER
): string {
  let current: string | null = null
  try {
    current = disk.read(path)
  } catch {}
  if (current !== desired) disk.write(path, desired)
  return hashContent(desired)
}
