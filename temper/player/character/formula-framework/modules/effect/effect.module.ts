import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const effect = {
  id: "01a06070-82e0-709f-bcad-2244adf22406",
  type: "page-type/module",
  slug: "effect",
  definition: "a change a source makes to a character's numbers",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An effect is a metric effect only where the metric effect union has the type that effect states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A slotted-ability scaling effect states whether its per-ability value is flat or fractional.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A per-stack effect states the flat value one stack of its buff gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A per-ten-Ultimate effect states the flat value each whole ten Ultimate held gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect may name the buffs it holds only while one is up.",
    },
  ],
  createdAt: "2026-09-02T04:46:21.408Z",
  updatedAt: "2026-10-20T17:20:39.400Z",
} as const satisfies Module
