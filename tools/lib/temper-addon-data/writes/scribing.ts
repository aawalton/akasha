import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateScribingTotalScriptCount } from "../generators/scribing-total-script-count.ts"
import { generateTemperScribingSources } from "@akasha/temper-addon-generators/temper-scribing-sources"
import { TEMPER_ADDONS_CHARACTERS_GENERATED_DIR, WEB_ENGINE_INVENTORY_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesScribing(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_ADDONS_CHARACTERS_GENERATED_DIR,
      "scribing-sources.generated.ts",
      generateTemperScribingSources(p.scribingSourcePages.rows, p.zonePages.rows)
    ),
    w(
      WEB_ENGINE_INVENTORY_DIR,
      "scribing-total-script-count.generated.ts",
      generateScribingTotalScriptCount()
    ),
  ]
}
