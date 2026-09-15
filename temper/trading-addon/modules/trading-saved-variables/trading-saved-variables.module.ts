import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingSavedVariables = {
  id: "01a06160-2a5c-7b38-bdfd-3a991e050619",
  type: "page-type/module",
  slug: "trading-saved-variables",
  definition: "what the listings add-on keeps between sessions, and how a session opens it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A guild entry is made on first touch rather than declared up front.",
    },
  ],
} as const satisfies Module
