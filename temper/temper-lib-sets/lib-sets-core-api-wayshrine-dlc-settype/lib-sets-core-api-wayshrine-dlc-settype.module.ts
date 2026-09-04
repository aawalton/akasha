import type { Module } from "@akasha/code-system/module"

export const libSetsCoreApiWayshrineDlcSettype = {
  id: "01a06231-8f1c-7200-9fb9-2df4b2450fce",
  pageTypeSlug: "module",
  slug: "lib-sets-core-api-wayshrine-dlc-settype",
  definition: "a set's wayshrines, its zones, the DLC it arrived with and the type it is",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Each lookup this module offers is independent of the others.",
    },
  ],
} as const satisfies Module
