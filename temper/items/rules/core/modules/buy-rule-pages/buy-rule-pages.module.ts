import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buyRulePages = {
  id: "01a0d8c8-b513-7c0f-9b4c-dba3562af97a",
  type: "page-type/module",
  slug: "buy-rule-pages",
  definition: "a buy rule a player holds, read from its page and written as one",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A buy rule's page is slugged `buy-rule-` and the id the rule has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Buy rules written together take display orders counted from nought in their order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buy rule read from its page buys from a merchant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buy rule keeping anything but a whole count bought is refused.",
    },
  ],
} as const satisfies Module
