import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkills01 = {
  id: "01a06119-5cab-7943-beb0-19e8173e0716",
  type: "module",
  slug: "companion-skills-01",
  definition: "one run of companion skills, in the order the whole table names them",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "These bytes are the last good build rather than the bytes the generator emits today.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The generator that wrote these bytes cannot run today.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing in akasha reproduces these bytes.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "These skills are one unbroken run of the whole table's order.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A skill moved between runs breaks every build hash saved.",
    },
  ],
} as const satisfies Module
