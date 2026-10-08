import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const canLevelMorphsFilterTypes = {
  id: "01a060d9-44c9-73f5-b636-a71e11ca32f5",
  type: "page-type/module",
  slug: "can-level-morphs-filter-types",
  definition: "the shape of the condition asking whether a character can still level a morph",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Levelling a morph is the only sense this condition is asked in.",
    },
  ],
  createdAt: "2026-09-02T06:40:46.793Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Module
