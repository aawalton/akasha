import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiKerning = {
  id: "01a0d972-8c45-7a44-a4a2-e00cd5f65846",
  type: "page-type/module",
  slug: "ui-kerning",
  definition: "the adjustment a face gives each pair of characters",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Kerning is read from the pair lookups a face's `kern` feature names in its GPOS table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pair is adjusted as HarfBuzz adjusts it, by the first table in a lookup that answers it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every lookup the feature names adds its adjustment to a pair.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pair is kept by character, grouped into classes so a face's pairs stay few.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No `kern` table is read, because no face the game or Temper ships holds one.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A mark between two characters is not skipped over, so the pair around it is not kerned.",
    },
  ],
} as const satisfies Module
