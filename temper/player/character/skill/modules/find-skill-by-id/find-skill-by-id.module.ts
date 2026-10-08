import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const findSkillById = {
  id: "01a06187-b3a3-7d2a-b33f-3befa93b8a07",
  type: "page-type/module",
  slug: "find-skill-by-id",
  definition:
    "the skill an id names, looked for among the ordinary skills and then the scribed ones",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The empty slot sentinel answers with no skill.",
    },
  ],
  createdAt: "2026-09-02T09:51:18.435Z",
  updatedAt: "2026-09-21T15:38:18.000Z",
} as const satisfies Module
