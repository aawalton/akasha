import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerSettings = {
  id: "01a0640f-8510-7ec4-bf91-bd8c41002f73",
  type: "page-type/module",
  slug: "player-settings",
  definition: "the logging, safety and shopping settings a player keeps, read and written",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each section is narrowed before the section is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section that does not narrow reads as its default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write has the whole blob rather than the section that changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "These three sections read the copy hooks-inventory-settings has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section this module leaves alone survives a write from this module.",
    },
  ],
  createdAt: "2026-09-02T21:38:53.840Z",
  updatedAt: "2026-09-15T18:44:13.000Z",
} as const satisfies Module
