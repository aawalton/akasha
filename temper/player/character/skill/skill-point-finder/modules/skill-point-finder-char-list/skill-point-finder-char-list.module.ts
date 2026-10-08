import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointFinderCharList = {
  id: "01a060ec-5832-7174-b7a1-08495eb16e4c",
  type: "page-type/module",
  slug: "skill-point-finder-char-list",
  definition: "the character whose skill points the window is showing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The character shown is chosen from a list rather than followed from who is played.",
    },
  ],
  createdAt: "2026-09-02T07:01:36.946Z",
  updatedAt: "2026-09-21T15:46:08.000Z",
} as const satisfies Module
