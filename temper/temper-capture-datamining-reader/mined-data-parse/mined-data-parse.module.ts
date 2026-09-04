import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const minedDataParse = {
  id: "01a0611e-913c-74b8-9972-f3bfd84d8cd8",
  pageTypeSlug: "module",
  slug: "mined-data-parse",
  definition: "the rows a datamining capture holds, read out of the file it was saved as",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row the zod shape turns away is counted as a failure rather than thrown on.",
    },
    {
      invariantKind: "departure",
      statement: "A caller learns from the diagnostics whether every row was read.",
    },
  ],
} as const satisfies Module
