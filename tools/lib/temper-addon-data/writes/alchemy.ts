import type { AddonDataPages } from "../addon-data-pages.ts"
import { generatePotionRestoreMetrics } from "../generators/potion-restore-metrics.ts"
import { generateTemperPoisonEffects } from "@akasha/temper-addon-generators/temper-poison-effects"
import { generateTemperPotionCrafted } from "@akasha/temper-addon-generators/temper-potion-crafted"
import { generateTemperPotionCrown } from "@akasha/temper-addon-generators/temper-potion-crown"
import { generateTemperPotionDropped } from "@akasha/temper-addon-generators/temper-potion-dropped"
import { generateTemperReagents } from "@akasha/temper-addon-generators/temper-reagents"
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
