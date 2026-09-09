import type { PageType } from "@akasha/pages/page-type"
import type { TemperRule } from "../rules/temper-rule.page-type.ts"

export type TemperRuleTemplate = TemperRule

export const temperRuleTemplate = {
  id: "01a05fd0-3aa6-7646-b33d-56f120ee1438",
  pageTypeSlug: "page-type",
  slug: "temper-rule-template",
  definition: "a ready-made rule for what to do with an item",
  pluralSlug: "temper-rule-templates",
  extends: ["page-type/temper-rule"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "text-property/description", required: true, many: false },
    { pagePropertySlug: "text-property/category-id", required: true, many: false },
    { pagePropertySlug: "number-property/display-order", required: true, many: false },
    { pagePropertySlug: "relation-property/action", required: true, many: false },
    { pagePropertySlug: "boolean-property/active", required: true, many: false },
    { pagePropertySlug: "relation-property/goal", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A template is offered to a reader rather than acted on where the template is off.",
    },
  ],
} as const satisfies PageType
