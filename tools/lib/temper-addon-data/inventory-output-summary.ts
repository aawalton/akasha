import { setsAll } from "@akasha/temper-characters-equipment/sets-all"
import { TEMPER_INVENTORY_CORE_OUTPUT_DIR } from "./output-dirs.ts"

export function logInventoryOutputSummary(): undefined {
  console.log(
    `\n  set-category-mappings.generated.ts (${setsAll.list.filter((s) => s.esoSetId !== 0).length} sets) → inventory-core\n  Output: ${TEMPER_INVENTORY_CORE_OUTPUT_DIR}\n`
  )
}
