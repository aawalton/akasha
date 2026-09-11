import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const skillPointFinderCharList = {
  id: "01a060ec-5832-7174-b7a1-08495eb16e4c",
  type: "module",
  slug: "skill-point-finder-char-list",
  definition: "the character whose skill points the window is showing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The character shown is chosen from a list rather than followed from who is played.",
    },
  ],
} as const satisfies Module
