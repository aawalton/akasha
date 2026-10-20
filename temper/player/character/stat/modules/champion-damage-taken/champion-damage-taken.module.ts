import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const championDamageTaken = {
  id: "01a15982-41ff-7cc0-80bf-e942fbf5c0d5",
  type: "page-type/module",
  slug: "champion-damage-taken",
  definition: "the martial and magical damage taken the champion stars spent give",
  code: "ts",
  test: "ts",
  testReads: ["page-type/temper-champion-star"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The add-on and the catalog read the same star pages, so both give the same number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A star whose effects move damage taken is listed here, and a test holds the list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Damage taken every attack takes counts for martial and magical damage both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star gives the share of its effects its points earn, as the star page says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slottable star counts only while slotted.",
    },
  ],
  createdAt: "2026-10-20T13:31:11.231Z",
  updatedAt: "2026-10-20T13:31:11.231Z",
} as const satisfies Module
