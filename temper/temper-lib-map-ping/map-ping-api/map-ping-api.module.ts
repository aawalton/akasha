import type { Module } from "@akasha/code-system/module"

export const mapPingApi = {
  id: "01a0605f-6262-7e93-8504-251a34ece495",
  pageTypeSlug: "module",
  slug: "map-ping-api",
  definition: "the ping functions the library object carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A waypoint is set by world location rather than by map position.",
    },
  ],
} as const satisfies Module
