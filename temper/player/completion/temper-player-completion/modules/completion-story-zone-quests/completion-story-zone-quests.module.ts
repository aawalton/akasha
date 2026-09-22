import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionStoryZoneQuests = {
  id: "01a0c668-4d54-70f1-a583-dc8b1143b2fd",
  type: "page-type/module",
  slug: "completion-story-zone-quests",
  definition: "the story zone a character still owes quest skill points in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The zone owed is the first story zone in release order that is short of its quests.",
    },
  ],
} as const satisfies Module
