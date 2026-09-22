import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiStaging = {
  id: "01a0ca65-211f-7d61-a848-1af03a21431c",
  type: "page-type/module",
  slug: "ui-staging",
  definition:
    "a harness brought up with the game's templates, the game's libraries and an addon in it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An addon is brought up from the build its last deploy left rather than from the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon with no build left behind refuses rather than coming up empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The commit that build was pinned at is carried back, so a caller says what it drew.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The templates are every one the game declares and every one Temper declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A library the game loads before an addon is loaded here in the order the game loads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player's saved variables are seeded whole where the window asks for them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The account a saved variable is read under is the first account that file holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A harness that will not come up is closed rather than left open.",
    },
  ],
} as const satisfies Module
