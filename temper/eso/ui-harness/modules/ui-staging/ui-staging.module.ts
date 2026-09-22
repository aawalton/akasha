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
      statement: "The engine's captured constants are put in before anything that reads them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A model loaded after them holds the value it states, so a model can still differ.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A library the game loads before an addon is loaded here in the order the game loads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window of the game's own that a caller names is built and shown before the addon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window of the game's own is built so an addon docking to it finds it there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player's saved variables are seeded whole where the window asks for them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game's own saved variables library is loaded rather than modelled again here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The account a saved variable is read under is the first by name the seeded files hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Who the player is answers from the seeded files rather than from a character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The character the addon reads is the harness rather than a character the player has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A harness that will not come up is closed rather than left open.",
    },
  ],
} as const satisfies Module
