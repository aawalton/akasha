import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsPcSlash = {
  id: "01a061a8-9c6b-7884-af1c-4c6c3e02243e",
  type: "page-type/module",
  slug: "skyshards-pc-slash",
  definition: "the slash command that prints where the player is",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The player's position is printed from this one rule.",
    },
  ],
  createdAt: "2026-09-02T10:27:15.179Z",
  updatedAt: "2026-09-22T19:13:43.000Z",
} as const satisfies Module
