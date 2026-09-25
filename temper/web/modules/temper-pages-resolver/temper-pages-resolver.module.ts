import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const temperPagesResolver = {
  id: "01a0640f-8510-7c72-8ea7-ff3cbcdf74b3",
  type: "page-type/module",
  slug: "temper-pages-resolver",
  definition: "every temper page a browser holds, put into one list beside the page types",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The seven temper page types are named here rather than worked out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole set is loading while any one type is loading.",
    },
  ],
} as const satisfies Module
