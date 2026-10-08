import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillsPanel = {
  id: "01a0642f-8c33-7ab0-8510-f81892666068",
  type: "page-type/module",
  slug: "companion-skills-panel",
  definition: "the panel gathering a companion's skill cards",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:13:52.819Z",
  updatedAt: "2026-09-27T11:54:35.000Z",
} as const satisfies Module
