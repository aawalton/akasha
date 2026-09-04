import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionMetricDisplayFormula = {
  id: "01a06152-c2cb-7230-b589-bd7b8d4013b9",
  pageTypeSlug: "module",
  slug: "companion-metric-display-formula",
  definition:
    "converter from a companion metric value to a display formula tree of labeled contributions",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Arithmetic node kinds reaching the leaf converter throw rather than render.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Category contributions follow the order of COMPANION_CATEGORIES rather than source order.",
    },
    {
      invariantKind: "gap",
      statement:
        "A metric with no formula and no effectType renders as the literal label Simulation Result.",
    },
  ],
} as const satisfies Module
