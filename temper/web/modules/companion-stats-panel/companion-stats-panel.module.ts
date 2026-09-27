import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionStatsPanel = {
  id: "01a06436-3557-72c0-9712-d936c8e8eaa3",
  type: "page-type/module",
  slug: "companion-stats-panel",
  definition: "the panel gathering a companion's stat cards",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The groups are drawn again when the stat pages or the role pages are read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
