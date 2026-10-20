import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const extractPassives = {
  id: "01a06271-abcf-7c72-adb9-549ee5b23055",
  type: "page-type/module",
  slug: "extract-passives",
  definition: "the passives a build is eligible for, read out as effect sources",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive is read at the rank the build states for that passive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive the build states no rank for is read at the rank its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank's values come from the game's own text for that rank's ability.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rank no effect row states moves no metric, so a rank never borrows another's values.",
    },
  ],
  createdAt: "2026-09-02T14:06:51.855Z",
  updatedAt: "2026-10-20T02:09:46.361Z",
} as const satisfies Module
