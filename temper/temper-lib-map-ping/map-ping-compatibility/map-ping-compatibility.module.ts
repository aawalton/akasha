import type { Module } from "@akasha/code-system/module"

export const mapPingCompatibility = {
  id: "01a0605f-6263-7b5a-b8a6-e1817c4462aa",
  pageTypeSlug: "module",
  slug: "map-ping-compatibility",
  definition: "the older library object an addon written against LibMapPing reaches",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An older caller reaches the same handler through the older global name.",
    },
  ],
} as const satisfies Module
