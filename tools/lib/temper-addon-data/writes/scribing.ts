import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateScribingTotalScriptCount } from "../generators/scribing-total-script-count.ts"
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
