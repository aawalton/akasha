import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemBrowserZoneClassification = {
  id: "01a06178-3723-7d81-a3cf-41427a52afb3",
  type: "module",
  slug: "item-browser-zone-classification",
  definition: "which kind of content a zone is, so a set can be filtered by where it drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "These rows are a frozen port of an upstream table.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "No program in this repository rebuilds these rows.",
    },
  ],
} as const satisfies Module
