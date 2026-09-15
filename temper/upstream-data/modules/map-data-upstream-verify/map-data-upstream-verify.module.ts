import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapDataUpstreamVerify = {
  id: "01a06282-dfc3-7a2b-87b4-c262c2239e92",
  type: "module",
  slug: "map-data-upstream-verify",
  definition: "the ruling on whether the ported LibMapData data still matches upstream",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The map table is ruled on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pseudo map indices are ruled on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pseudo map indices are gathered off the globals by a shared name prefix.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The map table is walked inside Lua.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pseudo map indices are walked inside Lua.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The whole map table is ruled on rather than the map index sub-table alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The Lua machine is closed once the ruling settles.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a ported file.",
    },
  ],
} as const satisfies Module
