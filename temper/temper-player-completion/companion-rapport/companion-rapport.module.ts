import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionRapport = {
  id: "01a06108-2fea-7e03-804e-71e12bdddd7f",
  pageTypeSlug: "module",
  slug: "companion-rapport",
  definition: "how fond a companion is of a character, as a raw count and as a tier",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Rapport is held between nothing and its ceiling.",
    },
  ],
} as const satisfies Module
