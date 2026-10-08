import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionMeasured = {
  id: "01a06108-2ff2-74de-bd0e-f2cc1d348cce",
  type: "page-type/module",
  slug: "completion-measured",
  definition: "whether a character, an account or a companion has been read at all",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character with only roster fields counts as unread.",
    },
  ],
  createdAt: "2026-09-02T07:32:01.650Z",
  updatedAt: "2026-09-21T15:58:08.000Z",
} as const satisfies Module
