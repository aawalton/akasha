import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateTemperItemCategoryTree } from "../generators/item-category-tree.ts"
import { generateTemperInventoryCurrency } from "../generators/temper-inventory-currency.ts"
import { generateTemperLocationType } from "../generators/temper-location-type.ts"
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
