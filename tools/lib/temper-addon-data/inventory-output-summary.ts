import { setsAll } from "./code/sets-all-data.ts"
import { armorTraits } from "./code/armor-traits-data.ts"
import { jewelryTraits } from "./code/jewelry-traits-data.ts"
import { weaponTraits } from "./code/weapon-traits-data.ts"
import { TEMPER_INVENTORY_CORE_OUTPUT_DIR, TEMPER_INVENTORY_OUTPUT_DIR } from "./output-dirs.ts"

export function logInventoryOutputSummary(): undefined {
  console.log(
    `\n  set-category-mappings.generated.ts (${setsAll.list.filter((s) => s.esoSetId !== 0).length} sets) → inventory-core\n  trait-mappings.generated.ts (${armorTraits.ids.length}a/${weaponTraits.ids.length}w/${jewelryTraits.ids.length}j traits)\n  rule-types.generated.ts\n  Output: ${TEMPER_INVENTORY_OUTPUT_DIR}, ${TEMPER_INVENTORY_CORE_OUTPUT_DIR}\n`
  )
}
