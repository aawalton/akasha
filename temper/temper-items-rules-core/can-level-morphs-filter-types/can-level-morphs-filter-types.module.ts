import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const canLevelMorphsFilterTypes = {
  id: "01a060d9-44c9-73f5-b636-a71e11ca32f5",
  pageTypeSlug: "module",
  slug: "can-level-morphs-filter-types",
  definition: "the shape of the condition asking whether a character can still level a morph",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Levelling a morph is the only sense this condition is asked in.",
    },
  ],
} as const satisfies Module
