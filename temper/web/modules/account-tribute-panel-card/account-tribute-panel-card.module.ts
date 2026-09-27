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
} as const satisfies Module
