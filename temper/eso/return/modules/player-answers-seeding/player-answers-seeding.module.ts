import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerAnswersSeeding = {
  id: "01a0d597-ba4e-7a70-9a6d-3d86c5f10fb5",
  type: "page-type/module",
  slug: "player-answers-seeding",
  definition: "the Lua giving back in a sandbox what the player's own game answered a function",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The answers are read from the catalog add-on's saved file on this machine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the answers' own table is taken out of that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answers are read from the first account holding them, by sorted name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A function asked with values the player's game answered gives back those answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Asked any other way, it gives back what it gave before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer about what the player was doing as the capture ran is not handed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The functions the player's game answered are named in the sandbox.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The size of the player's interface is read from beside the answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Answers kept by a capture of no version read here are not read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Answers the first capture kept under each function are read under the values asked instead.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A capture keeps the version of the add-on the game last ran, which may be older than the checkout.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One Lua chunk holds at most 65,536 constants, and the answers hold more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answers are parsed here and handed over a few values at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is handed over is set in place only once all of it has gone over.",
    },
  ],
} as const satisfies Module
