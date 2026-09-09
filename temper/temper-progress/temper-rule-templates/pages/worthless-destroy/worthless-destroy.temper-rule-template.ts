import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const worthlessDestroy = {
  id: "019e3104-262e-7641-92a5-c6fd26067689",
  pageTypeSlug: "temper-rule-template",
  slug: "worthless-destroy",
  title: "Destroy worthless items",
  key: "worthless-destroy",
  description:
    "Destroys normal (white) quality items that have no guild store value and no merchant value. Place at the very bottom — only items not caught by any higher-priority rule are destroyed.",
  categoryId: "all",
  displayOrder: 47,
  action: "destroy",
  active: false,
  goal: "destroy",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
