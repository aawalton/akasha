import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsDebugDebugScanData = {
  id: "01a0623c-2df7-7141-bcb8-855dfaac258d",
  type: "module",
  slug: "lib-sets-debug-debug-scan-data",
  definition:
    "the zone, map and wayshrine tables read from the client and the reset that clears them",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The world map is opened and right-clicked until wayshrine pins appear.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The slash command option for wayshrines names a function this module never sets.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Map names in another language need LibZone loaded.",
    },
  ],
} as const satisfies Module
