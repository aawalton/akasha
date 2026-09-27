import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const baseRoleNames = {
  id: "01a0e2d7-ee16-703f-8398-bd5d15047ce6",
  type: "page-type/module",
  slug: "base-role-names",
  definition: "the words naming a set of companion base roles",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each role is named by its temper-companion-base-role page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Roles are named in the order their pages state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The joining and the name of no role are web phrase pages.",
    },
  ],
} as const satisfies Module
