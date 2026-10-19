import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogCaptureReading = {
  id: "01a15542-1fc5-7231-9bec-353cdcd290bc",
  type: "page-type/module",
  slug: "catalog-capture-reading",
  definition: "the table a catalog domain's capture holds, read from beside its page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog is read from the capture beside its domain page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog whose domain has no page, or no capture, is answered with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the domain page sits is read from the index.",
    },
  ],
  createdAt: "2026-10-19T17:42:39.301Z",
  updatedAt: "2026-10-19T17:42:39.301Z",
} as const satisfies Module
