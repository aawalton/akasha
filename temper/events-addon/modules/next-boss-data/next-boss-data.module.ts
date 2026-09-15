import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nextBossData = {
  id: "01a06157-8358-771d-9755-608609075ff5",
  type: "module",
  slug: "next-boss-data",
  definition: "which boss belongs to which district, and the order the round runs in",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A district is keyed by the name the player reads rather than by a number.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Thirteen bosses are spread across six districts and the sewers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The round of districts is listed three times over so a reader never runs off its end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The next district is read from one table clockwise and another counterclockwise.",
    },
  ],
} as const satisfies Module
