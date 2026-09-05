import type { PageType } from "@akasha/pages/page-type"
import type { TemperRule } from "../rules/temper-rule.page-type.ts"

export type TemperRuleTemplate = TemperRule

export const temperRuleTemplate = {
  id: "01a05fd0-3aa6-7646-b33d-56f120ee1438",
  pageTypeSlug: "page-type",
  slug: "temper-rule-template",
  definition: "a ready-made rule for what to do with an item",
  pluralSlug: "temper-rule-templates",
  extendsSlug: ["page-type/temper-rule"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "category-id", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "action", required: true, many: false },
    { pagePropertySlug: "active", required: true, many: false },
    { pagePropertySlug: "goal", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A template is offered to a reader rather than acted on where the template is off.",
    },
  ],
} as const satisfies PageType
