import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSkills05 = {
  id: "01a06119-5cac-704d-b7b5-68f7c8bd187e",
  pageTypeSlug: "module",
  slug: "companion-skills-05",
  definition: "one run of companion skills, in the order the whole table names them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "These bytes are the last good build rather than what the generator emits today.",
    },
    {
      invariantKind: "gap",
      statement: "The generator that wrote these bytes cannot run today.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing in akasha reproduces these bytes.",
    },
    {
      invariantKind: "constraint",
      statement: "These skills are one unbroken run of the whole table's order.",
    },
    {
      invariantKind: "gap",
      statement: "A skill moved between runs breaks every build hash saved.",
    },
  ],
} as const satisfies Module
