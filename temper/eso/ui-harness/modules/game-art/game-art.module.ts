import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gameArt = {
  id: "01a0d48b-93f5-7275-89ac-cc498c5159d9",
  type: "page-type/module",
  slug: "game-art",
  definition: "a picture a browser draws for each texture the game's interface names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A texture is read out of the game's own archive on the workstation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A texture becomes a picture a browser reads, and that picture is kept in the cache.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A texture already kept is not read out of the archive again.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game's art is Alan's own install's, so it is used locally and never published.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A workstation without the game answers no texture rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A texture the archive lacks, or that will not convert, answers nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No test here reads the game's install.",
    },
  ],
} as const satisfies Module
