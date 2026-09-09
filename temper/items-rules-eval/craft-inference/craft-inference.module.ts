import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const craftInference = {
  id: "01a06137-f96a-71d7-bd01-e8c7b488135a",
  pageTypeSlug: "module",
  slug: "craft-inference",
  definition:
    "the crafting type and trait name an equipment item implies, read off the item's type numbers",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Necklaces and rings infer jewelry crafting ahead of any armor or weapon reasoning.",
    },
    {
      invariantKind: "departure",
      statement: "Heavy armor infers blacksmithing while light and medium armor infer clothier.",
    },
    {
      invariantKind: "departure",
      statement:
        "A bow or a staff or a shield infers woodworking while another weapon infers blacksmithing.",
    },
    {
      invariantKind: "departure",
      statement: "Research inference rejects any trait type outside 1 through 33.",
    },
  ],
} as const satisfies Module
