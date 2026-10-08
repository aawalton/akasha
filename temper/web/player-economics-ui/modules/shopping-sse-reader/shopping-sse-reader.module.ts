import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingSseReader = {
  id: "01a063a1-8cc1-700e-a14c-4e6635e9e0a4",
  type: "page-type/module",
  slug: "shopping-sse-reader",
  definition: "a server-sent event stream turned into frames",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A response with no body reads as a stream that ended without a result.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An error frame carries a reason code, and one with no known code is dropped.",
    },
  ],
  createdAt: "2026-09-02T19:38:46.849Z",
  updatedAt: "2026-09-27T11:53:48.000Z",
} as const satisfies Module
