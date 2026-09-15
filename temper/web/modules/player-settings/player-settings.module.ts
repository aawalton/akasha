import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerSettings = {
  id: "01a0640f-8510-7ec4-bf91-bd8c41002f73",
  type: "module",
  slug: "player-settings",
  definition: "the logging, safety and shopping settings a player keeps, read and written",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each section is narrowed before the section is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A section that does not narrow reads as its default.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write has the whole blob rather than the section that changed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "These three sections read the copy hooks-inventory-settings has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A section this module leaves alone survives a write from this module.",
    },
  ],
} as const satisfies Module
