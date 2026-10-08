import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bankUpgradesPanelCard = {
  id: "01a06421-f74b-77f4-8d05-da4c02500010",
  type: "page-type/module",
  slug: "bank-upgrades-panel-card",
  definition: "the bank slots the account has bought against the most there are",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is read from its completion category page.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:43:30.000Z",
} as const satisfies Module
