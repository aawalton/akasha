import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const equipmentQualityRules = {
  id: "01a06333-1bcc-79b7-bb9c-18d82e7b134a",
  type: "module",
  slug: "equipment-quality-rules",
  definition: "one equipment quality as a reader picks it and reads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A quality a reader cannot pick is not offered.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The absence of a quality is shown muted rather than as a quality.",
    },
  ],
} as const satisfies Module
