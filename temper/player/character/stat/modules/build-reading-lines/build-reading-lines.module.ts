import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildReadingLines = {
  id: "01a1558d-7f40-70d1-b034-93437c9dd12e",
  type: "page-type/module",
  slug: "build-reading-lines",
  definition: "the readings the game gave of a character's build, each kept once",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is one bar's stats, skills, buffs and gear as the game reported them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading's result is its build, its bar and all it says but when it was taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A result already held lands nothing, so each result is kept once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A result is named by the hash of its text written with every key in order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first reading of a result is the one kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading's capture is named by its bar and the instant the add-on took it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture a line already holds lands nothing, whatever its result.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture the character's removed readings name lands nothing, ever again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character keeps the latest 20 readings of each build, and the oldest goes as a newer one lands.",
    },
  ],
  createdAt: "2026-10-19T19:04:58.943Z",
  updatedAt: "2026-10-24T21:04:54.144Z",
} as const satisfies Module
