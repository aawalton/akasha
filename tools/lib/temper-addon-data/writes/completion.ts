import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateTemperActivityCategory } from "@akasha/temper-addon-generators/activity-category"
import { generateTemperAntiquity } from "@akasha/temper-addon-generators/temper-antiquity"
import { generateTemperCadwell } from "@akasha/temper-addon-generators/temper-cadwell"
import { generateTemperCompletionCategory } from "@akasha/temper-addon-generators/temper-completion-category"
import { generateTemperPoi } from "@akasha/temper-addon-generators/temper-poi"
import { generateTemperQuest } from "@akasha/temper-addon-generators/temper-quest"
import { generateTemperTraitResearch } from "@akasha/temper-addon-generators/temper-trait-research"
import { generateTemperTribute } from "@akasha/temper-addon-generators/temper-tribute"
import { generateTemperZoneCompletion } from "@akasha/temper-addon-generators/temper-zone-completion"
import { TEMPER_COMPLETION_OUTPUT_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesCompletion(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "temper-activity-category.generated.ts",
      generateTemperActivityCategory(p.activityCategoryPages.rows)
    ),
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "temper-completion-category.generated.ts",
      generateTemperCompletionCategory(p.completionCategoryPages.rows)
    ),
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "tribute-data.generated.ts",
      generateTemperTribute(p.tributePatronPages.rows, p.catalogDomainPages.rows)
    ),
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "antiquity-data.generated.ts",
      generateTemperAntiquity(p.antiquityCategoryPages.rows, p.catalogDomainPages.rows)
    ),
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "quest-data.generated.ts",
      generateTemperQuest(p.worldZonePages.rows, p.catalogDomainPages.rows)
    ),
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "poi-data.generated.ts",
      generateTemperPoi(p.worldZonePages.rows, p.catalogDomainPages.rows)
    ),
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "zone-completion-data.generated.ts",
      generateTemperZoneCompletion(p.worldZonePages.rows, p.catalogDomainPages.rows)
    ),
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "cadwell-data.generated.ts",
      generateTemperCadwell(p.cadwellLevelPages.rows, p.catalogDomainPages.rows)
    ),
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "trait-research-data.generated.ts",
      generateTemperTraitResearch(
        p.craftTypePages.rows,
        p.researchLinePages.rows,
        p.catalogDomainPages.rows
      )
    ),
  ]
}
