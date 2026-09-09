import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointFinderStrings = {
  id: "01a060ec-584a-7f5b-b12f-d6e8a9b8eb2b",
  pageTypeSlug: "module",
  slug: "skill-point-finder-strings",
  definition: "the wording the skill point window shows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A string is registered under an identifier the markup names.",
    },
  ],
} as const satisfies Module
