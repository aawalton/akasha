import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoPaths = {
  id: "01a06050-639f-7d76-bfda-f105e8a7cd3e",
  type: "page-type/module",
  slug: "eso-paths",
  definition: "the directories from which the game and the game's sources are read",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An environment variable naming a directory outright is taken over any other answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Windows is answered from the user profile directory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other platform is answered from the Proton prefix the game runs under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The live directory is answered as candidates in the order the candidates are tried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unset home directory is refused rather than answered as the root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's client is answered from the Steam library the game installs into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Art taken out of the game is kept in the user's cache, never in the game's install.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a directory.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes a directory.",
    },
  ],
} as const satisfies Module
