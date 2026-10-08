import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountTributePanelCard = {
  id: "01a06421-f74b-7724-b242-e7d6d606000c",
  type: "page-type/module",
  slug: "account-tribute-panel-card",
  definition: "the Tales of Tribute patrons and cards the account has unlocked",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is read from its completion category page.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:31:19.000Z",
} as const satisfies Module
