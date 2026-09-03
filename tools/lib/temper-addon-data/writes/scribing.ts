import type { AddonDataPages } from "@akasha/temper-addon-data/addon-data-pages"
import { generateScribingTotalScriptCount } from "@akasha/temper-addon-data/render-scribing-total-script-count"
import { WEB_ENGINE_INVENTORY_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesScribing(
  _p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      WEB_ENGINE_INVENTORY_DIR,
      "scribing-total-script-count.generated.ts",
      generateScribingTotalScriptCount()
    ),
  ]
}
