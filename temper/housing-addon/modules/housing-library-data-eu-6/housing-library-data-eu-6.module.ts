import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingLibraryDataEu6 = {
  id: "01a06113-b7d0-70ae-9e5b-3ac403935f5c",
  type: "page-type/module",
  slug: "housing-library-data-eu-6",
  definition: "part 6 of the houses European players have shared with the community",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from an upstream library file rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An entry's place in this part is the place the gathered list keeps that entry in.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An entry moved to another place moves the entry every library row shows.",
    },
  ],
} as const satisfies Module
