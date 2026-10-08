import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lostTreasureGlobal = {
  id: "01a06141-8005-7878-9128-a7d186911cfd",
  type: "page-type/module",
  slug: "lost-treasure-global",
  definition: "the three calls this add-on's own markup makes back into it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This global is the add-on's own name rather than a name the game owns.",
    },
  ],
  createdAt: "2026-09-02T08:34:37.701Z",
  updatedAt: "2026-09-21T15:28:00.000Z",
} as const satisfies Module
