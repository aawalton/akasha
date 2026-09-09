import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const esoDate = {
  id: "01a06070-82e2-764c-be2a-e7c281e7063e",
  pageTypeSlug: "module",
  slug: "eso-date",
  definition: "today's date on the game's own clock",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Lua compiled for the game reaches no Date.",
    },
    {
      invariantKind: "departure",
      statement: "A caller of this module runs on a host rather than inside the game.",
    },
  ],
} as const satisfies Module
