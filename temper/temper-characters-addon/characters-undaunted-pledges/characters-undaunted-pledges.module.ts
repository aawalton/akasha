import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersUndauntedPledges = {
  id: "01a062ed-398d-7009-a4a9-bb8458c10c02",
  pageTypeSlug: "module",
  slug: "characters-undaunted-pledges",
  definition: "today's undaunted pledges, less those a character has already taken the point from",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A pledge on a dungeon one player cannot finish alone is not offered.",
    },
  ],
} as const satisfies Module
