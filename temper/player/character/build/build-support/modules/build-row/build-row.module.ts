import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildRow = {
  id: "01a08e40-dcf5-7caf-be8f-9ac9935fa409",
  type: "page-type/module",
  slug: "build-row",
  definition: "the stored row a saved build is, turned into the shape a caller holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build was created at the instant its page states, and at none where it states none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row carries the metadata its own caller parses rather than a metadata of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field that does not parse takes the empty value its type has.",
    },
  ],
  createdAt: "2026-09-11T02:16:50.677Z",
  updatedAt: "2026-10-08T16:17:27.649Z",
} as const satisfies Module
