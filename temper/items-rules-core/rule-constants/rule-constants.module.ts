import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const ruleConstants = {
  id: "01a060d9-44cc-7b06-9dd7-c62933ed2bb1",
  type: "module",
  slug: "rule-constants",
  definition: "the named thresholds a rule may name in place of a number",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A threshold named by key resolves to the number this table has under that key.",
    },
    {
      invariantKind: "departure",
      statement: "A rule may give a threshold as a plain number instead of naming a key.",
    },
  ],
} as const satisfies Module
