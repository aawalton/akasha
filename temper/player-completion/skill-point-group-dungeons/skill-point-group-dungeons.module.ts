import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointGroupDungeons = {
  id: "01a06108-2ff8-7e0f-a1bc-51a0856188bc",
  pageTypeSlug: "module",
  slug: "skill-point-group-dungeons",
  definition: "the one skill point each group dungeon hands a character for its quest",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The dungeons and their labels are read off the dungeon data rather than copied.",
    },
  ],
} as const satisfies Module
