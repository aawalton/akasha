import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionAutomationPanelCard = {
  id: "01a0643c-65d6-754a-9f86-3dd6da80e1b7",
  type: "page-type/module",
  slug: "companion-automation-panel-card",
  definition: "a panel card stating what a companion does without being told",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:27:54.966Z",
  updatedAt: "2026-09-27T11:41:21.000Z",
} as const satisfies Module
