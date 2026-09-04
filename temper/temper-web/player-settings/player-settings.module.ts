import type { Module } from "@akasha/code-system/module"

export const playerSettings = {
  id: "01a0640f-8510-7ec4-bf91-bd8c41002f73",
  pageTypeSlug: "module",
  slug: "player-settings",
  definition: "the logging, safety and shopping settings a player keeps, read and written",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each section is narrowed before the section is read.",
    },
    {
      invariantKind: "departure",
      statement: "A section that does not narrow is left out rather than kept part-read.",
    },
    {
      invariantKind: "departure",
      statement: "A write carries the whole blob rather than the section that changed.",
    },
    {
      invariantKind: "departure",
      statement: "One write is in flight at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A reader with no user id matches no player row.",
    },
  ],
} as const satisfies Module
