import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fcoCollectiblesMounts = {
  id: "01a06115-1ac5-7e5c-8d3a-faa3aae9eba1",
  type: "page-type/module",
  slug: "fco-collectibles-mounts",
  definition: "the mount list the interface tweaks mark favourites in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No shared guard stands behind the table guards here.",
    },
  ],
} as const satisfies Module
