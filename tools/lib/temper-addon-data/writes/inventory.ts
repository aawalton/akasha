import type { AddonDataPages } from "@akasha/temper-addon-data/addon-data-pages"
import { generateTemperItemCategoryTree } from "@akasha/temper-addon-generators/item-category-tree"
import { generateTemperInventoryCurrency } from "@akasha/temper-addon-generators/temper-inventory-currency"
import { generateTemperLocationType } from "@akasha/temper-addon-generators/temper-location-type"
import { TEMPER_INVENTORY_CORE_OUTPUT_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesInventory(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_INVENTORY_CORE_OUTPUT_DIR,
      "temper-inventory-currency.generated.ts",
      generateTemperInventoryCurrency(p.inventoryCurrencyPages.rows)
    ),
    w(
      TEMPER_INVENTORY_CORE_OUTPUT_DIR,
      "temper-location-type.generated.ts",
      generateTemperLocationType(p.locationTypePages.rows)
    ),
    w(
      TEMPER_INVENTORY_CORE_OUTPUT_DIR,
      "item-category-tree.generated.ts",
      generateTemperItemCategoryTree(p.itemCategoryTreePages.rows)
    ),
  ]
}
