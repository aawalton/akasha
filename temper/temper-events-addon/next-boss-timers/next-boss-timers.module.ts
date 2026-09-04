import type { Module } from "@akasha/code-system/module"

export const nextBossTimers = {
  id: "01a06157-8358-7ee9-8d50-84cac768c2cb",
  pageTypeSlug: "module",
  slug: "next-boss-timers",
  definition: "how long each district has left, and what starts a district's count",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A timer holds the second a boss returns rather than the seconds left.",
    },
    {
      invariantKind: "departure",
      statement: "The district with the longest time left is where the round is read from.",
    },
    {
      invariantKind: "departure",
      statement: "The sewers are listed first and the six districts follow in running order.",
    },
    {
      invariantKind: "departure",
      statement:
        "A timer a player starts is shared with the group and one a group member shares is not.",
    },
    {
      invariantKind: "constraint",
      statement: "A time here is a second the game counts rather than a date.",
    },
  ],
} as const satisfies Module
