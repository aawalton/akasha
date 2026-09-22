import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCompanionRapportTally = {
  id: "01a0c980-253b-7344-815c-ee75e6c49fb1",
  type: "page-type/module",
  slug: "completion-companion-rapport-tally",
  definition: "how much rapport a character has earned out of all a companion can hold",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion the game gives no id of its own holds no rapport.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rapport past what a companion holds counts as what that companion holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path names the companion whose rapport is counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path naming a companion that is not there is answered with nothing.",
    },
  ],
} as const satisfies Module
