import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const parseTimestamp = {
  id: "01a08dff-e11b-7ae5-995b-d7137e386294",
  type: "module",
  slug: "parse-timestamp",
  definition: "the moment in milliseconds a value holds, however that value spells one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value spelling no moment reads as the epoch.",
    },
  ],
} as const satisfies Module
