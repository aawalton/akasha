import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribedSkills03 = {
  id: "01a0617c-86c2-7e83-90bf-98b3d5e4f6eb",
  pageTypeSlug: "module",
  slug: "scribed-skills-03",
  definition: "one run of scribed skills, in the order the whole table names them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "These entries are one unbroken run of the whole table's order.",
    },
    {
      invariantKind: "gap",
      statement: "An entry moved between runs breaks every build hash saved.",
    },
  ],
} as const satisfies Module
