import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setCatalogLoading = {
  id: "01a0de3a-6829-7f01-b43e-d311f5dbbda7",
  type: "page-type/module",
  slug: "set-catalog-loading",
  definition: "the one read that fills the held set catalogue from its pages on a server",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalogue already held is kept rather than read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A server holding an older catalogue still reads every hash it knows.",
    },
  ],
} as const satisfies Module
