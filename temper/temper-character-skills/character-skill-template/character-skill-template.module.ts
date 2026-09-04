import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterSkillTemplate = {
  id: "01a0617a-2c70-7581-9900-cbdb1ccbe478",
  pageTypeSlug: "module",
  slug: "character-skill-template",
  definition: "the shape every Elder Scrolls Online skill row carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A skill row names one skill line and one skill type.",
    },
  ],
} as const satisfies Module
