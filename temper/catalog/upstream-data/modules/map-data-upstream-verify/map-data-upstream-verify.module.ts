import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapDataUpstreamVerify = {
  id: "01a06282-dfc3-7a2b-87b4-c262c2239e92",
  type: "page-type/module",
  slug: "map-data-upstream-verify",
  definition: "the ruling on whether the ported map-data rows still match upstream",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The map table is ruled on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pseudo map indices are ruled on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pseudo map indices are gathered off the globals by a shared name prefix.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The map table is walked inside Lua.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pseudo map indices are walked inside Lua.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole map table is ruled on rather than the map index sub-table alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Lua machine is closed once the ruling settles.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a ported file.",
    },
  ],
} as const satisfies Module
