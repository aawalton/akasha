import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreLibraryPages = {
  id: "01a0e26a-f623-729f-8fd3-d846ca1d388c",
  type: "page-type/module",
  slug: "lore-library-pages",
  definition: "the lore library an add-on holds, read from the lore pages its build carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An add-on reads no page while it runs, only what its build wrote into it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lore library is built the first time it is asked for, and held after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each page is carried with the fields the library reads and no others.",
    },
  ],
} as const satisfies Module
