import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribingPanelCard = {
  id: "01a0642c-5ba7-7199-b3f7-3f4888c380d1",
  type: "page-type/module",
  slug: "scribing-panel-card",
  definition: "a panel card holding scribed skills",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether a grimoire is left is worked out again whenever the grimoires are read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.783Z",
  updatedAt: "2026-09-27T11:38:46.000Z",
} as const satisfies Module
