import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftInference = {
  id: "01a06137-f96a-71d7-bd01-e8c7b488135a",
  type: "page-type/module",
  slug: "craft-inference",
  definition:
    "the crafting type and trait name an equipment item implies, read off the item's type numbers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Necklaces and rings infer jewelry crafting ahead of any armor or weapon reasoning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Heavy armor infers blacksmithing while light and medium armor infer clothier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A bow or a staff or a shield infers woodworking while another weapon infers blacksmithing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Research inference rejects any trait type outside 1 through 33.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A trait no character can ever research is no research trait, so no trait map names it.",
    },
  ],
} as const satisfies Module
