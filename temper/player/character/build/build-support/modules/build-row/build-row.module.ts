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
      statement: "A build was created at the moment in its id, and at no moment where its id has none.",
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
  updatedAt: "2026-09-25T04:38:17.000Z",
} as const satisfies Module
