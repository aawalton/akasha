import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateRuleClassify } from "@akasha/temper-addon-generators/rule-classify"
import { generateWebConditions } from "@akasha/temper-addon-generators/web-rule-conditions"
import { generateRuleTypes } from "@akasha/temper-addon-generators/rule-types"
import { generateTemperComparisonOp } from "@akasha/temper-addon-generators/temper-comparison-op"
import { generateTemperRuleTemplate } from "@akasha/temper-addon-generators/temper-rule-template"
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
