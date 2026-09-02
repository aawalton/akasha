import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateTemperActivityCategory } from "@akasha/temper-addon-generators/activity-category"
import { generateTemperAntiquity } from "@akasha/temper-addon-generators/temper-antiquity"
import { generateTemperCompletionCategory } from "@akasha/temper-addon-generators/temper-completion-category"
import { generateTemperTribute } from "@akasha/temper-addon-generators/temper-tribute"
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
  ]
}
