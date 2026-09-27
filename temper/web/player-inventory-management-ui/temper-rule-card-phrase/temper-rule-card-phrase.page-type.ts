import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperRuleCardPhrase = {
  id: "01a0e272-3ee8-728e-bb34-eea061366568",
  type: "page-type/page-type",
  slug: "temper-rule-card-phrase",
  definition: "a piece of wording a rule card shows around the things it names",
  extends: ["page-type/temper-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is the name the rule card asks for the phrase by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is the phrase a reader is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name in braces in the title is filled from a page the card reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A lock reason names its action, filter and value in braces, filled from their pages.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
