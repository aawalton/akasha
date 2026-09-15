import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tributeCatalogSchema = {
  id: "01a06076-5ea7-7930-8509-86381d5f66d2",
  type: "page-type/module",
  slug: "tribute-catalog-schema",
  definition: "the zod schema reading the tribute patron catalog out of saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A patron has the cards that patron gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card names its base form and its upgraded form.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog key arrives as text and is coerced to a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each level is checked against its shape in `temper-capture-shapes`.",
    },
  ],
} as const satisfies Module
