import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillOrganization = {
  id: "01a061c7-0738-769a-abd8-5f7ceef65b23",
  type: "page-type/module",
  slug: "skill-organization",
  definition: "the skills a search leaves put into categories, skill lines and morph pairs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category is given by id, and the screen names it from its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Skills whose skill line has no category are left out.",
    },
  ],
  createdAt: "2026-09-02T11:00:28.600Z",
  updatedAt: "2026-10-30T16:47:24.929Z",
} as const satisfies Module
