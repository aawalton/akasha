import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperRule } from "../rules/temper-rule.page-type.ts"
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
  slug: "temper-inventory-rule",
  definition: "a rule a player has in force over what they carry",
  pluralSlug: "temper-inventory-rules",
  extendsSlug: ["page-type/temper-rule"],
  partSlugs: [
    "boolean-property/rule-locked",
    "instant-property/updated-at",
    "number-property/target-quantity",
    "page-property-entry/destination-chain",
    "relation-property/from-template",
    "text-property/char-eligibility",
  ],
  properties: [
    { pagePropertySlug: "account-page", required: true, many: false },
    { pagePropertySlug: "category-id", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "action", required: true, many: false },
    { pagePropertySlug: "active", required: true, many: false },
    { pagePropertySlug: "updated-at", required: true, many: false },
    { pagePropertySlug: "rule-locked", required: false, many: false },
    { pagePropertySlug: "from-template", required: false, many: false },
    { pagePropertySlug: "destination-chain", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule here is one a player has adopted rather than one offered to a player.",
    },
    {
      invariantKind: "departure",
      statement: "Where a rule falls among the rules is what settles which rule acts first.",
    },
    {
      invariantKind: "departure",
      statement: "A chain is read ahead of a destination where a rule states each.",
    },
    {
      invariantKind: "gap",
      statement: "A rule states a destination or a chain of them rather than both.",
    },
    {
      invariantKind: "gap",
      statement: "A rule adopted from a template and since edited says the changes that rule made.",
    },
  ],
} as const satisfies PageType
