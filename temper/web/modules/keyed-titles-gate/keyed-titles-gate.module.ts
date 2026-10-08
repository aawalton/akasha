import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keyedTitlesGate = {
  id: "01a0e0a0-2424-7003-ad9b-86cbf222b843",
  type: "page-type/module",
  slug: "keyed-titles-gate",
  definition: "what shows its content only once a page type's keyed titles are read",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the titles are read the screen shows what it is handed instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The content is drawn again whenever the titles are read again.",
    },
  ],
  createdAt: "2026-09-27T02:09:46.532Z",
  updatedAt: "2026-09-27T08:57:16.000Z",
} as const satisfies Module
