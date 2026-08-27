import { loreLibraryData } from "../code/lore-library-data-generated.ts"
import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateLoreShalidor } from "../generators/lore-shalidor.ts"
import { generateTemperMotifStyle } from "../generators/temper-motif-style.ts"
import {
  TEMPER_ADDONS_CHARACTERS_GENERATED_DIR,
  TEMPER_COMPLETION_OUTPUT_DIR,
} from "../output-dirs.ts"

export function buildAddonDataWritesLore(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "lore-shalidor-data.generated.ts",
      generateLoreShalidor(loreLibraryData)
    ),
    w(
      TEMPER_ADDONS_CHARACTERS_GENERATED_DIR,
      "motif-style-lookup.generated.ts",
      generateTemperMotifStyle(p.motifStylePages.rows, p.scribingSourcePages.rows)
    ),
  ]
}
