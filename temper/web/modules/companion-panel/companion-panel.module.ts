import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionPanel = {
  id: "01a0641f-8be8-76e6-a061-d333686e2c96",
  type: "page-type/module",
  slug: "companion-panel",
  definition: "the panel a companion's character tab draws",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:56:24.168Z",
  updatedAt: "2026-09-27T11:51:50.000Z",
} as const satisfies Module
