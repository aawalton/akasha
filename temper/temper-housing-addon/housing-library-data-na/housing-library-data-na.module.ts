import type { Module } from "@akasha/code-system/module"

export const housingLibraryDataNa = {
  id: "01a06113-b7d1-7e85-b730-9398c3972952",
  pageTypeSlug: "module",
  slug: "housing-library-data-na",
  definition: "the houses North American players have shared with the community",
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
