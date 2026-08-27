import type { AddonDataPages } from "../addon-data-pages.ts"
import { generatePotionRestoreMetrics } from "../generators/potion-restore-metrics.ts"
import { generateTemperPoisonEffects } from "../generators/temper-poison-effects.ts"
import { generateTemperPotionCrafted } from "../generators/temper-potion-crafted.ts"
import { generateTemperPotionCrown } from "../generators/temper-potion-crown.ts"
import { generateTemperPotionDropped } from "../generators/temper-potion-dropped.ts"
import { generateTemperReagents } from "../generators/temper-reagents.ts"
import { TEMPER_ALCHEMY_OUTPUT_DIR, WEB_ENGINE_INVENTORY_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesAlchemy(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_ALCHEMY_OUTPUT_DIR,
      "potions-crown.generated.ts",
      generateTemperPotionCrown(p.potionCrownPages.rows)
    ),
    w(
      TEMPER_ALCHEMY_OUTPUT_DIR,
      "temper-potion-crafted.generated.ts",
      generateTemperPotionCrafted(p.potionCraftedPages.rows)
    ),
    w(
      TEMPER_ALCHEMY_OUTPUT_DIR,
      "temper-reagents.generated.ts",
      generateTemperReagents(p.reagentPages.rows)
    ),
    w(
      TEMPER_ALCHEMY_OUTPUT_DIR,
      "temper-potion-dropped.generated.ts",
      generateTemperPotionDropped(p.potionDroppedPages.rows)
    ),
    w(
      TEMPER_ALCHEMY_OUTPUT_DIR,
      "temper-poison-effects.generated.ts",
      generateTemperPoisonEffects(p.poisonEffectPages.rows)
    ),
    w(
      WEB_ENGINE_INVENTORY_DIR,
      "potion-restore-metrics.generated.ts",
      generatePotionRestoreMetrics(p.minedRestorePotions)
    ),
  ]
}
