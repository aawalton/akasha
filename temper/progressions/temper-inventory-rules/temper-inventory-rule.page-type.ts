import type { PageType } from "@akasha/pages/page-type"
import type { TemperRule } from "../temper-rules/temper-rule.page-type.types.ts"
import type { DestinationChain } from "./properties/destination-chain.page-property-entry.ts"
import type { FromTemplate } from "./properties/from-template.relation-property.ts"
import type { RuleLocked } from "./properties/rule-locked.boolean-property.ts"
import type { UpdatedAt } from "./properties/updated-at.instant-property.ts"

export type TemperInventoryRule = TemperRule & {
  updatedAt: UpdatedAt
  locked?: RuleLocked
  fromTemplate?: FromTemplate
  destinationChain?: DestinationChain
}

export const temperInventoryRule = {
  id: "01a07283-f299-703a-a255-0c48075885be",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-inventory-rule",
  definition: "a rule a player has in force over what they carry",
  pluralSlug: "temper-inventory-rules",
  extends: ["page-type/temper-rule"],
  parts: [
    "boolean-property/rule-locked",
    "instant-property/updated-at",
    "number-property/target-quantity",
    "page-property-entry/destination-chain",
    "relation-property/from-template",
    "text-property/char-eligibility",
  ],
  properties: [
    { pageProperty: "text-property/account-page", required: true, many: false },
    { pageProperty: "text-property/category-id", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "relation-property/action", required: true, many: false },
    { pageProperty: "boolean-property/active", required: true, many: false },
    { pageProperty: "instant-property/updated-at", required: true, many: false },
    { pageProperty: "boolean-property/rule-locked", required: false, many: false },
    { pageProperty: "relation-property/from-template", required: false, many: false },
    { pageProperty: "page-property-entry/destination-chain", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A rule here is a rule a player has adopted rather than a rule offered to a player.",
    },
    {
      invariantKind: "departure",
      statement: "Where a rule falls among the rules settles which rule acts first.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chain is read ahead of a destination where a rule states a chain and a destination.",
    },
    {
      invariantKind: "gap",
      statement:
        "A rule states a destination or a chain of destinations rather than a destination and a chain.",
    },
    {
      invariantKind: "gap",
      statement: "A rule adopted from a template and later edited says the changes that rule made.",
    },
  ],
} as const satisfies PageType
