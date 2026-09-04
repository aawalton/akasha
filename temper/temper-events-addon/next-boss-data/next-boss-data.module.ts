import type { Module } from "@akasha/code-system/module"

export const nextBossData = {
  id: "01a06157-8358-771d-9755-608609075ff5",
  pageTypeSlug: "module",
  slug: "next-boss-data",
  definition: "which boss belongs to which district, and the order the round runs in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A district is keyed by the name the player reads rather than by a number.",
    },
    {
      invariantKind: "constraint",
      statement: "Thirteen bosses are spread across six districts and the sewers.",
    },
    {
      invariantKind: "departure",
      statement:
        "The round of districts is listed three times over so a reader never runs off its end.",
    },
    {
      invariantKind: "departure",
      statement: "The next district is read from one table clockwise and another counterclockwise.",
    },
  ],
} as const satisfies Module
