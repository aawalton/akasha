import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const gpsMain = {
  id: "01a0614d-4764-7fb9-bcd4-a7fca9ec796d",
  type: "module",
  slug: "gps-main",
  definition: "the wiring the library does as the game loads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The global name is put in place before anything is built.",
    },
  ],
} as const satisfies Module
