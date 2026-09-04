import type { Module } from "@akasha/code-system/module"

export const housingLibraryDataEu = {
  id: "01a06113-b7ce-77ca-bda6-f521aa196130",
  pageTypeSlug: "module",
  slug: "housing-library-data-eu",
  definition: "the European community library, gathered from its six parts in turn",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from an upstream library file rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "An entry's place in this list is the place the library tab shows that entry in.",
    },
    {
      invariantKind: "gap",
      statement: "An entry moved to another place moves what every library row shows.",
    },
  ],
} as const satisfies Module
