import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemIconsSeeding = {
  id: "01a15082-d675-7293-a1cf-31a65186c0e8",
  type: "page-type/module",
  slug: "item-icons-seeding",
  definition: "each linked item's icon the sandbox answers by the item's id",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The items answered are the ones the seeded saved files link.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item's icon is read from the mined item rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item the rows hold no real icon for is answered as before.",
    },
  ],
  createdAt: "2026-10-18T19:35:14.292Z",
  updatedAt: "2026-10-18T19:35:14.292Z",
} as const satisfies Module
