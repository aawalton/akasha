import { generateTemperSet } from "akasha/temper/addon-generators/temper-set/temper-set.module.code.ts"
import { generateTemperSetCategory } from "akasha/temper/addon-generators/temper-set-category/temper-set-category.module.code.ts"
import {
  TEMPER_EQUIPMENT_SETS_OUTPUT_DIR,
  TEMPER_INVENTORY_CORE_OUTPUT_DIR,
} from "../addon-data-output-dirs/addon-data-output-dirs.module.code.ts"
import type { AddonDataPages } from "../addon-data-pages/addon-data-pages.module.code.ts"
import { generateSetCategoryMappings } from "../render-set-category-mappings/render-set-category-mappings.module.code.ts"

export function buildAddonDataWritesSets(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_EQUIPMENT_SETS_OUTPUT_DIR,
      "temper-set.generated.ts",
      generateTemperSet(p.setPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_SETS_OUTPUT_DIR,
      "temper-set-category.generated.ts",
      generateTemperSetCategory(p.setCategoryPages.rows)
    ),
    w(
      TEMPER_INVENTORY_CORE_OUTPUT_DIR,
      "set-category-mappings.generated.ts",
      generateSetCategoryMappings()
    ),
  ]
}
