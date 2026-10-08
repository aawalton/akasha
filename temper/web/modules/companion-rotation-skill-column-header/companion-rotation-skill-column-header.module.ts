import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionRotationSkillColumnHeader = {
  id: "01a0642f-8c32-789b-91be-f35bfeceec9b",
  type: "page-type/module",
  slug: "companion-rotation-skill-column-header",
  definition: "the header naming a skill column of a rotation breakdown",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:13:52.818Z",
  updatedAt: "2026-09-27T11:54:35.000Z",
} as const satisfies Module
