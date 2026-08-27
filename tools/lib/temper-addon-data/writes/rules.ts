import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateRuleClassify } from "../generators/rule-classify.ts"
import { generateWebConditions } from "../generators/rule-conditions-web/index"
import { generateRuleTypes } from "../generators/rule-types.ts"
import { generateTemperComparisonOp } from "../generators/temper-comparison-op.ts"
import { generateTemperRuleTemplate } from "../generators/temper-rule-template.ts"
import { TEMPER_INVENTORY_OUTPUT_DIR, WEB_ENGINE_INVENTORY_DIR } from "../output-dirs.ts"

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
    w(TEMPER_INVENTORY_OUTPUT_DIR, "rule-types.generated.ts", generateRuleTypes()),
    w(TEMPER_INVENTORY_OUTPUT_DIR, "rule-classify.generated.ts", generateRuleClassify()),
    w(WEB_ENGINE_INVENTORY_DIR, "inventory-rule-conditions.generated.ts", generateWebConditions()),
  ]
}
