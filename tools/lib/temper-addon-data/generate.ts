import { fetchAddonDataPages } from "@akasha/temper-addon-data/addon-data-pages"
import { logInventoryOutputSummary } from "./inventory-output-summary.ts"
import { buildMappingGeneratorWrites } from "./mapping-generators.ts"
import { buildMappingTotals } from "./mapping-totals.ts"
import { ensureAllOutputDirs } from "./output-dirs.ts"
import { buildPageRowTotals, logMappingTotals, logPageRowTotals } from "./page-row-totals.ts"
import { validateEquipmentMappings } from "./validate-equipment.ts"
import { buildAddonDataWrites } from "./writes.ts"

export class EquipmentMappingsStale extends Error {}

export async function generateAddonData(): Promise<void> {
  console.log("Generating addon data files...\n")
  const pages = await fetchAddonDataPages()
  ensureAllOutputDirs()
  const writes: Promise<number>[] = [
    ...buildAddonDataWrites(pages),
    ...buildMappingGeneratorWrites(),
  ]
  await Promise.all(writes)
  logMappingTotals(buildMappingTotals())
  logPageRowTotals(buildPageRowTotals(pages))
  logInventoryOutputSummary()
  console.log("Validating equipment-mappings.ts...")
  if (!validateEquipmentMappings()) {
    throw new EquipmentMappingsStale(
      "equipment-mappings.ts does not match the temper data these generators just emitted"
    )
  }
  console.log("  All equipment mappings match temper data.\n\nDone.")
}
