import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperInventoryRule = {
  id: "01a07283-f299-703a-a255-0c48075885be",
  type: "page-type/page-type",
  slug: "temper-inventory-rule",
  definition: "a rule a player has in force over what they carry",
  extends: ["page-type/temper-rule"],
  parts: [
    "boolean-property/rule-locked",
    "instant-property/updated-at",
    "number-property/target-quantity",
    "page-property-entry/destination-chain",
    "text-property/char-eligibility",
    "boolean-property/craft-shortfall",
  ],
  properties: [
    { pageProperty: "relation-property/account-page", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "relation-property/action", required: true, many: false },
    { pageProperty: "boolean-property/active", required: true, many: false },
    { pageProperty: "instant-property/updated-at", required: true, many: false },
    { pageProperty: "boolean-property/rule-locked", required: false, many: false },
    { pageProperty: "page-property-entry/destination-chain", required: false, many: false },
    { pageProperty: "relation-property/item-category", required: true, many: false },
    { pageProperty: "boolean-property/craft-shortfall", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule here is a rule a player has adopted rather than a rule offered to a player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a rule falls among the rules settles which rule acts first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chain is read ahead of a destination where a rule states a chain and a destination.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A rule states a destination or a chain of destinations rather than a destination and a chain.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
