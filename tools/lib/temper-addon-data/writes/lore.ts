import { generateLoreShalidor } from "@akasha/temper-addon-generators/lore-shalidor"
import type { AddonDataPages } from "../addon-data-pages.ts"
import { loreLibraryData } from "../code/lore-library-data-generated.ts"
import { TEMPER_COMPLETION_OUTPUT_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesLore(
  _p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "lore-shalidor-data.generated.ts",
      generateLoreShalidor(loreLibraryData)
    ),
  ]
}
