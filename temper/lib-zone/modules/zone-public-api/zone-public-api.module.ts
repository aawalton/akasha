import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zonePublicApi = {
  id: "01a061e7-9336-72de-8b6e-4e0717e35ed6",
  type: "page-type/module",
  slug: "zone-public-api",
  definition: "the name the library puts in the game's global table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading the library a second time is an error.",
    },
  ],
} as const satisfies Module
