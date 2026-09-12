import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const gpsPublicApi = {
  id: "01a0614d-4765-7157-8e3b-883d7c925f1a",
  type: "module",
  slug: "gps-public-api",
  definition: "the name the library puts in the game's global table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Loading the library a second time is an error.",
    },
  ],
} as const satisfies Module
