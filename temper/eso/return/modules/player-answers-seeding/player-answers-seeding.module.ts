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
      statement: "The answers are read from the player answer catalog landed in akasha.",
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
      decisionKind: "decision-kind/constraint",
      statement:
        "A capture keeps the version of the add-on that collected it, which may be older than the checkout.",
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
  createdAt: "2026-09-24T22:44:45.774Z",
  updatedAt: "2026-10-19T18:22:43.381Z",
} as const satisfies Module
