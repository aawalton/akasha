import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryRuleConditionsShape = {
  id: "01a0957a-420f-7000-8493-c2bb0c0ff5f8",
  type: "module",
  slug: "inventory-rule-conditions-shape",
  definition: "the shape a rule's conditions hold, stated once for every reader of a rule",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every condition field a rule may state is named here with the shape it holds.",
    },
    {
      invariantKind: "departure",
      statement: "A field this shape does not name is carried through rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A field this shape names is refused where its value is the wrong shape.",
    },
  ],
} as const satisfies Module
