import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointPublicDungeons = {
  id: "01a06108-2ff9-767b-92d7-7dbd5671e738",
  pageTypeSlug: "module",
  slug: "skill-point-public-dungeons",
  definition: "the one skill point each public dungeon hands a character for its group event",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No page holds a public dungeon.",
    },
  ],
} as const satisfies Module
