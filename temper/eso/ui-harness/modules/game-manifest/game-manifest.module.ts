import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gameManifest = {
  id: "01a0d3dc-3ae8-7d3d-93a9-04391f4ae73c",
  type: "page-type/module",
  slug: "game-manifest",
  definition:
    "the files the game's own interface loads, in the order the game's manifests list them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's interface is several programs, and an add-on runs in the ingame one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifests walked are those of the ingame program and what it depends on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ingame strings program is walked first, as the game's libraries depend on it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No file of the pregame or the internal program is listed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest line naming Lua or a document is a file, and every other line is not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest names a file the Windows way, and the clone holds it in lower case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the clone does not hold is passed over rather than refusing the list.",
    },
  ],
} as const satisfies Module
