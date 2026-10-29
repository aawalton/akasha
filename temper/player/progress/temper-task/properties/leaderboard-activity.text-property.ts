import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const leaderboardActivity = {
  id: "01a18936-ae7e-7dc8-92d1-615d56561c5a",
  type: "page-type/text-property",
  slug: "leaderboard-activity",
  propertySlug: "leaderboard-activity",
  definition: "the kind of leaderboard content a task waits for a character to be placed on",
  maxLength: 40,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The kind is named as the game names it: a raid, or an endless dungeon.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-29T19:50:24.636Z",
  updatedAt: "2026-10-29T19:50:24.636Z",
} as const satisfies TextProperty
