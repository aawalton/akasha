import type { AddonDataPages } from "@akasha/temper-addon-data/addon-data-pages"
import { generateTemperComparisonOp } from "@akasha/temper-addon-generators/temper-comparison-op"
import { generateTemperRuleTemplate } from "@akasha/temper-addon-generators/temper-rule-template"
import { WEB_ENGINE_INVENTORY_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesRules(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      WEB_ENGINE_INVENTORY_DIR,
      "temper-comparison-op.generated.ts",
      generateTemperComparisonOp(p.comparisonOpPages.rows)
    ),
    w(
      WEB_ENGINE_INVENTORY_DIR,
      "temper-rule-template.generated.ts",
      generateTemperRuleTemplate(p.ruleTemplatePages.rows)
    ),
  ]
}
