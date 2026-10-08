import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleConstants = {
  id: "01a060d9-44cc-7b06-9dd7-c62933ed2bb1",
  type: "page-type/module",
  slug: "rule-constants",
  definition: "the named thresholds a rule may name in place of a number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A threshold named by key resolves to the number this table has under that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule may give a threshold as a plain number instead of naming a key.",
    },
  ],
  createdAt: "2026-09-02T06:40:46.796Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Module
