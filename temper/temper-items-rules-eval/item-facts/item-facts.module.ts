import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemFacts = {
  id: "01a06137-f96c-7332-b371-6a8536a60c01",
  pageTypeSlug: "module",
  slug: "item-facts",
  definition: "the per-item signals a compiled inventory rule is evaluated against",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "An item facts record requires itemId and itemName and itemLink and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "An absent field means the signal is unknown rather than meaning false.",
    },
    {
      invariantKind: "departure",
      statement: "The category chain arrives already flattened into an array of node ids.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here describes a character or a rule or the wider inventory.",
    },
  ],
} as const satisfies Module
