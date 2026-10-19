import { readFileSync } from "node:fs"
import {
  type MinedItemsUploaded,
  parseSideFile,
  type SideFile,
  serializeSideFile,
  withMinedItemsUploaded,
} from "akasha/temper/catalog/side-file/modules/catalog-side-file/catalog-side-file.module.code.ts"
import { writeFileAtomicWithRetry } from "akasha/temper/watcher/modules/watcher-retry/watcher-retry.module.code.ts"
import {
  type SideFileDisk,
  writeSideFileIfChanged,
} from "akasha/temper/watcher/modules/watcher-side-file/watcher-side-file.module.code.ts"

const ADDON_FOLDER: SideFileDisk = {
  read: (path) => readFileSync(path, "utf-8"),
  write: writeFileAtomicWithRetry,
}

function priorConfig(path: string, disk: SideFileDisk): SideFile | undefined {
  let content: string
  try {
    content = disk.read(path)
  } catch {
    return undefined
  }
  if (content.trim() === "") return undefined
  const parsed = parseSideFile(content)
  if (parsed === undefined) {
    throw new Error(`${path} holds a catalog config this cannot read, so it is left as it is`)
  }
  return parsed
}

function furthest(prior: SideFile | undefined, uploaded: MinedItemsUploaded): MinedItemsUploaded {
  const recorded = prior?.minedItemsUploaded
  if (recorded === undefined || recorded.apiVersion !== uploaded.apiVersion) return uploaded
  return recorded.throughItemId > uploaded.throughItemId ? recorded : uploaded
}

export async function runExportMinedUploaded(
  catalogConfigPath: string | undefined,
  uploaded: MinedItemsUploaded,
  disk: SideFileDisk = ADDON_FOLDER
): Promise<string | null> {
  if (catalogConfigPath === undefined) return null
  const prior = priorConfig(catalogConfigPath, disk)
  const next = withMinedItemsUploaded(prior, furthest(prior, uploaded))
  return writeSideFileIfChanged(catalogConfigPath, serializeSideFile(next), disk)
}
