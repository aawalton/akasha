import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionRapport = {
  id: "01a06108-2fea-7e03-804e-71e12bdddd7f",
  type: "page-type/module",
  slug: "companion-rapport",
  definition: "how fond a companion is of a character, as a raw count and as a tier",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Rapport is held between nothing and its ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion with a quest left holds one short of the ceiling.",
    },
  ],
} as const satisfies Module
