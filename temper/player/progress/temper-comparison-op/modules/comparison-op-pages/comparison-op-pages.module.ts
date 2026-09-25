import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const comparisonOpPages = {
  id: "01a0d8ab-069a-79e1-9dcd-eda00db6b456",
  type: "page-type/module",
  slug: "comparison-op-pages",
  definition: "every comparison op page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The comparison op pages are imported rather than read, so an add-on and a browser hold them as well.",
    },
  ],
} as const satisfies Module
