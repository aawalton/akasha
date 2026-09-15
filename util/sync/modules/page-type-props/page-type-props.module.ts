import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTypeProps = {
  id: "01a05c6a-2bb4-735e-bfca-90ad75728a5e",
  type: "page-type/module",
  slug: "page-type-props",
  definition: "the shape one property of a page type is declared in for the store",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property naming another page states its target and the back reference.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here declares a property.",
    },
  ],
} as const satisfies Module
