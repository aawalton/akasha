import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersEventsBuild = {
  id: "01a0632d-cba3-7016-85c9-1835035387d2",
  pageTypeSlug: "module",
  slug: "characters-events-build",
  definition: "what this add-on does when the played character's build changes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run of build changes is read once after the run settles.",
    },
  ],
} as const satisfies Module
