import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribingTotalScriptCount = {
  id: "01a060d9-44cc-7857-8133-d0c4c0bfc797",
  type: "page-type/module",
  slug: "scribing-total-script-count",
  definition: "how many scribing scripts the game holds across focus, signature and affix",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This count is written out from the scribing script pages rather than by hand.",
    },
  ],
  createdAt: "2026-09-02T06:40:46.796Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Module
