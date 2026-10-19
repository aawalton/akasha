import {
  type LandedCatalog,
  serializeSideFile,
  withLandedCatalogs,
} from "akasha/temper/catalog/side-file/modules/catalog-side-file/catalog-side-file.module.code.ts"
import {
  ADDON_FOLDER,
  priorCatalogConfig,
} from "akasha/temper/watcher/modules/watcher-export-mined-uploaded/watcher-export-mined-uploaded.module.code.ts"
import {
  type SideFileDisk,
  writeSideFileIfChanged,
} from "akasha/temper/watcher/modules/watcher-side-file/watcher-side-file.module.code.ts"

export async function runExportLandedCatalogs(
  catalogLandedPath: string | undefined,
  landed: Readonly<Record<string, LandedCatalog>>,
  disk: SideFileDisk = ADDON_FOLDER
): Promise<string | null> {
  if (catalogLandedPath === undefined) return null
  const prior = priorCatalogConfig(catalogLandedPath, disk)
  const next = withLandedCatalogs(prior, landed)
  return writeSideFileIfChanged(catalogLandedPath, serializeSideFile(next), disk)
}
