import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCompanionQuestTally = {
  id: "01a0c971-e203-710b-8d8d-d551b5514d16",
  type: "page-type/module",
  slug: "completion-companion-quest-tally",
  definition: "how many companion quests a character has done out of all of them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest is counted from the quests the character's own record names as done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record naming its quests by key counts the same as one naming them in a list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path names the companion whose quests are counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path naming a companion that is not there is answered with nothing.",
    },
  ],
} as const satisfies Module
