import type { Module } from "@akasha/code-system/module"

export const zoneNamesPl02 = {
  id: "01a061e7-931e-7306-97c5-6b63dca0ef0e",
  pageTypeSlug: "module",
  slug: "zone-names-pl-02",
  definition: "part 02 of every zone's name in pl",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
