import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribingScriptDescription = {
  id: "01a06187-b3a2-7a11-b605-168d750e9430",
  pageTypeSlug: "module",
  slug: "scribing-script-description",
  definition: "the wording a grimoire, a focus script and its variants read out together",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A description joins the skill wording with each chosen script's wording.",
    },
  ],
} as const satisfies Module
