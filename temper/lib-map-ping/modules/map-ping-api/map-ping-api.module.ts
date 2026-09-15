import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPingApi = {
  id: "01a0605f-6262-7e93-8504-251a34ece495",
  type: "module",
  slug: "map-ping-api",
  definition: "the ping functions the library object carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A waypoint is set by world location rather than by map position.",
    },
  ],
} as const satisfies Module
