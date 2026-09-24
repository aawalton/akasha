import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillLines = {
  id: "01a0608a-c135-7b83-afde-8d52e111b852",
  type: "page-type/module",
  slug: "skill-lines",
  definition: "every skill line indexed by its id and by its category",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A skill line's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A skill line moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["SKILL_LINES_DATA"],
} as const satisfies Module
