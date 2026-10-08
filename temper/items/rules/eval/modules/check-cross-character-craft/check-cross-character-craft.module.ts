import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkCrossCharacterCraft = {
  id: "01a06137-f964-7c61-843b-2d70fcb4ffe7",
  type: "page-type/module",
  slug: "check-cross-character-craft",
  definition:
    "the condition check over whether any character can research a trait or gain crafting inspiration",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Research and inspiration are answered across every character rather than the current character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One character below the crafting rank cap makes the whole item inspirable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A trait with no researchable mapping fails the can-research form of the condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item with no inferrable crafting type fails the can-inspire form of the condition.",
    },
  ],
  createdAt: "2026-09-02T08:24:13.412Z",
  updatedAt: "2026-09-21T15:32:06.000Z",
} as const satisfies Module
