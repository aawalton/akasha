import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillLines = {
  id: "01a0608a-c135-7b83-afde-8d52e111b852",
  pageTypeSlug: "module",
  slug: "skill-lines",
  definition: "every skill line indexed by its id and by its category",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A skill line's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A skill line moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
