import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPingPublicApi = {
  id: "01a0605f-6263-7cb1-beca-3555572b59a9",
  type: "page-type/module",
  slug: "map-ping-public-api",
  definition: "the name the map ping library puts in the game's global table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading the library a second time is an error.",
    },
  ],
} as const satisfies Module
