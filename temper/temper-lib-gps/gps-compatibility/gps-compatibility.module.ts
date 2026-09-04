import type { Module } from "@akasha/code-system/module"

export const gpsCompatibility = {
  id: "01a0614d-4761-75c9-89fb-cb8e08aac1a0",
  pageTypeSlug: "module",
  slug: "gps-compatibility",
  definition: "the older library object an addon written against LibGPS2 reaches",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An older caller reaches the same measurements through the older global name.",
    },
  ],
} as const satisfies Module
