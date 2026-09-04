import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionDescriptionFormula = {
  id: "01a06152-c2c6-7e8b-9473-fd4f7cf6c36d",
  pageTypeSlug: "module",
  slug: "companion-description-formula",
  definition: "the numbers a companion skill description's placeholders are filled with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Effect types that produce a value are listed in a set rather than matched by a switch.",
    },
    {
      invariantKind: "constraint",
      statement: "Values come out in the order the effects were declared.",
    },
  ],
} as const satisfies Module
