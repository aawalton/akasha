import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const requiredSkillLinesFilterTypes = {
  id: "01a060d9-44cb-7469-95e8-03afb51f0719",
  pageTypeSlug: "module",
  slug: "required-skill-lines-filter-types",
  definition: "the shape of the condition asking how far named skill lines have been levelled",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A condition asks that every named line be maxed or that one named line is not.",
    },
  ],
} as const satisfies Module
