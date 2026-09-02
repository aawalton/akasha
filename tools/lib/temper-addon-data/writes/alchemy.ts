import type { AddonDataPages } from "../addon-data-pages.ts"
import { generatePotionRestoreMetrics } from "../generators/potion-restore-metrics.ts"
import { WEB_ENGINE_INVENTORY_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesAlchemy(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      WEB_ENGINE_INVENTORY_DIR,
      "potion-restore-metrics.generated.ts",
      generatePotionRestoreMetrics(p.minedRestorePotions)
    ),
  ]
}
