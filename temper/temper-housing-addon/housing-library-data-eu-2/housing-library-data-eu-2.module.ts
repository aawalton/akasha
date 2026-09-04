import type { Module } from "@akasha/code-system/module"

export const housingLibraryDataEu2 = {
  id: "01a06113-b7cf-7691-8127-82c12d1a84ff",
  pageTypeSlug: "module",
  slug: "housing-library-data-eu-2",
  definition: "part 2 of the houses European players have shared with the community",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from an upstream library file rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement:
        "An entry's place in this part is the place the gathered list keeps that entry in.",
    },
    {
      invariantKind: "gap",
      statement: "An entry moved to another place moves what every library row shows.",
    },
  ],
} as const satisfies Module
