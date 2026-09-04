import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { matchedText } from "../errors-addon-traceback/errors-addon-traceback.module.code.ts"

interface BuildIdHolder {
  TemperBuildIds?: Record<string, string>
}

function asBuildIdHolder(value: unknown): BuildIdHolder {
  return value as BuildIdHolder
}

function buildIdRegistry(): Record<string, string> | undefined {
  return asBuildIdHolder(globalThis).TemperBuildIds
}

function addonFrameFolders(traceback: string): string[] {
  const folders: string[] = []
  for (const [folder] of string.gmatch(traceback, "user:/AddOns/([^/]+)/")) {
    const parsed = matchedText(folder)
    if (parsed !== null) {
      folders[folders.length] = parsed
    }
  }
  return folders
}

export function attributedAddonFolder(traceback: string): string | undefined {
  const folders = addonFrameFolders(traceback)
  if (folders.length === 0) {
    return undefined
  }
  const registry = buildIdRegistry()
  if (registry !== undefined) {
    for (const folder of folders) {
      if (typeof registry[folder] === "string") {
        return folder
      }
    }
  }
  return folders[0]
}

export function attributedBuildId(folder: string | undefined): string | undefined {
  if (folder === undefined) {
    return undefined
  }
  const registry = buildIdRegistry()
  if (registry === undefined) {
    return undefined
  }
  const sha = registry[folder]
  return typeof sha === "string" ? sha : undefined
}

export function snapshotBuildIds(): Record<string, string> | undefined {
  const registry = buildIdRegistry()
  if (registry === undefined) {
    return undefined
  }
  const snapshot: Record<string, string> = {}
  for (const folder in registry) {
    const sha = registry[folder]
    if (typeof sha === "string") {
      snapshot[folder] = sha
    }
  }
  return snapshot
}
