import { setsAll } from "akasha/temper/temper-characters-equipment/sets-all/sets-all.module.code.ts"
import { TEMPER_INVENTORY_CORE_OUTPUT_DIR } from "../addon-data-output-dirs/addon-data-output-dirs.module.code.ts"

export function logInventoryOutputSummary(): undefined {
  console.log(
    `\n  set-category-mappings.generated.ts (${setsAll.list.filter((s) => s.esoSetId !== 0).length} sets) → inventory-core\n  Output: ${TEMPER_INVENTORY_CORE_OUTPUT_DIR}\n`
  )
}
