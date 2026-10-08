import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillOrganization = {
  id: "01a061c7-0738-769a-abd8-5f7ceef65b23",
  type: "page-type/module",
  slug: "skill-organization",
  definition: "the skills a search leaves put into categories, lines and morph pairs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category is given by id, and the screen names it from its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Skills whose line has no category are left out.",
    },
  ],
  createdAt: "2026-09-02T11:00:28.600Z",
  updatedAt: "2026-09-27T11:56:28.000Z",
} as const satisfies Module
