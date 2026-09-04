import type { Module } from "@akasha/code-system/module"

export const characterAchievementsPanelCard = {
  id: "01a06421-f74b-7d4b-bfa1-cf2d5df70013",
  pageTypeSlug: "module",
  slug: "character-achievements-panel-card",
  definition: "the achievements each selected character has earned, by category",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The achievement tally the aggregate view walks is handed in as data rather than imported.",
    },
    {
      invariantKind: "departure",
      statement:
        "The achievement tally is built from the achievement-category catalog by the caller.",
    },
  ],
} as const satisfies Module
