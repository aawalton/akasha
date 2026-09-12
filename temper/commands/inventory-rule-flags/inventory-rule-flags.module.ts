import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryRuleFlags = {
  id: "01a068e2-2269-7419-86a9-56b04e4d4e87",
  type: "module",
  slug: "inventory-rule-flags",
  definition: "what a rule flag said on the command line has to be to be taken",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value a flag cannot take is refused as input rather than carried on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the flag and the value said, and the values that flag takes or where to read them.",
    },
    {
      invariantKind: "departure",
      statement: "The categories a rule may be written against are the item category tree's.",
    },
    {
      invariantKind: "departure",
      statement: "The actions a rule may take are the ones the rules package declares.",
    },
    {
      invariantKind: "departure",
      statement: "The sources a buy rule may take are the ones the rules package declares.",
    },
    {
      invariantKind: "departure",
      statement: "A condition and a destination chain arrive as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "JSON that does not parse and JSON of the wrong shape are refused apart.",
    },
  ],
} as const satisfies Module
