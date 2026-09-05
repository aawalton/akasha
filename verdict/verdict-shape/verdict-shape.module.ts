import type { Module } from "../../code-system/modules/module.page-type.ts"

export const verdictShape = {
  id: "01a05c87-a161-78d7-afb2-6becb8d2161f",
  pageTypeSlug: "module",
  slug: "verdict-shape",
  definition: "what a judgement carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here exists at runtime.",
    },
  ],
} as const satisfies Module
